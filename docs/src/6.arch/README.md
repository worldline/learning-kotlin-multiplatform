#  Architecture  

Let's Architecture our Quiz app with the MVVM pattern.

## Overview  

::: tip Architecture basics
**Everything You NEED to Know About MVVM Architecture Patterns**
<iframe width="560" height="315" src="https://www.youtube.com/embed/I5c7fBgvkNY" title="Everything You NEED to Know About Client Architecture Patterns" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::

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


##  🧪 DataSource and Repository

* Create a mock datasource, that generate a list of question
* Use it with a repository 
* Use the repository on the root of your application ( navHost in App.kt)

 ### 🎯 Solutions



::: details MockDataSource.kt
``` kotlin 
package com.worldline.quiz.data.datasources

class MockDataSource {

  fun generateDummyQuestionsList():List<Question>{
        return listOf(
            Question(
                1,
                "Android is a great platform ?",
                1,
                listOf(
                    Answer( 1,"YES"),
                    Answer(2,"NO")
                )
            ),
            Question(
                1,
                "Android is a bad platform ?",
                2,
                listOf(
                    Answer( 1,"YES"),
                    Answer(2,"NO")
                )
            )
        )
    }

}
```
:::

::: details  QuizRepository.kt
``` kotlin
package com.worldline.quiz.data

class QuizRepository()  {

    private val mockDataSource = MockDataSource()
    private val coroutineScope = CoroutineScope(Dispatchers.Main)
    private var _questionState=  MutableStateFlow(listOf<Question>())
    val questionState get() = _questionState

    init {
        updateQuiz()
    }

    private fun updateQuiz(){
        coroutineScope.launch {
            _questionState.update {
                    mockDataSource.generateDummyQuestionsList()
            }
        }
    }
}
```
:::

::: details  App.kt
``` kotlin
...
@Composable
fun App(
    navController: NavHostController = rememberNavController(),
    quizRepository: QuizRepository = QuizRepository()
) {

    MaterialTheme {
        NavHost(
            navController = navController,
            startDestination = WelcomeRoute,
        ) {


            composable<WelcomeRoute>() {
                WelcomeScreen(
                    onStartButtonPushed = {
                        navController.navigate(route = QuizRoute)
                    }
                )
            }
            composable<QuizRoute>() {
                val questions by quizRepository.questionState.collectAsState()
                    QuestionScreen(
                        questions = questions,
        
                        onFinishButtonPushed = {
                            score: Int, questionSize: Int -> navController.navigate(route = ScoreRoute(score, questionSize))
                        }
                    )
            }
            composable<ScoreRoute> { backStackEntry ->
                val scoreRoute: ScoreRoute = backStackEntry.toRoute<ScoreRoute>()
                ScoreScreen(
                    score = scoreRoute.score,
                    total = scoreRoute.questionSize,
                    onResetButtonPushed = {
                        navController.navigate(route = QuizRoute)
                    }
                )
            }
        }
    }
}
```
:::


::: tip Sources
The full solution for this section is availabe [here](https://github.com/worldline/learning-kotlin-multiplatform/raw/main/docs/src/assets/solutions/3.repository.zip) 
:::


##  🧪 ViewModel

* Create a ViewModel class
* Upgrade the repository that is no more storing the flow and move it to the ViewModel
* Upgrade the App to use the ViewModel instead of the Repository

::: tip Third party Architecture libraries
Domain layer framework such as [`ViewModels`](https://developer.android.com/topic/libraries/architecture/viewmodel) are just available on KMP. But you can also use a third party library such as [`Moko-MVVM`](https://github.com/icerockdev/moko-mvvm) or [`KMM-ViewModel`](https://github.com/rickclephas/KMM-ViewModel) or  [`precompose`]('https://tlaster.github.io/PreCompose/')

:::


::: details gradle.build.kts (module : composeApp)
```kotlin
...
 commonMain.dependencies {
            ...
            implementation(libs.androidx.lifecycle.viewmodel.compose)
...
```
::: 

::: details  QuizViewModel.kt
``` kotlin
package com.worldline.quiz

class QuizViewModel : ViewModel() {
    private var quizRepository: QuizRepository = QuizRepository()
    private var _questionState=  MutableStateFlow(listOf<Question>())
    val questionState get() = _questionState

    /* Can be replaced with explicit backing fields
    val questionState : StateFlow<List<Question>>
       field =  MutableStateFlow(listOf<Question>())
    -> in build.gradle.kts : sourceSets.all { languageSettings.enableLanguageFeature("ExplicitBackingFields") }
    */

    init {
        getQuestionQuiz()
    }

    private fun getQuestionQuiz() {
        viewModelScope.launch(Dispatchers.Default) {
            _questionState.update {
                quizRepository.updateQuiz()
            }
        }
    }
}
```
:::

::: details  QuizRepository.kt
``` kotlin
class QuizRepository  {
    private val mockDataSource = MockDataSource()
    fun updateQuiz():List<Question>{
            return mockDataSource.generateDummyQuestionsList()
    }
}
```
:::


::: details  App.kt
``` kotlin
fun App(
    navController: NavHostController = rememberNavController(),
    quizViewModel: QuizViewModel = QuizViewModel()
) {
...
composable<QuizRoute> {
                val questions by quizViewModel.questionState.collectAsState()
```
:::

::: tip Sources
The full solution for this section is availabe [here](https://github.com/worldline/learning-kotlin-multiplatform/raw/main/docs/src/assets/solutions/4.viewmodel.zip) 
:::

**✅ If everything is fine, go to the next chapter →**

## 📖 Further reading




