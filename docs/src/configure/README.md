# Configure a KMP project (10 min)



## Plugins installation

* Open Android Studio Electric Eel or above
* Select ``Plugins`` tab  
* search for [``Kotlin Multiplatform``](https://plugins.jetbrains.com/plugin/14936-kotlin-multiplatform-mobile) and click on install button
* search for [``Compose Multiplatform``](https://plugins.jetbrains.com/plugin/16541-compose-multiplatform-ide-support) and click on install button  
![plugins installation](../assets/images/plugins_install.png)
* restart your IDE

::: tip
For macOS devs only,[``kdoctor``](https://github.com/Kotlin/kdoctor) command line interface (CLI) is available.
It will help you to ensure that your computer is correctly configured for KMM development.

```bash
brew install kdoctor
kdoctor
````

:::

## Create a kotlin multiplatform mobile project 

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

**✅ You are all set for the initial project configuration**

::: tip
Before going to the next chapter, you that can get the project configured at this step [here](https://github.com/worldline/learning-kotlin-multiplatform/raw/main/docs/src/assets/sources/km-part0-initial.zip)
:::


## How it works ?

### Understand your project structure

There are two views for KMM projects in Android studio :
* **Android view (default)** : a logical view grouping and sorting android releated files. It's a very convenient view when you are dealing with android/kotlin code. This view also groups the gradle configurations files making easier to use this view for global project configuration. But from there no iOS swift code (the module simply not shows up), android modules (androidMain, androidApp) folders are hidden but content is listed.
* **Project view** : a filesystem view of your project. From there you can open you iOS swift source code and have the full control of your files, directories

You can switch between them on the project tab in the IDE

![project_structure.png](../assets/images/project_structure.png)

### 1 - KMM library module (shared)

A shared library module linked to all project platforms (```commonMain```). Contains the source code common to all your supported platforms.

#### 1.1 - Shared kotlin source files (commonMain)

On the sample, It's a simple greet function, that will use a per platform ```getPlatform()``` function


Greeting.kt
```kotlin
package com.devoxxfr2023.km

class Greeting {
    private val platform: Platform = getPlatform()

    fun greet(): String {
        return "Hello, ${platform.name}!"
    }
}
```

### 2 -  KMM specific library modules (iosMain, androidMain)

One submodule per platform, linked to the common module sources. It gives the possibility to make specific implementations of functions per platform 

#### 2.1 - Platform specific source file

When you need a specific implementation for Android and iOS of getPlatform() to return the platform name, KMM uses :

* ```expect``` keyword on the KMP shared library (commonMain) before functions indicating that we need a specific implementation of this function
* ```actual``` keywords on the KMP shared library specific modules (iosMain, androidMain) before functions to indicate the implementation.

::: tip
More information about platform specific functions in KMP [here](https://kotlinlang.org/docs/multiplatform-connect-to-apis.html))
::: 

platform.kt (commonMain)
```kotlin
package com.devoxxfr2023.km

interface Platform {
    val name: String
}
expect fun getPlatform(): Platform
```

Platform.kt (androidMain)
```kotlin
package com.devoxxfr2023.km

class AndroidPlatform : Platform {
    override val name: String = "Android ${android.os.Build.VERSION.SDK_INT}"
}
actual fun getPlatform(): Platform = AndroidPlatform()
```

Platform.kt(iosMain)
```kotlin
package com.devoxxfr2023.km
import platform.UIKit.UIDevice

class IOSPlatform: Platform {
        override val name: String = UIDevice.currentDevice.systemName() + " " + UIDevice.currentDevice.systemVersion
}
actual fun getPlatform(): Platform = IOSPlatform()
```

### 3 - Apps modules 

The modules that will use the developped common library. Here you can configure Android/iOS final apps.
If your are not using compose multiplatform, you can develop your views here.

### Android module (AndroidApp)

The Android app declaration with ressouces, manifest and activities
Notice that your multiplatform library functions ``greet()`` can be used there.

MainActivity.kt
```kotlin
package com.devoxxfr2023.km.android
import com.devoxxfr2023.km.Greeting

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            var greet = Greeting().greet()
            ...
```            

### iOS module (AndroidApp)

For ```iOSApp``` project you can open the .xcworkspace with Xcode for completion, build specific configurations

Notice that your multiplatform library functions ``greet()`` is ready to use.

ContentView.swift
```swift
import SwiftUI
import shared

struct ContentView: View {
	let greet = Greeting().greet()
	...

```

### 4 - Gradle configurations

Gradle configurations files are key for configuring KMM to 
* define supported platform on the project, 
* version of OS, app name for each platform
* include shared or specific third partiy libraries to the project

### gradle/gradle-wrapper.properties


It contains the environment variable for project gradle version

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-7.5-bin.zip
```

### gradle.properties

It contains the environment variables needed for your KMM project 

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

This is a the key KMM configuration file.

You can configure :

#### Plugins needed

```kotlin
plugins {
    kotlin("multiplatform")
    kotlin("native.cocoapods")
    id("com.android.library")
}
```

#### KMM configuration

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


## Desktop jvm module to KMM project

::: warning

Because KMP is not fully supported by Android studio, there is no template project (KMM+KMP) available for now.
You need to add manually your ``desktopApp`` & ``desktopMain`` modules on your project in few manual steps.

:::

### Files & folders structure to create 

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

## Deploy your apps 

To defines gradle configuration for deploying your development apps, you need to create a running configuration
describing gradle tasks

![topbar](../assets/images/android_studio_topbar.png)
*deployment topbar*

#### Running configuration for Android, iOS 

Nothing to do, your running configuration is already set  
You can select the config and click on play button to start the app on the device

#### Running configuration for Desktop 

For the desktop app you need to create a new configuration ( ``Edit Configurations...`` button)

* Then you can click on the top left ``+``button of the opened window 
* select ``gradle`` on the list
* on ``Run`` input field, set 
```bash
desktopApp:run
```
* click on ``ok``
* Try to build your application.

![hello android](../assets/images/hello_android.png)
![hello desktop](../assets/images/hello_desktop.png)
![hello ios](../assets/images/hello_ios.png)

**✅ If everything is fine, go to the next chapter →**

::: tip
If not, you can get the project configured at this step [here](https://github.com/worldline/learning-kotlin-multiplatform/raw/main/docs/src/assets/sources/km-part1-withdesktop.zip)
:::

# Ressources 
- [Android studio/Gradle compatibility guide](https://developer.android.com/studio/releases#android_gradle_plugin_and_android_studio_compatibility)
- [Multiplatform/Kotlin compatibility guide](https://github.com/JetBrains/compose-multiplatform/blob/master/VERSIONING.md#kotlin-compatibility)
- [iOS project structure](https://kotlinlang.org/docs/multiplatform-mobile-understand-project-structure.html#ios-application)
- [Cocoapods dependancy manager](https://kotlinlang.org/docs/native-cocoapods.html#use-a-kotlin-gradle-project-as-a-cocoapods-dependency)

