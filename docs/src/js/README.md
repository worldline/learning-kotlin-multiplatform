#  👷‍♂️  add the JS app

Even though the official template does not support the web target, we can use the sample GitHub project Kotlin/kotlin-wasm-examples/compose-imageviewer with fortunately support all compose targets.
 ./gradlew --console=plain :webApp:wasmRun. 


The web target can be run with:
 
 ``` bash
./gradlew jsApp:jsBrowserDevelopmentRun
 ```


You can bypass CORS issue if you don't have a local server with Chrome as below:
``` bash
<google chrome path> --disable-web-security --user-data-dir=/Users/xxxx/Desktop/googlechrometmp http://localhost:8080/
```
 :::warning
 > Under construction
 :::
