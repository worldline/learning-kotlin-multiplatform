# Connectivity (10min)

Let's connect our Quiz app to internet. 

## API used

On this codelab, we will request a simple plain text json file hosted on this repo that will simulate a REST API call.
The request & answers details are specified below :

**Request**
```bash
POST
content-type: text/plain  
url: https://github.com/worldline/learning-kotlin-multiplatform/raw/main/quiz.json
```

**Answer**

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


## Definition 
### Data layer for KMP

Data layer in KMM is under building but largly inspired by [Android Architecture pattern](https://developer.android.com/topic/architecture/data-layer)

#### Overview

![data layer overview](../assets/images/data_layer.png)

Repository classes are responsible for the following tasks:
  * Exposing data to the rest of the app.
  * Centralizing changes to the data.
  * Resolving conflicts between multiple data sources.
  * Abstracting sources of data from the rest of the app.
  * Containing business logic.

### [Kotlin flow](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/)

"A flow is an asynchronous data stream that sequentially emits values and completes normally or with an exception."

There are multiple types of flow, for the codelab, we will focus on [`StateFlow`](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-state-flow/)

A state flow is a hot flow because its active instance exists independently of the presence of collectors (our composables that consume the data)

### [Coroutine](https://kotlinlang.org/docs/coroutines-overview.html)

"Asynchronous or non-blocking programming is an important part of the development landscape. When creating server-side, desktop, or mobile applications, it's important to provide an experience that is not only fluid from the user's perspective, but also scalable when needed."

### For the codelab

To not overcomplexify the app, let's assume that :
  * the QuizAPI provided by Ktor (cf below) is our data source
  * the repository will use a state flow that emit the API answer once at application startup

::: warning
  Other Architecture layers for KMP (such as [ViewModels](https://developer.android.com/topic/libraries/architecture/viewmodel) are very experimental at this stage of KMP. View models are possible with third party libraries like [`precompose`]('https://tlaster.github.io/PreCompose/')
:::

## Ktor, a multiplatform HTTP client

Ktor includes a multiplatform asynchronous HTTP client, which allows you to make requests and handle responses, extend its functionality with plugins, such as authentication and JSON deserialization. 

### Add global dependencies

Shared sources need it to use ktor library on your code

`build.gradle.kts` (shared) 
```kotlin

plugins {
...
    kotlin("plugin.serialization") version "1.8.10" 
}
...


val commonMain by getting {
  implementation("io.ktor:ktor-client-core:2.2.1") // core source of ktor
  implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.6.4") // For making asynchronous calls
  implementation("io.ktor:ktor-client-content-negotiation:2.2.1") // Simplify handling of content type based deserialization 
  implementation("io.ktor:ktor-serialization-kotlinx-json:2.2.1") // make your dataclasses serializable
  ...
```

Then on the same file for each platform (android,iOS,desktop), the specific client version needs to be added :

`build.gradle.kts` (shared) 
```kotlin
val androidMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-android:2.2.1") // for Android
            }
        }
...
val iosMain by getting {
            ...
            dependencies {
                implementation("io.ktor:ktor-client-darwin:2.2.1") //for iOS
            }

        }
...
val desktopMain by getting {
            dependencies {
               ...
                implementation("io.ktor:ktor-client-apache:2.2.1") // for Desktop
            }
        }
```

### Enable Internet permissions ( Android Only)

You need to enable internet on Android otherwise you will not be able to use ktor client

*AndroidManifest.xml(androidApp)*
```xml
    <uses-permission android:name="android.permission.INTERNET" />
```
### Create the API client in `commonApp`

*/network/Quiz.kt*
``` kotlin
class QuizAPI {
    private val httpClient = HttpClient {
        install(ContentNegotiation) {
            json(
                contentType = ContentType.Text.Plain, // because Github is not returning an 'application/json' header
                json = Json {
                ignoreUnknownKeys = true
                useAlternativeNames = false
            })
        }
    }
    suspend fun getAllQuestions(): Quiz {
        return httpClient.get("https://awl.li/devoxxkmm2023").body()
    }
}
```

### Make all your dataclass become serializable

Ktor need it to transform the json string into your dataclasses

*Quiz.kt*
```kotlin
@kotlinx.serialization.Serializable
data class Quiz(var questions: List<Question>)
```

*Question.kt*
```kotlin
import kotlinx.serialization.SerialInfo
import kotlinx.serialization.SerialName

@kotlinx.serialization.Serializable
data class Question(val id:Int, val label:String, @SerialName("correct_answer_id") val correctAnswerId:Int, val answers:List<Answer>)
```

*Answer.kt*
```kotlin
@kotlinx.serialization.Serializable
data class Answer(val id: Int, val label: String )
```

 ### Create your Repository class in `commonApp`

*/network/QuizRepository.kt*
```kotlin
class QuizRepository()  {

    private val quizAPI = QuizAPI()
    private val coroutineScope = CoroutineScope(Dispatchers.Default)

    private var _questionState=  MutableStateFlow(listOf<Question>())
    var questionState = _questionState

    init {
        updateQuiz()
    }

    private suspend fun fetchQuiz(): List<Question> = quizAPI.getAllQuestions().questions

    private fun updateQuiz(){

        coroutineScope.launch {
            _questionState.update { fetchQuiz() }
        }
    }
}
```

### Use the repository 

Replace mocked data for questions by the repository flow.

`App.kt`(commonMain)
```kotlin
...
private val repository = QuizRepository()
...

@Composable
internal fun App() {
    MaterialTheme {
        val questions = repository.questionState.collectAsState()

        if(questions.value.isNotEmpty()) {
            questionScreen(questions.value)
        }
    }
}
```

::: tip
The full sources can be retrieved [here](https://github.com/worldline/learning-kotlin-multiplatform/raw/main/docs/src/assets/sources/km-part4-withnetwork.zip) 
:::



An that's it, you quiz have now a remote list of questions.
If you want to get navigation between your WelcomeScreen, QuizScreen and ScoreScreen,
go to the next section →

## Ressources
- [Ktor client website](https://ktor.io/docs/getting-started-ktor-client.html)
- [Coroutine documentation](https://kotlinlang.org/docs/coroutines-overview.html)
- [Ktor multiplatform documentation](https://kotlinlang.org/docs/multiplatform-mobile-ktor-sqldelight.html)




