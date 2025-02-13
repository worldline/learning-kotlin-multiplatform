
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
#### Android
To make your resources accessible from the resource library, use the following configuration in your build.gradle.kts file:

```kotlin
android {
    // …
    sourceSets["main"].resources.srcDirs("src/commonMain/resources")
}
```

#### iOS,
 The Compose Multiplatform Gradle plugin handles resource deployment. The plugin stores resource files in the compose-resources directory of the resulting application bundle.

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

#### Usage

```kotlin
Image(
    painterResource("compose-multiplatform.xml"),
   //Alternative painter = painterResource(resource = Res.drawable.composeimg)
    null // description
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
