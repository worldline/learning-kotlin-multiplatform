#  Preferences

 :::warning
 > Under construction
 :::

 ::: tip More settings options
 if you want to store  simple key-value data, you can use [`Multiplatform-Settings`](https://github.com/russhwolf/multiplatform-settings) or [`DataStore multiplatform`]('https://developer.android.com/reference/kotlin/androidx/datastore/package-summary.html')
 :::


Add kstore dependency to your project for each target platform

 ::: details build.gradle.kts (composeMain) 

``` kotlin
  commonMain.dependencies {
            ...
            implementation(libs.kstore)
        }
        androidMain.dependencies {
            ...
            implementation(libs.kstore.file)
        }
        desktopMain.dependencies {
            ...
            implementation(libs.kstore.file)
        }
        iosMain.dependencies {
            implementation(libs.kstore.file)
        }
        wasmJsMain.dependencies {
            implementation(libs.kstore.storage)
        }
    ...
````
:::


Define the native call to get the kstore instance

 ::: details platform.kt (commonMain) 
``` kotlin
    expect fun getKStore(): KStore<Quiz>?
````
:::

Define each platform call to get the kstore instance for Android, iOS, Web, Desktop

 ::: details platform.kt (androidMain) 
``` kotlin
    actual fun getKStore(): KStore<Quiz>? {
        return storeOf(QuizApp.context().dataDir.path.plus("/quiz.json").toPath())
    }
````
:::

 ::: details platform.kt (iosMain) 
``` kotlin
    @OptIn(ExperimentalKStoreApi::class)
    actual fun getKStore(): KStore<Quiz>? {
        return NSFileManager.defaultManager.DocumentDirectory?.relativePath?.plus("/quiz.json")?.toPath()?.let {
            storeOf(
            file= it
        )
        }
    }
````
:::

 ::: details platform.kt (wasmJsMain) 
``` kotlin
    actual fun getKStore(): KStore<Quiz>? {
        return storeOf(key = "kstore_quiz")
     }

````
:::

 ::: details platform.kt (desktopMain) 
``` kotlin
    actual fun getKStore(): KStore<Quiz>? {
        return storeOf("quiz.json".toPath())
    }

````
:::

Update the QuizRepository class to use the kstore

 ::: details QuizRepository.kts (commonMain) 

``` kotlin

class QuizRepository {

    private val mockDataSource = MockDataSource()
    private val quizApiDatasource = QuizApiDatasource()
    private var quizKStoreDataSource = QuizKStoreDataSource()

    private suspend fun fetchQuiz(): List<Question> = quizApiDatasource.getAllQuestions().questions

    private suspend fun fetchAndStoreQuiz(): List<Question> {
        quizKStoreDataSource.resetQuizKstore()
        val questions = fetchQuiz()
        quizKStoreDataSource.insertQuestions(questions)
        quizKStoreDataSource.setUpdateTimeStamp(Clock.System.now().epochSeconds)
        return questions
    }

    suspend fun updateQuiz(): List<Question> {
        try {
            val lastRequest = quizKStoreDataSource.getUpdateTimeStamp()
            return if (lastRequest == 0L || lastRequest - Clock.System.now().epochSeconds > 300000) {
                fetchAndStoreQuiz()
            } else {
                quizKStoreDataSource.getAllQuestions()
            }
        } catch (e: NullPointerException) {
            return fetchAndStoreQuiz()
        } catch (e: Exception) {
            e.printStackTrace()
            return mockDataSource.generateDummyQuestionsList()
        }
    }

}
````
:::
