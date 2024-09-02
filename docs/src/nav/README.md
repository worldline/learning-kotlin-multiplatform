# Navigation & more

##  🧪 Create Navigation between composable screens 

[`PreCompose`](https://github.com/Tlaster/PreCompose/blob/master/docs/component/navigation.md) is a third party library that enables missing features
of the KMP beta. 

It can enables feature similar to Android Jetpack compose such as : 
* Navigation with navigation host
* ViewModel from Android Architecture pattern
* Molecule that improve business logic development thanks to flows

For this Hands-on Lab we will mainly focus on navigation feature of PreCompose.

#### Add `PreCompose` dependency to your project

::: details gradle.build.kts (module : shared)
```kotlin
...
val commonMain by getting {
            dependencies {
                ...
                api("moe.tlaster:precompose:1.5.10")
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

::: details Navhost.kt (SourceSet: commonMain)
```kotlin
private val quizRepository = QuizRepository()

@Composable
internal fun rootNavHost() {

    val navigator = rememberNavigator()
    NavHost(
        navigator = navigator,
        navTransition = NavTransition(),
        initialRoute = "/welcome",
    ) {
        scene(
            route = "/welcome",
            navTransition = NavTransition(),
        ) {
            welcomeScreen(navigator)
        }
        scene(
            route = "/quiz",
            navTransition = NavTransition(),
        ) {

            val questions = quizRepository.questionState.collectAsState()

            if (questions.value.isNotEmpty()) {
                questionScreen(navigator, questions.value)
            }
        }
        scene(
            route = "/score/{score}",
            navTransition = NavTransition(),
        ) { backStackEntry ->
            backStackEntry.path<String>("score")?.let { score ->
                scoreScreen(navigator, score)
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
internal fun welcomeScreen(navigator: Navigator){
    ...

```
:::

### Declare your App composable as a PrecomposeApp
::: details App.kt (module : shared)
```kotlin 

@Composable
fun App(){
    MaterialApp{
        PreComposeApp {
            rootNavHost() 
        }
```
:::

#### Use the navigation host

##### instantiate the navHost on the App main composable.
Because the `WelcomeScreen` was set as initialRoute, it will start correctly the quizz

::: details App.kt (SourceSet : commonMain)*

```kotlin
@Composable
internal fun App() {
    MaterialTheme {
        rootNavHost()
    }
}
```
:::

##### User the `navigator`on screen buttons click

::: details WelcomeScreen.kt (SourceSet: commonMain)
```kotlin
...
Button(
    modifier = Modifier.padding(all = 10.dp),
    onClick = { navigator.navigate(route = "/quiz") }
) {
    Text("Start the Quizz")
}
...
```

*QuestionScreen.kt* (commonMain)
```kotlin
...
Button(
    modifier = Modifier.padding(bottom = 20.dp),
    onClick = {
        if(selectedAnswer == questions[questionProgress].correctAnswerId) {
            score++ // Increment the score when answer is correct
        }
        if (questionProgress < questions.size - 1) {
            questionProgress++ // Case 1 : Still some questions
            selectedAnswer = 1 // -> recompose QuizQuestion
        }else{
            // Case 2 : no more questions
            // -> navigate to score screen
            navigator.navigate("/score/$score out of ${questions.size}")
        }
}
...
```
:::

::: details ScoreScreen.kt (SourceSet : commonMain)
```kotlin
...
Button(
    modifier = Modifier.padding(all = 20.dp),
    onClick = {
        navigator.navigate(route = "/quiz")
    }
) {
    Icon(Icons.Filled.Refresh, contentDescription = "Localized description")
    Text(text = "Retake the Quizz",)
}
...
```
:::

::: warning
Depending of your JDK used, compiler can complain about mismatch of jvm version for android and desktop.
In that case, update your `jvmtarget` defined in `build.gradle.kts` (shared) 
:::

## 🎯 Solutions

::: tip
The full sources can be retrieved [here](https://github.com/worldline/learning-kotlin-multiplatform/raw/main/docs/src/assets/solutions/4.navigation.zip) 
:::

## 👷‍♂️ Manage  ressources

- For common code, store your resource files in the resources directory of the commonMain source set.
- For platform-specific code, store your resource files in the resources directory of the corresponding source set.

 Jetbrain release his experimental API `painterResource` from `org.jetbrains.compose.resource` package
```kotlin
@ExperimentalResourceApi
@Composable
public fun painterResource(
    res: String
): Painter
```

- **Return** a Painter from the given resource path. Can load either a BitmapPainter for rasterized images (.png, .jpg) or a VectorPainter for XML Vector Drawables (.xml).
- **XML Vector Drawables** have the same format as for Android (https://developer.android.com/reference/android/graphics/drawable/VectorDrawable) except that external references to Android resources are not supported. 
- Note that XML Vector Drawables are not supported for Web target currently.
  
### Android
To make your resources accessible from the resource library, use the following configuration in your build.gradle.kts file:

```kotlin
android {
    // …
    sourceSets["main"].resources.srcDirs("src/commonMain/resources")
}
```

For iOS, the Compose Multiplatform Gradle plugin handles resource deployment. The plugin stores resource files in the compose-resources directory of the resulting application bundle.

```kotlin
val commonMain by getting {
    dependencies {
        // Your dependencies
        @OptIn(org.jetbrains.compose.ExperimentalComposeLibrary::class)
        implementation(compose.components.resources)
    }
}
```

Nothing to do for desktop App 

### Usage on the app

```kotlin
Image(
    painterResource("compose-multiplatform.xml"),
    null // description
)
```

### Access fonts and string resources

For more ressource management possibilities for font and String management, you can use a third party lib :
-  [Moko]('https://github.com/icerockdev/moko-resources') 
- [Libres](https://github.com/Skeptick/libres)


### Usage of other custom  ressources types 

```kotlin
@OptIn(ExperimentalResourceApi::class)
@Composable
fun App() {
    var text: String? by remember { mutableStateOf(null) }

    LaunchedEffect(Unit) {
        text = String(resource("welcome.txt").readBytes())
    }

    text?.let {
        Text(it)
    }
}
```

**✅ If everything is fine,  congrats, you've just finish this codelab. You can now experiment your kotlin skills eveywhere !**

## 📖 Further reading
- [Precompose navigation](https://github.com/Tlaster/PreCompose/blob/master/docs/component/navigation.md)
- [Moko]('https://github.com/icerockdev/moko-resources')
- [KMP awesome libs database](https://github.com/terrakok/kmp-awesome)
- [Animation in compose cheat sheet](https://storage.googleapis.com/android-stories/compose/Compose_Animation_Cheat_Sheet.pdf)
- [The accompagnist : a group of libraries that aim to supplement Compose](https://google.github.io/accompanist/)
- [AAkira libs database](https://github.com/AAkira/Kotlin-Multiplatform-Libraries#repository)

