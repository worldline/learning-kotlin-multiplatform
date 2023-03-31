# Connectivity

Let's connect our Quiz app to internet. 

## API used

On this codelab, we will request a simple plain text json file hosted on this repo that will simulate a REST API call.
The request & answers details are specified below :

**Request**
```bash
POST
content-type: text/plain  
url: https://github.com/worldline/learning-kotlin-multiplatform/raw/main/quiz.json
```

**Answer**

```bash
code:200
body: 
{
  "questions": [
    { 
    "id":1, 
    "label":"You can create an emulator to simulate the configuration of a particular type of Android device using a tool like", 
    "correct_answer_id":3, 
    "answers":[
      {"id":1, "label":"Theme Editor"},
      {"id":2, "label":"Android SDK Manager"},
      {"id":3, "label":"AVD Manager"},
      {"id":4, "label":"Virtual Editor"}
     ]
    },
    {
    "id":2, 
    "label":"What parameter specifies the Android API level that Gradle should use to compile your app?", 
    "correct_answer_id":2, 
    "answers":[
      {"id":1, "label":"minSdkVersion"},
      {"id":2, "label":"compileSdkVersion"},
      {"id":3, "label":"targetSdkVersion"},
      {"id":4, "label":"testSdkVersion"}
     ]
    },
  ]
}
```

## Ktor, a multiplatform HTTP client



## Ressources
- [Ktor client website](https://ktor.io/docs/getting-started-ktor-client.html)
- [Ktor multiplatform documentation](https://kotlinlang.org/docs/multiplatform-mobile-ktor-sqldelight.html)


