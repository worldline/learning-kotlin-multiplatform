
#  Ressources

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
  

 ## Images 

 #### CommonMain

*build.gradle*
```kotlin
        commonMain.dependencies {
            ...
            // enable resources multiplatform dependancy
            implementation(compose.components.resources)
            ...
        }
```

#### Android
To make your resources linking in the android App from your KMP library, have a look to the following configuration in your build.gradle.kts file:

```kotlin
...
android {
    // …
    sourceSets["main"].resources.srcDirs("src/commonMain/resources")
}
```

#### Usage

*WelcomeScreen.kt*
``` kotlin
import quiz.composeapp.generated.resources.Res
...

Image(
                    modifier = Modifier.size(70.dp),
                    painter = painterResource(Res.drawable.question),
                    contentDescription = null
                )
```

## Fonts and String

For more ressource management possibilities for font and String management, you can use a third party lib :
-  [Moko]('https://github.com/icerockdev/moko-resources') 
- [Libres](https://github.com/Skeptick/libres)


## Strings

`composeResources/values`
```xml
<resources>
    <string name="app_name">Hello World App</string>
</resources>
```

```kotlin
Text(stringResource(Res.string.app_name))
```

## Fonts
Put your font files in the `composeResources/font` directory.

Then you can charge your your font like this :

```kotlin
val fontAwesome = FontFamily(Font(Res.font.my_font))
```

## Other ressources

```kotlin
  LaunchedEffect(Unit) { 
    bytes = Res.readBytes("files/myDir/someFile.ext")
  }
```

**✅ If everything is fine,  congrats, you've just finish this codelab. You can now experiment your kotlin skills eveywhere !**

## 📖 Further reading
- [Access and usage of KMP ressources](https://www.jetbrains.com/help/kotlin-multiplatform-dev/compose-multiplatform-resources-usage.html#resource-usage)
