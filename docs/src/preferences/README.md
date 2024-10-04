#  Preferences

[Kstore](https://github.com/xxfast/KStore) is a tiny Kotlin multiplatform library that assists in saving and restoring objects to and from disk using kotlinx.coroutines, kotlinx.serialization and kotlinx.io. Inspired by RxStore

 ::: tip More settings options
 if you want alternate library to store simple key-value data, you can use [`Multiplatform-Settings`](https://github.com/russhwolf/multiplatform-settings) or [`DataStore multiplatform`]('https://developer.android.com/reference/kotlin/androidx/datastore/package-summary.html').
 Be carefull, not all target web platform
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

Also Android needs context to instanciate the kstore. Without injection library, you can use an App context singleton.

 ::: details QuizApp.kt (androidMain) 
``` kotlin
class QuizApp : Application() {
    init {
        app = this
    }

    companion object {
        private lateinit var app: QuizApp
        fun context(): Context = app.applicationContext
    }
} 
````
:::

Add the QuizApp to the AndroidManifest.xml

::: details AndroidManifest.xml (androidMain)
```xml
...
    <application
        android:name=".QuizApp"
...
```
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

Upgrade the Quiz object with an update timestamp
::: details Quiz.kt (commonMain) 
```kotlin
@Serializable
data class Quiz(var questions: List<Question>,  val updateTime:Long=0L)
```
:::

Create a QuizKStoreDataSource class to store the kstore data

 ::: details QuizKStoreDataSource.kts (commonMain)
 ```kotlin
 class QuizKStoreDataSource {
    private val kStoreQuiz: KStore<Quiz>? = getKStore()
    suspend fun getUpdateTimeStamp(): Long = kStoreQuiz?.get()?.updateTime ?: 0L

    suspend fun setUpdateTimeStamp(timeStamp: Long) {
        kStoreQuiz?.update { quiz: Quiz? ->
            quiz?.copy(updateTime = timeStamp)
        }
    }

    suspend fun getAllQuestions(): List<Question> {
        return kStoreQuiz?.get()?.questions ?: emptyList()
    }

    suspend fun insertQuestions(newQuestions: List<Question>) {
        kStoreQuiz?.update { quiz: Quiz? ->
            quiz?.copy(questions = newQuestions)
        }
    }

    suspend fun resetQuizKstore() {
        kStoreQuiz?.delete()
        kStoreQuiz?.set(Quiz(emptyList(), 0L))
    }
}
 ```
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

::: tip Sources
The full sources can be retrieved [here](https://github.com/worldline/learning-kotlin-multiplatform/raw/main/docs/src/assets/solutions/6.preferences.zip) 
:::

::: tip 🎬 Summary video of the course

<iframe width="560" height="315" src="https://youtube.com/embed/r-wUqYZgbOo" title="KMP Quiz App overview" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::