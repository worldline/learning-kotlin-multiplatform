Which components can be shared across platforms in Kotlin Multiplatform projects?
UI logic
Business logic
Data models
Networking code
Utility functions


Name some popular libraries/frameworks compatible with Kotlin Multiplatform.
Ktor
kotlinx.serialization 
SQLDelight 
kotlinx.coroutines 


How does Kotlin Multiplatform handle platform-specific implementations?
Through expected and actual declarations
Expected declarations define an interface or contract
Actual declarations provide platform-specific implementations


What tools or IDE support is available for Kotlin Multiplatform development?
IntelliJ IDEA with Kotlin plugin
Android Studio
Visual Studio Code with Kotlin extension
jetbrain Fleet


What is the level of maturity or adoption of Kotlin Multiplatform in the development community?
Multiplatform is stable, ready for production
Multiplatform is not stable, not for production
Compose is not stable, not for production
Compose is stable, ready for production


1. **Which of the following best describes the primary advantage of using Ktor's HttpClient?**
   
   a) Synchronous processing of HTTP requests  
   b) Integration only with Android platforms  
   c) Asynchronous and non-blocking by default  <--
   d) Exclusive support for RESTful APIs


**How do you typically perform a GET request using Ktor's HttpClient?**

   a) `get()`  <--
   b) `sendRequest(HttpMethod.Get)`  
   c) `performGET()`  
   d) `executeRequest(Method.GET)`


 **What is the purpose of `MutableState` in Jetpack Compose?**

   a) To manage global application state  
   b) To retain state within a composable and trigger recomposition  
   c) To handle lifecycle events in composables  
   d) To store read-only state



 **Which function is used to create and manage mutable state in Jetpack Compose?**

   a) `stateOf()`  
   b) `mutableStateOf()`  <--
   c) `composeState()`  
   d) `createState()`



5. **What is  Kotlin Flows 
   a) Flows is a multithreading framework library for kotlin
   b) Flows are built on Kotlin coroutines, supporting sequential asynchronous processing  <--
   c) Flows are synchronous
   d) Flows are limited to Android development only


6. **Which operator is commonly used to transform data emitted by a Kotlin Flow?**

   a) `map()`  <--
   b) `switchMap()`  
   c) `flatMap()`  
   d) `transform()`


What role does `CoroutineScope` play in managing coroutines?**

   a) It determines the Thread used for asynchronous execusion thanks to Dispatcher <--
   c) It defines the lifecycle of the application  
   d) It specifies the UI thread for coroutine execution

