# Create a kotlin multiplatform mobile project 

![project configuration step1](../assets/images/project_config1.png)

* Select ``New project`` to arrive on project template selection
* Select ``Phone and Tablet`` tab
* Select ``Kotlin Multiplatform App`` (not Library)
* Click on ``Next`` button

![project configuration step2](../assets/images/project_config2.png)
* Name your project ``km``
* Name your classes root package ``com.devoxxfr2023.km``
* Click on ``next`` button

![project configuration step3](../assets/images/project_config3.png)
* Leave project structure by default (we will focus on it on ```How it works ?``` section below)
* Switch  ``iOS framework`` from Regular framework to ``Cocoapods dependency manager``
* Click on ``Finish`` button


### 4 - Gradle configurations

Gradle configurations files are key for configuring KMP to 
* define supported platform on the project, 
* version of OS, app name for each platform
* include shared or specific third partiy libraries to the project

### gradle/gradle-wrapper.properties


It contains the environment variable for project gradle version

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-7.5-bin.zip
```

### gradle.properties

It contains the environment variables needed for your KMP project 

```properties
#Gradle
    org.gradle.jvmargs=-Xmx2048M -Dfile.encoding=UTF-8 -Dkotlin.daemon.jvm.options\="-Xmx2048M"

    #MPP
    enableCInteropCommonization=true
    kotlin.mpp.androidSourceSetLayoutVersion=2
    ...
```

### settings.gradle.kts

The file define 

* the project name
* includes of specific app modules (iosApp, androidApp) 
* repositories used for plugins and third partiy libraries dependancies.

```kotlin
...
rootProject.name = "km"
include(":androidApp", ":shared", ":iosApp")
```

::: warning  
You can add the include of ``iosApp`` on the project.
It is not included by default because the build system is specific to iOS with ``xcodebuild``
but at least it will make ``iosApp`` module appear on the Android project tab view
:::


### build.gradle.kts (global)

It contains the libraries version used on the global project

```kotlin
plugins {
    //trick: for the same plugin versions in all sub-modules
    id("com.android.application").version("7.4.2").apply(false)
    id("com.android.library").version("7.4.2").apply(false)
    kotlin("android").version("1.8.0").apply(false)
    kotlin("multiplatform").version("1.8.0").apply(false)
}

tasks.register("clean", Delete::class) {
    delete(rootProject.buildDir)
}
```

### build.gradle.kts (shared)

This is a the key KMP configuration file.

You can configure :

#### Plugins needed

```kotlin
plugins {
    kotlin("multiplatform")
    kotlin("native.cocoapods")
    id("com.android.library")
}
```

#### KMP configuration

* with Android, ios app declaration and [Cocoapods iOS dependancy manager](https://guides.cocoapods.org/) configuration

```kotlin
kotlin {
    android {
        ... }
    iosX64()
    iosArm64()
    iosSimulatorArm64()
        cocoapods {
            ...
    }
```

#### Source dependencies description

It define dependencies for packaging correctly the common lib development.
You can also add third party dependencies for your shared library with ``implementation`` keyword

```kotlin
sourceSets {
        val commonMain by getting {
              dependencies {}
        }
        val androidMain by getting
        val iosX64Main by getting
        val iosArm64Main by getting
        val iosSimulatorArm64Main by getting
        val iosMain by creating {
            dependsOn(commonMain)
            iosX64Main.dependsOn(this)
            iosArm64Main.dependsOn(this)
            iosSimulatorArm64Main.dependsOn(this)
             dependencies {
                implementation...
            }
        }
        ...
```

::: tip
For this Hands-on Lab you can remove every ``***Test`` sourceset declaration, we will not use it
:::

* There is also on this file the library configuration 

```kotlin
android {
    namespace = "com.devoxxfr2023.km"
    compileSdk = 33
    defaultConfig {
        minSdk = 24
        targetSdk = 33
    }

    ...
}
```

### build.gradle.kts (androidApp)

Android standard gradle configuration files, define your android app version, your final app dependencies.

```kotlin
android { ... }
dependencies {
    implementation(project(":shared"))
    ...
}
```

### for iOS ?

::: warning
Notice that there is no ``build.gradle.kts file`` ``iosApp`` module because it is not using gradle build system in a standard way,  ``xcodebuild`` is used for the ios app build )
:::


## Desktop jvm module to KMP project

::: warning

Because KMP is not fully supported by Android studio, there is no template project (KMP+KMP) available for now.
You need to add manually your ``desktopApp`` & ``desktopMain`` modules on your project in few manual steps.

:::

### Files & folders structure to create 

::: details  file tree
```bash
├── iosApp
├── androidApp

├── shared
    └── androidMain
    └── iosMain
    └── desktopMain ←(CREATE THE FILE TREE)
        └── kotlin
            └── com
                └── devoxxfr2023
                    └── km
                        └── Platform.kt
├── desktopApp ←(CREATE THE FILE TREE)
    └── build.gradle.kts
    └── src
        └── jvmMain
            └── kotlin
                └── Main.kt
```
:::

### Declare the desktop app 

``setting.gradle.kts`` 
```kotlin
...
include(":androidApp", ":shared", ":iosApp", ":desktopApp")
```

### add jvm dependancy in ``build.gradle.kts`` (global)

```kotlin
...
   id("org.jetbrains.kotlin.jvm").version("1.8.0").apply(false)
...
```

### Create the ``build.gradle.kts`` (desktopApp)

```kotlin
plugins {
    kotlin("multiplatform")
    application
}

group = "com.devoxxfr2023.km"
version = "1.0-SNAPSHOT"

kotlin {
    jvm {
        jvmToolchain(11)
        withJava()
    }
    sourceSets {
        val jvmMain by getting {
            dependencies {
                implementation(project(":shared"))
            }
        }
    }

    application{
        mainClass.set("MainKt")
    }
}

```

### Update ``build.gradle.kts`` (shared)

```kotlin

kotlin {
    ...
    jvm("desktop")
    ...

 val desktopMain by getting {
            dependencies {}
        }
```

### Create your Platform.kt (desktopMain)

```kotlin
package com.devoxxfr2023.km

class DesktopPlatform: Platform {
    override val name: String = "Desktop"
}
actual fun getPlatform(): Platform = DesktopPlatform()
```


### Create your Main.kt (desktopApp)

```kotlin
import com.devoxxfr2023.km.Greeting

fun main(){
     var greet = Greeting().greet()
     println(greet) 
}
```

## Activate compose multiplatform

### Update the library project (shared)

#### Add compose library support for all platforms

::: details build.gradle.kts (global)
```kotlin
...
    id("org.jetbrains.compose").version("1.3.1").apply(false)
...
```
:::

::: warning
for iOS experimental compatibility, some gradle environment variables need to be set in ``gradle.properties``

```bash
org.jetbrains.compose.experimental.uikit.enabled=true
kotlin.native.cacheKind=none
```
:::

::: details build.gradle.kts (shared)
```kotlin
plugins {
    id("org.jetbrains.compose") // in dependencies declaration
    kotlin("native.cocoapods")
    ...
    cocoapods {
    ...
            // Mandatory : on cocoapods config define your lib as static 
            isStatic = true 
    }
    ...

  sourceSets {
    val commonMain by getting {
            dependencies {
                implementation(compose.ui) // Add compose libraries to shared modile
                implementation(compose.foundation)
                implementation(compose.material)
                implementation(compose.runtime)
    
    ...

    val desktopMain by getting {
            dependencies {
                api(compose.preview) // Add compose livrary to desktop module
    
    ...

   dependencies {
        // compose previews dependancies
        implementation("androidx.compose.ui:ui-tooling-preview:1.4.0")
        debugImplementation("androidx.compose.ui:ui-tooling:1.4.0")
   }

```
:::

#### Create a new App.kt file in `commonMain` source files

This file will contain the first composable view for all platforms.

```kotlin
package com.devoxxfr2023.km

import androidx.compose.material.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.material.Text

@Composable
internal fun App() {
    MaterialTheme {
         Text("Hello world")
    }
}
```

### Activate for Android

#### Check your compose dependencies on the Android project 

::: details build.gradle.kts (androidApp)
```kotlin
...
    implementation("androidx.compose.ui:ui:1.3.1")
    implementation("androidx.compose.ui:ui-tooling:1.3.1")
    implementation("androidx.compose.ui:ui-tooling-preview:1.3.1")
    implementation("androidx.compose.foundation:foundation:1.3.1")
    implementation("androidx.compose.material:material:1.3.1")
    implementation("androidx.activity:activity-compose:1.6.1")
```
:::


#### Share the App() composable on the Android library source (androidMain)

::: details create a new kotlin file ``AndroidApp.kt``

```kotlin
package com.devoxxfr2023.km

import androidx.compose.runtime.Composable

@Composable
fun AndroidApp() {
    App()
}
```
:::

#### Use this composable on your app Activity (androidApp)

```kotlin
package com.devoxxfr2023.km.android

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import com.devoxxfr2023.km.AndroidApp

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            AndroidApp()
            }
        }
    }
```

* You can now simply play your Android run configuration.


### Activate for Desktop

#### Update your gradle configuration

 ::: details *build.gradle.kts (desktopApp)*
 ```kotlin
import org.jetbrains.compose.desktop.application.dsl.TargetFormat

plugins {
    kotlin("multiplatform")
    id("org.jetbrains.compose") //plugin compose 
    // NB: remove application dependency
...
    sourceSets {
            val jvmMain by getting {
                dependencies {
                    implementation(project(":shared"))
                    implementation(compose.desktop.currentOs) //compose dependency
                }
            }
        }
...
// The compose block declaration is out of kotlin block
compose.desktop { // the block replace 
    application { // application previous declaration for gradle task "run"
        mainClass = "MainKt"
        nativeDistributions {
            targetFormats(TargetFormat.Dmg, TargetFormat.Msi, TargetFormat.Deb)
            packageName = "desktop"
            packageVersion = "1.0.0"
        }
    }
}
```
:::

#### Share the App() composable on the Desktop library source (desktopMain)

```kotlin
package com.devoxxfr2023.km

import androidx.compose.runtime.Composable

@Composable
fun DesktopApp() {
    App()
}
```

#### Use this composable on your app  (desktopApp)

```kotlin
import androidx.compose.ui.window.Window
import androidx.compose.ui.window.application
import com.devoxxfr2023.km.DesktopApp

fun main() = application { // kotlin application
    Window(onCloseRequest = ::exitApplication, title = "QuizApp") {
        DesktopApp() // composable view shared
    }
}
```

### Activate for iOS (experimental)

#### Share the App() composable on the iOS library source (iosMain)

::: details Create a new kotlin file named ``IosApp.kt``

```kotlin
package com.devoxxfr2023.km

import androidx.compose.ui.window.ComposeUIViewController
import platform.UIKit.UIViewController

fun MainViewController(): UIViewController =
    ComposeUIViewController {
        App()
    }
```
:::


#### Use this composable on your xcode app by replacing iOSApp.swift code  (iosApp)

::: details iosApp/iosApp/iOSApp.swift
```swift
import SwiftUI
import shared

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?

    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        window = UIWindow(frame: UIScreen.main.bounds)
        let mainViewController = IosAppKt.MainViewController()
        window?.rootViewController = mainViewController
        window?.makeKeyAndVisible()
        return true
    }
}
```
:::

::: tip
Also, the full sources can be retrieved [here](https://github.com/worldline/learning-kotlin-multiplatform/raw/main/docs/src/assets/sources/km-part2-withcompose.zip) 
:::


###########################################

# 🛠 Construisons une app multiplateforme !

## TP : Application multiplateforme + KMM + KMP pour Android, iOS et ordinateur de bureau

En combinant KMP, KMM et Compose, il est possible de développer des applications mobiles et de bureau multiplateformes en utilisant uniquement Kotlin.


[![kmp codelab](../../assets/kmp_codelab.png)](https://worldline.github.io/learning-kotlin-multiplatform/)  

Ce labo à un codelab dédié [qui accessible depuis ce lien](https://worldline.github.io/learning-kotlin-multiplatform/)

## PW : Ajouter une application serveur Ktor

Nous allons étendre l'application précédente avec un serveur Ktor et un client web React.
Le projet aura l'architecture suivante (❗ Ce choix d'architecture peut être sujet à discussion, mais nous nous en tiendrons à cela pour l'instant)

![architecture](../../assets/fs-kmp-architecture.drawio.svg)

- Ajouter un module dans le projet appelé **sharedFullStack** qui contiendra :
  - Dans _commonMain_ : Du code partagé qui sera utilisé par le projet **shared**.
  - Dans _jvmMain_ : Un serveur Ktor qui sert une API Rest pour fournir les _questions_ et héberge quelques fichiers HTML. L'un des fichiers HTML chargera une application react qui sera développée en Kotlin/JS.
  - Dans _jsMain_ : Un client web react. Cette cible ne générera que le code JS, la page HTML qui le charge sera fournie par le serveur Ktor comme expliqué plus haut.
  - 💡 Avec IntelliJ vous pouvez faire un clic droit sur les dossiers **xxxMain/kotlin** et **xxxMain/resources** et utiliser **Mark Directory as** pour obtenir plus de support de la part de l'IDE.
- Mettez à jour le fichier de construction de ce nouveau module comme suit :
  - plugins : `multiplatform`, `serialilzation` et `application`. Ce dernier sera utilisé pour spécifier le fichier principal du serveur qui sera exécuté avec la tâche `run`.
  - Ajoutez le plugin `kotlin("multiplatform")` et ciblez toutes les plateformes possibles (web, desktop, jvm et mobile) pour être complet.
  - Les dépendances devraient être les suivantes :
    - _commonMain_ : client kotr (puisque nous voulons ajouter le client API dans le code partagé)
    - _jvmMain_ : serveur ktor + sérialisation json + cors (pour que le html puisse charger le JS)
    - _jsMain_ : Kotlin React
  - Nous devons ajouter deux tâches, la première produit l'application JS React et l'autre copie dans les ressources du serveur Ktor.
  - Définir la classe principale du plugin `application`.
  - Le fichier devrait [ressembler à ce qui suit] (https://github.com/worldline/learning-kotlin/blob/main/material/kmm-fullstack-demo/sharedFullStack/build.gradle.kts)
- Déplacer le modèle API et les fichiers clients de **shared** vers **sharedFullStack** (`Anwser`, `Quiz`, `Question`, `QuizAPI` et `QuizRepository`)
- ⚠️ Quelques points à noter :
  - Dans le fichier de construction d'android, ajoutez **io.netty.versions.properties** et **INDEX.LIST** au fichier de construction d'android.
  - Notre tâche globale de nettoyage peut entrer en conflit avec celle de Kotlin/JS, si c'est le cas, nous pouvons corriger cela en renommant notre tâche de nettoyage dans la racine **build.gradle.kts**
    packagingOptions exclues.
- Ecrivez le code nécessaire pour le serveur et le client. Le serveur doit fournir ces points de terminaison :
  - Un GET sur `/` fournit un fichier html qui charge **sharedFullStack.js** parce que c'est le nom du JS qui est généré.
  - Un GET sur `/quiz` fournit un JSON de `Quiz` généré par le serveur
  - Un GET sur `/quiz.html` sert une page HTML générée par le serveur en utilisant le HTML DSL.
- Changez la classe `QuizAPI` pour qu'elle appelle notre serveur local _http://localhost:8081/quiz_ et supprimez les arguments de la méthode json ci-dessus puisque le serveur met en place les bons headers.
- Lancer la tâche gradle "application -> run" du module **sharedFullStack**, qui copiera le JS généré dans le dossier ressources du serveur Ktor.
- Ouvrez _http://localhost:8081_ pour exécuter l'application react

![kmm-fs-react-demo](../../assets/kmm-fs-react-demo.png)

- Exécutez l'application de bureau qui récupère le quiz sur le serveur local.

![](../../assets/kmp-fs-desktop-local-ktor.png)

- Le test sur mobile est un peu plus complexe parce que localhost peut être mappé à une autre adresse et que le HTTP non sécurisé est bloqué par défaut.

Le projet final est [disponible ici] (https://github.com/worldline/learning-kotlin/tree/main/material/kmm-fullstack-demo) dans le module **sharedFullStack**.

## PW : Ajouter une cible Compose for Web Canvas (expérimental)

Compose for Web Canvas permet d'utiliser la même surface d'API que Compose Desktop et Android.
Ajoutons un autre module pour l'expérimenter.

![architecture web canvas](../../assets/fs-kmp-webcanvas-architecture.drawio.svg)

- Dans la racine **settings.gradle.kts**, ajoutez ce dépôt maven `maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")` qui a les dépendances de Compose for Web Canvas.
- Dans **gradle.properties**, ajoutez cette ligne `org.jetbrains.compose.experimental.jscanvas.enabled=true`.
- Dans le fichier de construction du module **shared**, ajoutez une cible `js(IR) { browser() }` et un sourceSet **jsMain** avec ces dépendances : `compose.web.core`, `compose.ui` et `compose.material3`.
  - Implémentez le fichier `Platform` et fournissez un composable pour l' `App`. Voici un [exemple d'implémentation] (https://github.com/worldline/learning-kotlin/tree/main/material/kmm-fullstack-demo/shared/src/jsMain/kotlin/com/devoxxfr2023/km)
- Ajoutez un module nommé **composeWebCanvasApp** et définissez


###############################################

# 🛠 Let's make a cross-plaform app !

## PW : Cross-platform app + KMM + KMP for Android, iOS and Desktop

By combining KMP, KMM and Compose, it is possible to fully develop cross-platform mobile and desktop apps using only Kotlin.

[![kmp codelab](../../assets/kmp_codelab.png)](https://worldline.github.io/learning-kotlin-multiplatform/)  
_This pw is so huge [that it has its own codelab](https://worldline.github.io/learning-kotlin-multiplatform/)_

## PW : Add a Ktor server App

We'll extend the previous app with a Ktor server and a React web client.
The project will have the following architecture.
This architecture choice may be subject to discussion, but we'll stick with this for now.

![architecture](../../assets/fs-kmp-architecture.drawio.svg)

- Add a module into the project called **sharedFullStack** which will contain:
  - In _commonMain_: Some shared code that will by used by the **shared** project.
  - In _jvmMain_: A Ktor server that serves a Rest API to provide the _questions_ and hosts some html files. One of the HTML files will load a react app that will be developed in Kotlin/JS.
  - In _jsMain_: A react web client. This target will only generate the JS code, the HTML page that loads this will be provided by Ktor server as explained above.
  - 💡 With IntelliJ you can right click on **xxxMain/kotlin** and **xxxMain/resources** folders and use **Mark Directory as** to get more support from the IDE.
- Update the build file of this new module as follows:
  - plugins: `multiplatform`, `serialilzation` and `application`. The latter will be used to specify the main file the server which will be run with the `run` task.
  - Add the `kotlin("multiplatform")` plugin and target all possible platforms (web, desktop, jvm ans mobile) for completeness.
  - The depdencies should be as follows:
    - _commonMain_: kotr client (since we want to add the API client into the shared code)
    - _jvmMain_: ktor server + json sertialzation + cors (so that the html can load the JS)
    - _jsMain_: Kotlin React
  - We need to add two tasks, the first one produces the JS react app and the other one copies into the resources of the Ktor server
  - Set the main class of the `application` plugin.
  - The file should [look as follows](https://github.com/worldline/learning-kotlin/blob/main/material/kmm-fullstack-demo/sharedFullStack/build.gradle.kts)
- Move the API model and client files from **shared** to **sharedFullStack** (`Anwser`, `Quiz`, `Question`, `QuizAPI` and `QuizRepository`)
- ⚠️ Some things to take note of:
  - In the android build file, add **io.netty.versions.properties** and **INDEX.LIST** to
  - Our global clean task may conflict with Kotlin/JS's one, if that the case, we can fix this by renaming our clean task in the root **build.gradle.kts**
    packagingOptions excludes.
- Write the necessary code for both the server and the client. The server should provide these endpoints:
  - A GET on `/` provides an html file that loads **sharedFullStack.js** because this is the name of the JS that is generated.
  - A GET on `/quiz` provides a JSON of server generated `Quiz`
  - A GET on `/quiz.html` servers a server generated HTML page using the HTML DSL
- Change the `QuizAPI` class so that it calls our local server _http://localhost:8081/quiz_ and remove the arguments of the json method above since the server sets the correct headers.
- Launch the gradle task "application -> run" of the **sharedFullStack** module, which will copy the generated JS into the Ktor server ressources folder.
- Open _http://localhost:8081_ to run the react App

![kmm-fs-react-demo](../../assets/kmm-fs-react-demo.png)

- Run the desktop app which fetches the quiz from the local server.

![](../../assets/kmp-fs-desktop-local-ktor.png)

- Testing on mobile is a little bit more complex because localhost may be mapped to another address non secure HTTP is blocked by default.

The final project is [available here](https://github.com/worldline/learning-kotlin/tree/main/material/kmm-fullstack-demo) in the **sharedFullStack** module.

## PW: Add a Compose for Web Canvas target (experimental)

Compose for Web Canvas allows to use the same API surface as Compose Desktop and Android.
Let's add another module to try this out.

![architecture web canvas](../../assets/fs-kmp-webcanvas-architecture.drawio.svg)

- In the root **settings.gradle.kts**, add this maven repository `maven("https://maven.pkg.jetbrains.space/public/p/compose/dev")` that has Compose for Web Canvas dependencies.
- In **gradle.properties** add this line `org.jetbrains.compose.experimental.jscanvas.enabled=true`.
- In the **shared** module's build file, add a `js(IR) { browser() }` target and a **jsMain** sourceSet with these dependencies: `compose.web.core`, `compose.ui` and `compose.material3`
  - Implement the `Platform` file and provide a composable for the `App`. Here is an [example implementation](https://github.com/worldline/learning-kotlin/tree/main/material/kmm-fullstack-demo/shared/src/jsMain/kotlin/com/devoxxfr2023/km)
- Add a module named **composeWebCanvasApp** and define it as a Kotlin/JS web app.
  - add `src/jsMain/kotlin` folder and `src/jsMain/resources` folder
  - 💡 With IntelliJ you can right click on these folders and use **Mark Directory as** to get more help later from the IDE.
- Set the **js** target in the build file with Compose for Web Canvas dependencies
  - The build file should be similar [to this one](https://github.com/worldline/learning-kotlin/blob/main/material/kmm-fullstack-demo/composeWebCanvasApp/build.gradle.kts)
- In the resources folder, create an index.html file that loads the JS files:
  - The one that is generated by Kotlin/JS and should be named **composeWebCanvasApp.js**.
  - **skiko.js** which is dependency of Compose for Web Canvas.
  - Here is an example [of such file](https://github.com/worldline/learning-kotlin/blob/main/material/kmm-fullstack-demo/composeWebCanvasApp/src/jsMain/resources/index.html)
- ⚠️ The current `App()` imported from main crashes on this target because we are not using precompose for the web. In the current correction we just place a `Text` while we look for a fix.
  - Add this [Kotlin file](https://github.com/worldline/learning-kotlin/blob/main/material/kmm-fullstack-demo/composeWebCanvasApp/src/jsMain/kotlin/tech/worldline/demo/BrowserViewportWindow.kt) which defines a `BrowserViewportWindow` that allows to render a composable into a Canvas.
  - Add this [Kotlin file](https://github.com/worldline/learning-kotlin/blob/main/material/kmm-fullstack-demo/composeWebCanvasApp/src/jsMain/kotlin/tech/worldline/demo/AppTheme.kt) which defines a default theme for the App
  - The main Kotlin file has [the following code](https://github.com/worldline/learning-kotlin/blob/main/material/kmm-fullstack-demo/composeWebCanvasApp/src/jsMain/kotlin/tech/worldline/demo/MainWeb.kt)
- Run the app by launching the `jsBrowserDevelopmentRun` gradle task of the **composeWebCanvasApp** module.

![](../../assets/compose-web-demo.png)

The final project is [available here](https://github.com/worldline/learning-kotlin/tree/main/material/kmm-fullstack-demo) in the **composeWebCanvasApp** module.

## Going futher

- Add a Compose Web target to the project

## Sources and references

- [Full Stack JVM & JS App Hands-On Lab](https://github.com/kotlin-hands-on/jvm-js-fullstack)
- [Build a full-stack web app with Kotlin Multiplatform](https://kotlinlang.org/docs/multiplatform-full-stack-app.html)
- [Build a web application with React and Kotlin/JS — tutorial](https://kotlinlang.org/docs/js-react.htm)
- [JetBrains/skiko](https://github.com/JetBrains/skiko)
- [burnoo/DemoListApp](https://github.com/burnoo/DemoListApp)
