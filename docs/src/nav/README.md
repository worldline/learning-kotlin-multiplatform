# Navigation

##  🧪 Create Navigation between composable screens 

Compose multiplatform navigation library enable a navigation with `navigation host`


#### Add `Navigation` dependency to your project

::: details gradle.build.kts (module : composeApp)
```kotlin
...
 commonMain.dependencies {
            ...
            implementation(libs.kotlin.navigation)
...
```
::: 

#### Create your navigation host 

The navigation host is the configuration class that defines routes 
of your application. 

Routes are path between all the composable screens that you will call later on your app.

![routes overview](../assets/images/routes.png)


For this Hands-on Lab we need 3 routes for : 
* At startup to the `WelcomeScreen`
* from Welcome screen to the `QuizScreen`
* from the final question `QuizScreen`to the `ScoreScreen` 

::: details App.kt (SourceSet: commonMain)
```kotlin

val questions = listOf(
    Question(
        1,
        "Android is a great platform ?",
        1,
        listOf(Answer(1, "YES"), Answer(2, "NO"))
    ),
    Question(
        1,
        "Android is a bad platform ?",
        2,
        listOf(Answer(1, "YES"), Answer(2, "NO"))
    )
)
@Composable
fun App(
    navController: NavHostController = rememberNavController()
) {

    MaterialTheme {
        NavHost(
            navController = navController,
            startDestination = "/welcome",
        ) {
            composable(route = "/welcome") {
                welcomeScreen(
                    onStartButtonPushed = {
                        navController.navigate(route = "/quiz")
                    }
                )
            }
            composable(route = "/quiz") {
                    questionScreen(
                        questions = questions,
                        /* FOR SPEAKER TALK DEMO ON WEB APP */
                        onFinishButtonPushed = {
                            score: Int, questionSize: Int -> navController.navigate(route = "/score/$score/$questionSize")
                        }
                    )
            }
            composable(route = "/score/{score}/{total}") {
                scoreScreen(
                    score = it.arguments?.getString("score")?.toInt() ?:-1,
                    total = it.arguments?.getString("total")?.toInt() ?:-1,
                    onResetButtonPushed = {
                        navController.navigate(route = "/quiz")
                    }
                )
            }

        }
    }
}
```
::: 

::: warning

As you can see all composables now take as parameter a navigator.
It will be needed to navigate with routes between screens.

for example, the `WelcomeScreen` composable is now declared as follows :

```kotlin
@Composable()
fun welcomeScreen(navigator: Navigator){
    ...

```
:::

#### Use the navigation host

##### Use the callback

Use `onStartButtonPushed` declared on screen instantiation in the `NavHost` on welcome screen buttons click

::: details WelcomeScreen.kt (SourceSet: commonMain)
```kotlin
fun welcomeScreen(onStartButtonPushed: () -> Unit) {
...

    Button(
        modifier = Modifier.padding(all = 10.dp),
        onClick = { onStartButtonPushed() }
    ) {
...
```

The same can be done for other screens

*QuestionScreen.kt* (commonMain)
```kotlin
fun questionScreen(questions: List<Question>, onFinishButtonPushed: (Int,Int) -> Unit) {
..
Button(
                modifier = Modifier.padding(bottom = 20.dp),
                onClick = {
                    /* FOR SPEAKER TALK DEMO ON WEB APP */
                    if (getPlatform().name == "WASM") {
                        onSaveStatQuestion(
                            questions[questionProgress].id,
                            questions[questionProgress].label,
                            selectedAnswer,
                            questions[questionProgress].correctAnswerId,
                            questions[questionProgress].answers[selectedAnswer.toInt() - 1].label
                        )
                    }

                    if (selectedAnswer == questions[questionProgress].correctAnswerId) {
                        score++
                    }
                    if (questionProgress < questions.size - 1) {
                        questionProgress++
                        selectedAnswer = 1
                    } else {
                        onFinishButtonPushed(score, questions.size)
                    }
                }
}
...
```
:::

::: details ScoreScreen.kt (SourceSet : commonMain)
```kotlin

fun scoreScreen(score: Int,total:Int,onResetButtonPushed: () -> Unit){
...
 Button(
     modifier = Modifier.padding(all = 20.dp),
    onClick = {
        onResetButtonPushed()
     }
 ) 
...
```
:::


## 🎯 Solutions

::: tip Sources
The full solution for this section is availabe [here](https://github.com/worldline/learning-kotlin-multiplatform/raw/main/docs/src/assets/solutions/2.navigation.zip) 
:::

**✅ If everything is fine,  congrats, you've just finish this codelab. You can now experiment your kotlin skills eveywhere !**

## 📖 Further reading
- [Precompose navigation](https://github.com/Tlaster/PreCompose/blob/master/docs/component/navigation.md)
- [Moko]('https://github.com/icerockdev/moko-resources')
- [KMP awesome libs database](https://github.com/terrakok/kmp-awesome)
- [Animation in compose cheat sheet](https://storage.googleapis.com/android-stories/compose/Compose_Animation_Cheat_Sheet.pdf)
- [The accompagnist : a group of libraries that aim to supplement Compose](https://google.github.io/accompanist/)
- [AAkira libs database](https://github.com/AAkira/Kotlin-Multiplatform-Libraries#repository)

