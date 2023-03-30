# User interface (30 min)

## Definitions

### [Kotlin Compose Multiplatform](https://www.jetbrains.com/lp/compose-mpp/)

Compose Multiplatform simplifies and accelerates UI development for Desktop and Web applications, and allows extensive UI code sharing between Android, iOS, Desktop and Web.
It's a modern toolkit for building native UI. Quickly bring your app to life with less code, powerful tools, and intuitive Kotlin APIs.
It is based on [Android Jetpack Compose](https://developer.android.com/jetpack/compose) declarative UI approach ( which is similar also to [SwiftUI](https://developer.apple.com/xcode/swiftui/) for iOS )

### [UIKit](https://developer.apple.com/documentation/uikit)

UIKit provides a variety of features for building apps, including components you can use to construct the core infrastructure of your iOS, iPadOS, or tvOS apps. The framework provides the window and view architecture for implementing your UI, the event-handling infrastructure for delivering Multi-Touch and other types of input to your app, and the main run loop for managing interactions between the user, the system, and your app.

## Activate compose multiplatform

### Update the library project (shared)

#### Add compose library support for all platforms

build.gradle.kts (global)
```groovy
...
    id("org.jetbrains.compose").version("1.3.1").apply(false)
...
```

::: warning
for iOS experimental compatibility, some gradle environment variables need to be set in ``gradle.properties``

```bash
org.jetbrains.compose.experimental.uikit.enabled=true
kotlin.native.cacheKind=none
```
:::

build.gradle.kts (shared)
```groovy
plugins {
    id("org.jetbrains.compose")
    kotlin("native.cocoapods")

    ...
            isStatic = true // Mandatory : on cocoapods config define your lib as static 
    ...
  sourceSets {
    val commonMain by getting {
            dependencies {
                implementation(compose.ui)
                implementation(compose.foundation)
                implementation(compose.material)
                implementation(compose.runtime)
    
    ...

    val desktopMain by getting {
            dependencies {
                api(compose.preview)
    
    ...

   dependencies {
        implementation("androidx.compose.ui:ui-tooling-preview:1.4.0")
        debugImplementation("androidx.compose.ui:ui-tooling:1.4.0")
   }

```

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

build.gradle.kts (androidApp)
```groovy
...
    implementation("androidx.compose.ui:ui:1.3.1")
    implementation("androidx.compose.ui:ui-tooling:1.3.1")
    implementation("androidx.compose.ui:ui-tooling-preview:1.3.1")
    implementation("androidx.compose.foundation:foundation:1.3.1")
    implementation("androidx.compose.material:material:1.3.1")
    implementation("androidx.activity:activity-compose:1.6.1")
```


#### Share the App() composable on the Android library source (androidMain)

* create a new kotlin file ``AndroidApp.kt``

```kotlin
package com.devoxxfr2023.km

import androidx.compose.runtime.Composable

@Composable
fun AndroidApp() {
    App()
}
```

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

 *build.gradle.kts (desktopApp)*
 ```groovy
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
    Window(onCloseRequest = ::exitApplication, title = "QuizzApp") {
        DesktopApp() // composable view shared
    }
}
```

### Activate for iOS (experimental)

#### Share the App() composable on the iOS library source (iosMain)

* Create a new kotlin file named ``IosApp.kt``

```kotlin
package com.devoxxfr2023.km

import androidx.compose.ui.window.ComposeUIViewController
import platform.UIKit.UIViewController

fun MainViewController(): UIViewController =
    ComposeUIViewController {
        App()
    }
```

#### Use this composable on your xcode app by replacing iOSApp.swift code  (iosApp)

iosApp/iosApp/iOSApp.swift
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

### Declarative UI principles

TODO Modifiers , column, Box , Card ... declaration and preview of a composable.


## Create composable views for the Quiz


### WelcomeScreen

![Welcome Screen preview](../assets/images/welcomescreen.png)

You can now create your first view.
For the Quiz we need a welcome screen displaying a Card centered with a button inside to start the quiz

* Create a new composable `WelcomeScreen.kt` on commonMain module 
* Make sure that the App() composable is using it has below 

```kotlin
@Composable
internal fun App() {
    MaterialTheme {
        welcomeScreen()
    }
}
```

* Run you first view on all platforms , it should work. 

::: tip
You can see the answer [here]("../assets/sources/WelcomeScreen.kt")
:::

## Data classes for the Quiz

**UML** 

![class_diagram](../assets/images/uml.png)  
**Answer.kt** (commonMain)
```kotlin
package com.devoxxfr2023.kmm.network.data

data class Answer(val id: Int, val label: String )
```

**Question.kt** (commonMain)
```kotlin
package com.devoxxfr2023.kmm.network.data

data class Question(val id:Int, val label:String, val correctAnswerId:Int, val answers:List<Answer>)
```


**Quiz.kt.kt** (commonMain)
```kotlin
package com.devoxxfr2023.kmm.network.data

data class Quiz(var questions: List<Question>)
```




# Ressources
- [Jetpack Compose for iOS](https://betterprogramming.pub/jetpack-compose-for-ios-getting-started-step-by-step-e7be6f52edd4)
- [Precompose navigation](https://github.com/Tlaster/PreCompose/blob/master/docs/component/navigation.md)



[Quiz|+questions: List]++-0..*>[Question]
[Question|+id: Int;+label: String; +correctId:Int, +answers:List]++-0..*>[Answer]
[Answer|+id: Int;+label:String]
https://yuml.me/diagram/scruffy/class/draw

