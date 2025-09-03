# Local  Database

::: warning Deprecated section
`SQL delight` is for now no more compatible with the new default **WASM** template for WebApp application.

If you still want to use it you can revert to the old **Js(IR)** template.

Notice that for now this is the **only** Web target compatible database library for KMP
:::

SQLDelight generates typesafe Kotlin APIs from your SQL statements. It verifies your schema, statements, and migrations at compile-time and provides IDE features like autocomplete and refactoring which make writing and maintaining SQL simple.

SQLDelight understands your existing SQL schema.

```sql
CREATE TABLE hockey_player (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  number INTEGER NOT NULL
);
```

It generates typesafe code for any labeled SQL statements.

::: warning 

Be carefull with SQL Delight , the project and his dependancies just move from `com.squareup.sqldelight.*`
to `app.cash.sqldelight.*`

Pay attention also with beta, alpha version of Android studio that could produce bugs on gradle task management for code generation of SQL Delight databases.
:::

## 🧪 Add sqldelight db to your quizz 

> Refer to the multiplatform implementation of SQLDelight in official Github pages
> 👉 [https://cashapp.github.io/sqldelight/2.0.0/multiplatform_sqlite/](https://cashapp.github.io/sqldelight/2.0.0/multiplatform_sqlite/)


#### Add the correct dependancies to the project
``` kotlin
plugins {
...
    alias(libs.plugins.sqldelight)
}
...
 sourceSets {
         commonMain.dependencies {
              ...
            implementation(libs.sqldelight.runtime)
            implementation(libs.sqldelight.coroutines.extensions)
            }
        
         androidMain.dependencies {
               ...
                 implementation(libs.sqldelight.android.driver)

            }
    ...
        iosMain.dependencies {
                ...
                 implementation(libs.sqldelight.ios.driver)
            }
        
         desktopMain.dependencies {
               ...
                 implementation(libs.sqldelight.jvm.driver)
            }

        wasmJsMain.dependencies {
            ...
            implementation(libs.sqldelight.webworker.driver)
            implementation(npm("sql.js", libs.versions.sqlJs.get()))
            implementation(devNpm("copy-webpack-plugin", libs.versions.webPackPlugin.get()))

        }

        }
        ...

        sqldelight {
            databases {
                create("Database") {
                    packageName = "com.myapplication.common.cache"
                    generateAsync = true
                    verifyMigrations = false
                }
            }
            linkSqlite = true
      }

```
#### Create the native SQL driver factory and use it for creating the DB with `actual`/`expect` kotlin keywords

``` kotlin Platform.jvm.kt (desktopMain)
actual suspend fun provideDbDriver(
    schema: SqlSchema<QueryResult.AsyncValue<Unit>>
): SqlDriver {
    return JdbcSqliteDriver("jdbc:sqlite:quiz.db", Properties())
        .also { schema.create(it).await() }

}
```


``` kotlin Platform.ios.kt (iosMain)
actual suspend fun provideDbDriver(
    schema: SqlSchema<QueryResult.AsyncValue<Unit>>
): SqlDriver {
    return NativeSqliteDriver(schema.synchronous(), "quiz.db")
}
```

``` kotlin Platform.android.kt (androidMain)
actual suspend fun provideDbDriver(
    schema: SqlSchema<QueryResult.AsyncValue<Unit>>
): SqlDriver {
    return AndroidSqliteDriver(schema.synchronous(), QuizApp.context(), "quiz.db")
}
```


``` kotlin Platform.js.kt (wasmjsMain)
actual suspend fun provideDbDriver(schema: SqlSchema<QueryResult.AsyncValue<Unit>>): SqlDriver {
    return WebWorkerDriver(
        jsWorker()
    )
}
fun jsWorker(): Worker =
    js("""new Worker(new URL("./sqljs.worker.js", import.meta.url))""")
```

for the WebWorker you need to create a webpack.config.d/config.js file in the root of your project and a webpack.config.d/sqljs-config.js for the web worker  to be able to use the sql wasm library.

``` js webpack.config.d/config.js
const TerserPlugin = require("terser-webpack-plugin");

config.optimization = config.optimization || {};
config.optimization.minimize = true;
config.optimization.minimizer = [
    new TerserPlugin({
        terserOptions: {
            mangle: true,    // Note: By default, mangle is set to true.
            compress: false, // Disable the transformations that reduce the code size.
            output: {
                beautify: false,
            },
        },
    }),
];
```

``` js webpack.config.d/sqljs-config.js
// {project}/webpack.config.d/sqljs.js
config.resolve = {
    fallback: {
        fs: false,
        path: false,
        crypto: false,
    }
};

const CopyWebpackPlugin = require('copy-webpack-plugin');
config.plugins.push(
    new CopyWebpackPlugin({
        patterns: [
            '../../node_modules/sql.js/dist/sql-wasm.wasm'
        ]
    })
);

```


#### Read carefully the modelisation UML below 

![diagram SQL ](../assets/images/diagramme_sql.png)

#### Create you SQLDelight model 'QuizDatabase.sq'

#### Create your Database datasource by generating insert and update suspending functions

#### Update your repository by instanciating your database

Your repository handle the following cases :
* If there is no network and it's the first time launch of the app : handle and error 
* if there is no network and you have db datas : return on the flow the db data
* if there is network and db data are younger than 5 min : return on the flow the db data
* if there is network and db data are older than 5 min : retourn on the flow the network data and reset db data

## 🎯 Solutions

::: details QuizDatabase.sq (ressources of commonMain)*

```sql
CREATE TABLE update_time (
     timestamprequest INTEGER
);

INSERT INTO update_time(timestamprequest) VALUES (0);

CREATE TABLE questions (
    id INTEGER PRIMARY KEY,
    label TEXT NOT NULL,
    correctAnswerId INTEGER  NOT NULL
 );

 CREATE TABLE answers (
    id INTEGER NOT NULL,
    label TEXT NOT NULL,
    question_id INTEGER NOT NULL,
    PRIMARY KEY (id, question_id),
    FOREIGN KEY (question_id)
      REFERENCES questions (id)
          ON UPDATE CASCADE
          ON DELETE CASCADE
 );

 selectUpdateTimestamp:
 SELECT *
 FROM update_time;

 insertTimeStamp:
 INSERT INTO update_time(timestamprequest)
 VALUES (:timestamp);

 deleteTimeStamp:
 DELETE FROM update_time;

 deleteQuestions:
 DELETE FROM questions;

 deleteAnswers:
 DELETE FROM answers;


 selectAllQuestionsWithAnswers:
 SELECT *
 FROM questions
 INNER JOIN answers ON questions.id = answers.question_id;

 insertQuestion:
 INSERT INTO questions(id, label,correctAnswerId)
 VALUES (?, ?, ?);

 insertAnswer:
 INSERT INTO answers(id, label,question_id)
 VALUES (?, ?, ?);

```
:::

::: details data/datasources (commonMain)
``` kotlin
class SqlDelightDataSource(private val database: Database) {


    private var quizQueries = database.quizQuestionQueries

    suspend fun getAllQuestions(): List<Question> {
        return quizQueries.selectAllQuestionsWithAnswers().awaitAsList()

            .groupBy { it.question_id }
            .map { (questionId, rowList) ->

                Question(
                    id = questionId,
                    label = rowList.first().label,
                    correctAnswerId = rowList.first().correctAnswerId,
                    answers = rowList.map { answer ->
                        Answer(
                            id = answer.id_,
                            label = answer.label_
                        )
                    }
                )
            }
    }


    suspend fun insertQuestions(questions: List<Question>) {
        quizQueries.deleteQuestions();
        quizQueries.deleteAnswers()
        questions.forEach { question ->
            quizQueries.insertQuestion(question.id, question.label, question.correctAnswerId)
            question.answers.forEach { answer ->
                quizQueries.insertAnswer(answer.id, answer.label, question.id)
            }
        }
    }

    suspend fun resetQuestions() {
        quizQueries.deleteQuestions()
        quizQueries.deleteAnswers()
    }
}
```
:::

::: details QuizRepository.kt
```kotlin
class QuizRepository {
    private val mockDataSource = MockDataSource()
    private val quizApiDatasource = QuizApiDatasource()
    private var quizKStoreDataSource = KStoreDataSource(AppInitializer.getKStoreInstance())
    private var sqlDelightDataSource = SqlDelightDataSource(AppInitializer.getDatabase()!!)

    private suspend fun fetchQuiz(): List<Question> = quizApiDatasource.getAllQuestions().questions

    @OptIn(ExperimentalTime::class)
    private suspend fun fetchAndStoreQuiz(): List<Question> {
        sqlDelightDataSource.resetQuestions()

        val questions = fetchQuiz()
        sqlDelightDataSource.insertQuestions(questions)
        quizKStoreDataSource.setUpdateTimeStamp(Clock.System.now().epochSeconds)
        return questions
    }

    @OptIn(ExperimentalTime::class)
    suspend fun updateQuiz(): List<Question> {
        try {
            val lastRequest = quizKStoreDataSource.getUpdateTimeStamp()
            return if (lastRequest == 0L || lastRequest - Clock.System.now().epochSeconds > 300000) {
                fetchAndStoreQuiz()
            } else {
                //quizKStoreDataSource.getAllQuestions()
                sqlDelightDataSource.getAllQuestions()
            }
        } catch (e: NullPointerException) {
            return fetchAndStoreQuiz()
        } catch (e: Exception) {
            e.printStackTrace()
            return mockDataSource.generateDummyQuestionsList()
        }
    }

}
```
:::

::: tip More databases options
For not using SQLight ORM, you can use [`Realm kotlin`](https://github.com/realm/realm-kotlin) or [KStore](https://github.com/xxfast/KStore)
:::

**✅ If everything is fine, go to the next chapter →**

## 📖 Further reading 
- [SQL Delight tutorial (obsolete)](https://www.jetbrains.com/help/kotlin-multiplatform-dev/multiplatform-ktor-sqldelight.html)
- [SQL Delight lib ](https://github.com/cashapp/sqldelight)


