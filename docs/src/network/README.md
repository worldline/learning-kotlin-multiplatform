# Connectivity

Let's connect our Quiz app to internet. 

## Connect my App 

For now, we will request a simple plain text json file hosted on this repo that will simulate a REST API call to be able to use our Ktor client.

The request & answers details are specified below :

::: details Request
```bash
POST
content-type: text/plain  
url: https://github.com/worldline/learning-kotlin-multiplatform/raw/main/quiz.json
```
::: 

::: details Answer
```bash
code:200
body: 
{
  "questions": [
    { 
    "id":1, 
    "label":"You can create an emulator to simulate the configuration of a particular type of Android device using a tool like", 
    "correct_answer_id":3, 
    "answers":[
      {"id":1, "label":"Theme Editor"},
      {"id":2, "label":"Android SDK Manager"},
      {"id":3, "label":"AVD Manager"},
      {"id":4, "label":"Virtual Editor"}
     ]
    },
    {
    "id":2, 
    "label":"What parameter specifies the Android API level that Gradle should use to compile your app?", 
    "correct_answer_id":2, 
    "answers":[
      {"id":1, "label":"minSdkVersion"},
      {"id":2, "label":"compileSdkVersion"},
      {"id":3, "label":"targetSdkVersion"},
      {"id":4, "label":"testSdkVersion"}
     ]
    },
  ]
}
```
::: 

To not overcomplexify the app, let's assume that :
  * the QuizAPI provided by Ktor (cf below) is our data source
  * the repository will use a state flow that emit the API answer once at application startup


###  🧪 Ktor as a multiplatform HTTP client

Ktor includes a multiplatform asynchronous HTTP client, which allows you to make requests and handle responses, extend its functionality with plugins, such as authentication and JSON deserialization. 

#### Add global dependencies

Shared sources need it to use ktor library on your code

::: details build.gradle.kts (composeApp) 

``` kotlin
plugins {
...
    alias(libs.plugins.kotlinSerialization)
}

...
 sourceSets {
        val desktopMain by getting
        commonMain.dependencies {
            ...
            implementation(libs.kotlinx.datetime)
            implementation(libs.ktor.client.core)
            implementation(libs.ktor.client.content.negotiation)
            implementation(libs.ktor.serialization.kotlinx.json)

        }
        androidMain.dependencies {
            ...
            implementation(libs.ktor.client.okhttp)
        }
        desktopMain.dependencies {
            ...
            implementation(libs.ktor.client.apache)

        }
        iosMain.dependencies {
            implementation(libs.ktor.client.darwin) //for iOS
        }
        wasmJsMain.dependencies {
            implementation(libs.kstore.storage)
        }
    }
...

```
::: 



#### Enable Internet permissions ( Android Only)

You need to enable internet on Android otherwise you will not be able to use ktor client

::: details AndroidManifest.xml( androidMain)
```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```
::: 
#### Create the API client in `commonApp`

::: details network.QuizApiDataSource.kt  (SourceSet : commonMain)
``` kotlin
import com.worldline.quiz.data.dataclass.Quiz

val globalHttpClient = HttpClient {
    engine {

    }

    install(ContentNegotiation) {
        json(
            contentType = ContentType.Text.Plain, // because Github is not returning an 'application/json' header
            json = Json {
                ignoreUnknownKeys = true
                useAlternativeNames = false
            })
    }
}

class QuizApiDatasource {
    private val httpClient = globalHttpClient
    suspend fun getAllQuestions(): Quiz {
        return httpClient.get("https://raw.githubusercontent.com/worldline/learning-kotlin-multiplatform/main/quiz.json").body()
    }
}

```
::: 
#### Make all your dataclass become serializable

Ktor need it to transform the json string into your dataclasses

::: details Answer.kt  (module : commonMain)
```kotlin
@kotlinx.serialization.Serializable
data class Answer(val id: Int, val label: String )
```
:::

::: details Question.kt  (SourceSet : commonMain)
```kotlin
import kotlinx.serialization.SerialInfo
import kotlinx.serialization.SerialName

@kotlinx.serialization.Serializable
data class Question(val id:Int, val label:String, @SerialName("correct_answer_id") val correctAnswerId:Int, val answers:List<Answer>)
```
::: 

::: details Quiz.kt  (SourceSet : commonMain)
``` kotlin
@kotlinx.serialization.Serializable
data class Quiz(var questions: List<Question>)
```
::: 

 #### Create your Repository class in `commonApp`

::: details QuizRepository.kt  (module : commonMain)
```kotlin
class QuizRepository {

    private val mockDataSource = MockDataSource()
    private val quizApiDatasource = QuizApiDatasource()

    private suspend fun fetchQuiz(): List<Question> = quizApiDatasource.getAllQuestions().questions

    suspend fun updateQuiz(): List<Question> {
        try {
            return fetchQuiz()
        } catch (e: Exception) {
            e.printStackTrace()
            return mockDataSource.generateDummyQuestionsList()
        }
    }
}
```
::: 

### 🎯 Solutions

::: tip Sources
The full sources can be retrieved [here](https://github.com/worldline/learning-kotlin-multiplatform/raw/main/docs/src/assets/solutions/5.network.zip) 
:::


## Create a server

 ###  🧪 Create a Ktor server module inside your actual project

::: warning
You can create the server module from IntelliJ community or ultimate thanks to a template.
:::

The module tree is as follow 

![server tree](../assets/images/server_tree.png)

 ### 🎯 Solutions


  ::: details build.gradle.kts

``` kotlin 
plugins {
    alias(libs.plugins.kotlinJvm)
    alias(libs.plugins.ktor)
    alias(libs.plugins.kotlinSerialization)
    application
}

group = "com.worldline.quiz"
version = "1.0.0"

application {
    mainClass.set("com.worldline.quiz.ApplicationKt")
    applicationDefaultJvmArgs = listOf("-Dio.ktor.development=${extra["io.ktor.development"] ?: "false"}")
}

dependencies {
    implementation(libs.logback)
    implementation(libs.ktor.server.core)
    implementation(libs.ktor.server.cio)
    implementation(libs.ktor.serialization.kotlinx.json)
    implementation(libs.ktor.server.content.negotiation)
    implementation(libs.ktor.server.cors)
    implementation(libs.ktor.server.config.yaml)
}

ktor {
    fatJar {
        archiveFileName.set("fat.jar")
    }
    docker {
        externalRegistry.set(
            io.ktor.plugin.features.DockerImageRegistry.dockerHub(
                appName = provider { "ktor-quiz" },
                username = providers.environmentVariable("KTOR_IMAGE_REGISTRY_USERNAME"),
                password = providers.environmentVariable("KTOR_IMAGE_REGISTRY_PASSWORD")
            )
        )
    }
}
```
:::

 ::: details Application.kt

``` kotlin 
ffun main(args: Array<String>) {
    io.ktor.server.cio.EngineMain.main(args)
}


fun Application.module() {

    install(CORS) {
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Post)
        allowMethod(HttpMethod.Get)
        allowHeader(HttpHeaders.AccessControlAllowOrigin)
        allowHeader(HttpHeaders.ContentType)
        anyHost()
    }

    install(ContentNegotiation) {
        json()
    }
    configureRouting()
}
```
:::


::: details Routing.kt

```kotlin
fun Application.configureRouting() {

    routing {
        get("/quiz") {
            call.respond(generateQuiz())
        }
        staticResources("/", "static")
    }
}

fun generateQuiz(): Quiz {
    val quizQuestions = mutableListOf<Question>()

    val questions = listOf(
        "What is the primary goal of Kotlin Multiplatform?",
        "How does Kotlin Multiplatform facilitate code sharing between platforms?",
        "Which platforms does Kotlin Multiplatform support?",
        "What is a common use case for Kotlin Multiplatform?",
        "Which naming of KMP is deprecated?",
        "How does Kotlin Multiplatform handle platform-specific implementations?",
        "At which Google I/O, Google announced first-class support for Kotlin on Android?",
        "What is the name of the Kotlin mascot?",
        "The international yearly Kotlin conference is called...",
        "Where will be located the next international yearly Kotlin conference?"
    )

    val answers = listOf(
        listOf(
            "To share code between multiple platforms",
            "To exclusively compile code to JavaScript",
            "To build only Android applications",
            "To create iOS-only applications"
        ),
        listOf(
            "By sharing business logic and adapting UI",
            "By writing separate code for each platform",
            "By using only Java libraries",
            "By using code translation tools"
        ),
        listOf(
            "Android, iOS, desktop and web",
            "Only Android",
            "Only iOS",
            "Only web applications"
        ),
        listOf(
            "Developing a cross-platform app",
            "Building a desktop-only application",
            "Creating a server-side application",
            "Writing a standalone mobile app"
        ),
        listOf(
            "Kotlin Multiplatform Mobile (KMM)",
            "Hadi Multiplatform",
            "Jetpack multiplatform",
            "Kodee multiplatform"
        ),
        listOf(
            "Through expect and actual declarations",
            "By automatically translating code",
            "By restricting to a single platform",
            "By excluding platform-specific features"
        ),
        listOf(
            "2017",
            "2016",
            "2014",
            "2020"
        ),
        listOf(
            "Kodee",
            "Hadee",
            "Kotlinee",
            "Kotee"
        ),
        listOf(
            "KotlinConf",
            "KodeeConf",
            "KConf",
            "KotlinKonf"
        ),
        listOf(
            "Copenhagen, Denmark",
            "Amsterdam, Netherlands",
            "Tokyo, Japan",
            "Lille, France"
        )
    )

    for (i in questions.indices) {
        val shuffledAnswers = answers[i].shuffled(Random.Default)
        val correctAnswerId = shuffledAnswers.indexOfFirst { it == answers[i][0] } + 1
        val question =
            Question(i + 1L, questions[i], correctAnswerId.toLong(), shuffledAnswers.mapIndexed { index, answer ->
                Answer(index + 1L, answer)
            })
        quizQuestions.add(question)
    }

    return Quiz(quizQuestions)
}

```
:::

## Image loading from internet 

To load an image from the internet, you can use the following third-party Compose Multiplatform libraries
- [Compose Image Loader ](https://github.com/qdsfdhvh/compose-imageloader)
- [Kamel](https://github.com/Kamel-Media/Kamel)


::: tip Other libs
If you want well-known retrofit style lib, you can use [KtorFit](https://github.com/Foso/Ktorfit) to separate endpoint declaration from httpclient configuration 
:::


An that's it, you quiz have now a remote list of questions.
If you want to get navigation between your WelcomeScreen, QuizScreen and ScoreScreen,
go to the next section →

**✅ If everything is fine, go to the next chapter →**


## 📖 Further reading
- [Ktor client website](https://ktor.io/docs/getting-started-ktor-client.html)
- [Coroutine documentation](https://kotlinlang.org/docs/coroutines-overview.html)
- [Ktor multiplatform documentation](https://kotlinlang.org/docs/multiplatform-mobile-ktor-sqldelight.html)
- [REST API basics](https://www.youtube.com/watch?v=-mN3VyJuCjM&list=WL&index=3)




