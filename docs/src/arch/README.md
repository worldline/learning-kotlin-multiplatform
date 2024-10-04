#  📚 Architecture  

Let's connect our Quiz app to internet. 

## Overview  

:::tip Architecture basics
**Everything You NEED to Know About MVVM Architecture Patterns**
<iframe width="560" height="315" src="https://www.youtube.com/embed/I5c7fBgvkNY" title="Everything You NEED to Know About Client Architecture Patterns" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
:::

### Data layer for KMP

Data layer in KMP is under building but largly inspired by [Android Architecture pattern](https://developer.android.com/topic/architecture/data-layer)

![data layer overview](../assets/images/data_layer.png)

Repository classes are responsible for the following tasks:
  * Exposing data to the rest of the app.
  * Centralizing changes to the data.
  * Resolving conflicts between multiple data sources.
  * Abstracting sources of data from the rest of the app.
  * Containing business logic.

### [Kotlin flow](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-flow/)

"A flow is an asynchronous data stream that sequentially emits values and completes normally or with an exception."

There are multiple types of flow, for the Hands-on Lab, we will focus on [`StateFlow`](https://kotlinlang.org/api/kotlinx.coroutines/kotlinx-coroutines-core/kotlinx.coroutines.flow/-state-flow/)

A state flow is a hot flow because its active instance exists independently of the presence of collectors (our composables that consume the data)

### [Coroutine](https://kotlinlang.org/docs/coroutines-basics.html#your-first-coroutine)

"A coroutine is an instance of suspendable computation. It is conceptually similar to a thread, in the sense that it takes a block of code to run that works concurrently with the rest of the code. However, a coroutine is not bound to any particular thread. It may suspend its execution in one thread and resume in another one."


##  🧪 DataSource and Repository

* Create a mock datasource, that generate a list of question
* Use it with a repository on your QuizScreen

 ### 🎯 Solutions

::: details MockDataSource.kt
``` kotlin 
package network

import network.data.Answer
import network.data.Question

class MockDataSource {

    suspend fun generateDummyQuestionsList():List<Question>{
        return generateQuestionsList()
    }
    fun generateQuestionsList():List<Question>{
        return listOf(
            Question(
                1,
                "Android is a great platform ?",
                1,
                listOf(
                    Answer( 1,"YES"),
                    Answer(2,"NO")
                )
            ),
            Question(
                1,
                "Android is a bad platform ?",
                2,
                listOf(
                    Answer( 1,"YES"),
                    Answer(2,"NO")
                )
            )
        )

    }

}
```
:::

::: details  QuizRepository.kt
``` kotlin
package network

class QuizRepository(sqlDriver: SqlDriver)  {

    private val mockDataSource = MockDataSource()
    private val coroutineScope = CoroutineScope(Dispatchers.Main)
    private var _questionState=  MutableStateFlow(listOf<Question>())
    var questionState = _questionState

    init {
        updateQuiz()
    }

    private fun updateQuiz(){
        coroutineScope.launch {
            _questionState.update {
                    mockDataSource.generateDummyQuestionsList()
            }
        }
    }
}
```
:::


##  🧪 ViewModel

**✅ If everything is fine, go to the next chapter →**


## 📖 Further reading




