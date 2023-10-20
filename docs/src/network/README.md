# Connectivity

Let's connect our Quiz app to internet. 

## 📚 Reminder  
### Data layer for KMP

Data layer in KMP is under building but largly inspired by [Android Architecture pattern](https://developer.android.com/topic/architecture/data-layer)

![data layer overview](../assets/images/data_layer.png)

Repository classes are responsible for the following tasks:
  * Exposing data to the rest of the app.
  * Centralizing changes to the data.
  * Resolving conflicts between multiple data sources.
  * Abstracting sources of data from the rest of the app.
  * Containing business logic.

### [Kotlin flow](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/)

"A flow is an asynchronous data stream that sequentially emits values and completes normally or with an exception."

There are multiple types of flow, for the Hands-on Lab, we will focus on [`StateFlow`](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-state-flow/)

A state flow is a hot flow because its active instance exists independently of the presence of collectors (our composables that consume the data)

### [Coroutine](https://kotlinlang.org/docs/coroutines-basics.html#your-first-coroutine)

"A coroutine is an instance of suspendable computation. It is conceptually similar to a thread, in the sense that it takes a block of code to run that works concurrently with the rest of the code. However, a coroutine is not bound to any particular thread. It may suspend its execution in one thread and resume in another one."



## Connect my Quizz to the internet

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

::: warning
  Other Architecture layers for KMP (such as [ViewModels](https://developer.android.com/topic/libraries/architecture/viewmodel) are very experimental at this stage of KMP. View models are possible with third party libraries like [`precompose`]('https://tlaster.github.io/PreCompose/')
:::

###  🧪 Ktor as a multiplatform HTTP client

Ktor includes a multiplatform asynchronous HTTP client, which allows you to make requests and handle responses, extend its functionality with plugins, such as authentication and JSON deserialization. 

#### Add global dependencies

Shared sources need it to use ktor library on your code

::: details build.gradle.kts (module : shared) 

``` kotlin
plugins {
...
    kotlin("plugin.serialization") version "1.9.10" 
}
...
val commonMain by getting {
                implementation("io.ktor:ktor-client-core:2.3.4") // core source of ktor
                implementation("org.jetbrains.kotlinx:kotlinx-coroutines-core:1.7.3") // For making asynchronous calls
                implementation("io.ktor:ktor-client-content-negotiation:2.3.4") // Simplify handling of content type based deserialization
                implementation("io.ktor:ktor-serialization-kotlinx-json:2.3.4") // make your dataclasses serializable
  ...
```
::: 

Then on the same file for each platform (android,iOS,desktop), the specific client version needs to be added :

::: details build.gradle.kts (module : shared) 
```kotlin
val androidMain by getting {
            dependencies {
                implementation("io.ktor:ktor-client-android:2.3.4") // for Android
            }
        }
...
val iosMain by creating {
            ...
            dependencies {
                implementation("io.ktor:ktor-client-darwin:2.3.4") //for iOS
            }

        }
...
val desktopMain by getting {
            dependencies {
               ...
                implementation("io.ktor:ktor-client-apache:2.3.4") // for Desktop
            }
        }
```
:::

#### Enable Internet permissions ( Android Only)

You need to enable internet on Android otherwise you will not be able to use ktor client

::: details AndroidManifest.xml(module : androidApp)
```xml
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```
::: 
#### Create the API client in `commonApp`

::: details network.Quiz.kt  (SourceSet : commonMain)
``` kotlin
package network

import io.ktor.client.HttpClient
import io.ktor.client.call.body
import io.ktor.client.plugins.contentnegotiation.ContentNegotiation
import io.ktor.client.request.get
import io.ktor.http.ContentType
import io.ktor.serialization.kotlinx.json.json
import kotlinx.serialization.json.Json
import network.data.Quiz

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
::: 
#### Make all your dataclass become serializable

Ktor need it to transform the json string into your dataclasses

::: details Quiz.kt  (SourceSet : commonMain)
``` kotlin
@kotlinx.serialization.Serializable
data class Quiz(var questions: List<Question>)
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

::: details Answer.kt  (module : commonMain)
```kotlin
@kotlinx.serialization.Serializable
data class Answer(val id: Int, val label: String )
```
:::

 #### Create your Repository class in `commonApp`

::: details QuizRepository.kt  (module : commonMain)
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
::: 
#### Use the repository 

Replace mocked data for questions by the repository flow.

::: details App.kt (SourceSet : commonMain)
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
:::

### 🎯 Solutions

::: tip
The full sources can be retrieved [here](https://github.com/worldline/learning-kotlin-multiplatform/raw/main/docs/src/assets/solutions/3.network.zip) 
:::


###  👷‍♂️ Ktor as a rest API server
 :::warning
 > Under construction
 :::


An that's it, you quiz have now a remote list of questions.
If you want to get navigation between your WelcomeScreen, QuizScreen and ScoreScreen,
go to the next section →

**✅ If everything is fine, go to the next chapter →**


## 📖 Further reading
- [Ktor client website](https://ktor.io/docs/getting-started-ktor-client.html)
- [Coroutine documentation](https://kotlinlang.org/docs/coroutines-overview.html)
- [Ktor multiplatform documentation](https://kotlinlang.org/docs/multiplatform-mobile-ktor-sqldelight.html)




