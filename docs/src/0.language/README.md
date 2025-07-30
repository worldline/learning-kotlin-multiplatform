# Language Kotlin



## Table of Contents

1. [Lesson 1: Kotlin Basics](#lesson-1-kotlin-basics)
2. [Lesson 2: Functions](#lesson-2-functions)
3. [Lesson 3: Classes and Objects](#lesson-3-classes-and-objects)
4. [Lesson 4: Concurrent Programming](#lesson-4-concurrent-programming)
5. [Lesson 5: Evolution of Kotlin](#lesson-5-evolution-of-kotlin)

---

## Lesson 1: Kotlin Basics

### Overview

In this lesson, you'll learn the fundamental concepts of Kotlin programming:

- **Get started**: Setting up IntelliJ IDEA and creating your first project
- **Operators**: Mathematical, comparison, and assignment operators
- **Data types**: Integer types, floating-point numbers, and strings
- **Variables**: Mutable and immutable variables with type inference
- **Conditionals**: Control flow with if/else, when statements, and loops
- **Lists and arrays**: Working with collections
- **Null safety**: Kotlin's approach to preventing null pointer exceptions

### Getting Started

#### Your First Kotlin Program

::: kotlin-playground Hello World

@file main.kt

```kotlin
fun main() {
    println("Hello, world!")
}
```
:::

#### Passing Arguments to main()

::: kotlin-playground Arguments Example

@file main.kt

```kotlin
fun main(args: Array<String>) {
    val name = args.getOrNull(0)?.takeIf { it.isNotBlank() } ?: "Kotlin"
    println("Hello, $name!")
}
```
:::

### Operators

#### Mathematical Operators

::: kotlin-playground Math Operators

@file main.kt

```kotlin
fun main() {
    // Math operators with integers
    println("1 + 1 = ${1 + 1}")
    println("53 - 3 = ${53 - 3}")
    println("50 / 10 = ${50 / 10}")
    println("9 % 3 = ${9 % 3}")
    
    // Math operators with doubles
    println("1.0 / 2.0 = ${1.0 / 2.0}")
    println("2.0 * 3.5 = ${2.0 * 3.5}")
}
```
:::

#### Numeric Operator Methods

::: kotlin-playground Operator Methods

@file main.kt

```kotlin
fun main() {
    // Kotlin lets you call methods on numbers
    println("2.times(3) = ${2.times(3)}")
    println("3.5.plus(4) = ${3.5.plus(4)}")
    println("2.4.div(2) = ${2.4.div(2)}")
}
```
:::


### Data Types

#### Working with Different Types

::: kotlin-playground Data Types

@file main.kt

```kotlin
fun main() {
    // Integer types
    val byteValue: Byte = 127
    val shortValue: Short = 32767
    val intValue: Int = 2147483647
    val longValue: Long = 9223372036854775807L
    
    // Floating-point types
    val floatValue: Float = 3.14f
    val doubleValue: Double = 3.141592653589793
    
    // Other types
    val charValue: Char = 'K'
    val booleanValue: Boolean = true
    
    println("Byte: $byteValue")
    println("Short: $shortValue")
    println("Int: $intValue")
    println("Long: $longValue")
    println("Float: $floatValue")
    println("Double: $doubleValue")
    println("Char: $charValue")
    println("Boolean: $booleanValue")
}
```
:::

#### Type Casting

::: kotlin-playground Type Casting

@file main.kt

```kotlin
fun main() {
    val i: Int = 6
    println("Int to Byte: ${i.toByte()}")
    println("Int to Float: ${i.toFloat()}")
    println("Int to Double: ${i.toDouble()}")
    
    // Using underscores for long numbers
    val oneMillion = 1_000_000
    val hexBytes = 0xFF_EC_DE_5E
    println("One million: $oneMillion")
    println("Hex bytes: $hexBytes")
}
```
:::

### Strings

#### String Basics and Templates

::: kotlin-playground Strings

@file main.kt

```kotlin
fun main() {
    // Basic strings
    val s1 = "Hello world!"
    val s2 = "Hello world!\n"
    
    // Multi-line strings with triple quotes
    val text = """
        This is a
        multi-line
        string
    """.trimIndent()
    
    // String concatenation
    val numberOfDogs = 3
    val numberOfCats = 2
    val message = "I have $numberOfDogs dogs" + " and $numberOfCats cats"
    
    // String templates
    val i = 10
    val s = "abc"
    val length = "$s.length is ${s.length}"
    
    // Expression in templates
    val numberOfShirts = 10
    val numberOfPants = 5
    val total = "I have ${numberOfShirts + numberOfPants} items of clothing"
    
    println(s1)
    println(text)
    println(message)
    println("i = $i")
    println(length)
    println(total)
}
```
:::

### Variables

#### Mutable and Immutable Variables

::: kotlin-playground Variables

@file main.kt

```kotlin
fun main() {
    // Immutable variable (val)
    val name = "Jennifer"
    println("Name: $name")
    
    // Mutable variable (var)
    var score = 10
    println("Initial score: $score")
    score = 20
    println("Updated score: $score")
    
    // Explicit type declaration
    var width: Int = 12
    var length: Double = 2.5
    println("Width: $width, Length: $length")
    
    // Type inference
    val inferredInt = 42        // Int
    val inferredDouble = 3.14   // Double
    val inferredString = "Hello" // String
    
    println("Inferred types:")
    println("$inferredInt is ${inferredInt::class.simpleName}")
    println("$inferredDouble is ${inferredDouble::class.simpleName}")
    println("$inferredString is ${inferredString::class.simpleName}")
}
```
:::

### Conditionals

#### If/Else Statements

::: kotlin-playground If-Else

@file main.kt

```kotlin
fun main() {
    val numberOfCups = 30
    val numberOfPlates = 50
    
    if (numberOfCups > numberOfPlates) {
        println("Too many cups!")
    } else {
        println("Not enough cups!")
    }
    
    // Multiple conditions
    val guests = 30
    if (guests == 0) {
        println("No guests")
    } else if (guests < 20) {
        println("Small group of people")
    } else {
        println("Large group of people!")
    }
    
    // If as expression
    val temperature = 20
    val isHot = if (temperature > 40) true else false
    println("Is it hot? $isHot")
}
```
:::

#### Ranges and When Statements

::: kotlin-playground Ranges and When

@file main.kt

```kotlin
fun main() {
    // Ranges
    val numberOfStudents = 50
    if (numberOfStudents in 1..100) {
        println("Valid number of students: $numberOfStudents")
    }
    
    // When statement
    val results = 45
    when (results) {
        0 -> println("No results")
        in 1..39 -> println("Got results!")
        else -> println("That's a lot of results!")
    }
    
    // When as expression
    val grade = when (results) {
        in 90..100 -> "A"
        in 80..89 -> "B"
        in 70..79 -> "C"
        in 60..69 -> "D"
        else -> "F"
    }
    println("Grade: $grade")
}
```
:::

#### Loops

::: kotlin-playground Loops

@file main.kt

```kotlin
fun main() {
    // For loop with array
    val pets = arrayOf("dog", "cat", "canary")
    print("Pets: ")
    for (element in pets) {
        print("$element ")
    }
    println()
    
    // For loop with index
    println("Pets with index:")
    for ((index, element) in pets.withIndex()) {
        println("Item at $index is $element")
    }
    
    // Range loops
    print("Numbers 1-5: ")
    for (i in 1..5) print(i)
    println()
    
    print("Countdown: ")
    for (i in 5 downTo 1) print(i)
    println()
    
    print("Even numbers: ")
    for (i in 2..10 step 2) print(i)
    println()
    
    // While loop
    var bicycles = 0
    while (bicycles < 3) {
        bicycles++
        println("Bicycle $bicycles added")
    }
    
    // Repeat loop
    print("Repeat: ")
    repeat(3) {
        print("Hello! ")
    }
    println()
}
```
:::

### Lists and Arrays

#### Working with Lists

::: kotlin-playground Lists

@file main.kt

```kotlin
fun main() {
    // Immutable list
    val instruments = listOf("trumpet", "piano", "violin")
    println("Instruments: $instruments")
    
    // Mutable list
    val myList = mutableListOf("trumpet", "piano", "violin")
    myList.remove("violin")
    myList.add("drums")
    println("Modified list: $myList")
    
    // List operations
    val books = listOf("nature", "biology", "birds")
    val booksStartingWithB = books.filter { it[0] == 'b' }
    println("Books starting with 'b': $booksStartingWithB")
}
```
:::

#### Working with Arrays

::: kotlin-playground Arrays

@file main.kt

```kotlin
fun main() {
    // Array of strings
    val pets = arrayOf("dog", "cat", "canary")
    println("Pets: ${pets.contentToString()}")
    
    // Mixed type array
    val mix = arrayOf("hats", 2)
    println("Mixed array: ${mix.contentToString()}")
    
    // Typed arrays
    val numbers = intArrayOf(1, 2, 3)
    println("Numbers: ${numbers.contentToString()}")
    
    // Combining arrays
    val numbers2 = intArrayOf(4, 5, 6)
    val combined = numbers + numbers2
    println("Combined: ${combined.contentToString()}")
}
```
:::

### Null Safety

#### Null Safety Features

::: kotlin-playground Null Safety

@file main.kt

```kotlin
fun main() {
    // Variables cannot be null by default
    var numberOfBooks: Int? = null
    println("Books: $numberOfBooks")
    
    // Safe call operator
    numberOfBooks = 6
    numberOfBooks = numberOfBooks?.dec()
    println("After decrement: $numberOfBooks")
    
    // Elvis operator
    numberOfBooks = null
    val finalCount = numberOfBooks?.dec() ?: 0
    println("Final count: $finalCount")
    
    // Safe call with string
    val name: String? = "Kotlin"
    println("Name length: ${name?.length}")
    
    val nullName: String? = null
    println("Null name length: ${nullName?.length}")
    
    // Not-null assertion (use carefully!)
    val definitelyNotNull: String? = "Hello"
    val length = definitelyNotNull!!.length
    println("Definite length: $length")
}
```
:::

### Error Handling with Result<T>

Managing errors in Kotlin can be done using the `Result<T>` class, which allows you to handle success and failure cases without throwing exceptions.

::: kotlin-playground Result<T> 

@file main.kt

```kotlin
fun divide(a: Int, b: Int): Result<Double> {
    return if (b == 0) {
        Result.failure(Exception("Division par zéro"))
    } else {
        Result.success(a.toDouble() / b)
    }
}

fun main() {
    val result = divide(10, 2)
    
    result.fold(
        onSuccess = { value -> println("✅ Résultat: $value") },
        onFailure = { error -> println("❌ Erreur: ${error.message}") }
    )
    
    // Avec erreur
    divide(10, 0).fold(
        onSuccess = { value -> println("✅ Résultat: $value") },
        onFailure = { error -> println("❌ Erreur: ${error.message}") }
    )
}
```
:::

---

## Lesson 2: Functions

### Overview

In this lesson, you'll learn about:

- **Programs in Kotlin**: Creating main functions and running programs
- **Expressions**: Everything has a value in Kotlin
- **Functions**: Creating and using functions with parameters
- **Compact functions**: Single-expression functions
- **Lambdas and higher-order functions**: Functional programming concepts
- **List filters**: Working with collections functionally

### Programs in Kotlin

#### Creating a Main Function

::: kotlin-playground Main Function

@file main.kt

```kotlin
fun main(args: Array<String>) {
    println("Hello, world!")
    
    // Using arguments if provided
    if (args.isNotEmpty()) {
        println("Hello, ${args[0]}!")
    }
}
```
:::

### Everything Has a Value

#### Expressions vs Statements

::: kotlin-playground Expressions

@file main.kt

```kotlin
fun main() {
    // If as expression
    val temperature = 20
    val isHot = if (temperature > 40) true else false
    println("Is hot: $isHot")
    
    // Even println returns a value (Unit)
    val isUnit = println("This is an expression")
    println("println returns: $isUnit")
    
    // When as expression
    val number = 42
    val description = when {
        number < 0 -> "negative"
        number == 0 -> "zero"
        number > 0 -> "positive"
        else -> "unknown"
    }
    println("$number is $description")
}
```
:::

### Functions in Kotlin

#### Basic Functions

::: kotlin-playground Basic Functions

@file main.kt

```kotlin
// Simple function
fun printHello() {
    println("Hello World")
}

// Function with parameters
fun greet(name: String) {
    println("Hello, $name!")
}

// Function with return value
fun add(a: Int, b: Int): Int {
    return a + b
}

// Unit returning function (explicit)
fun printMessage(message: String): Unit {
    println(message)
}

// Unit returning function (implicit)
fun printAnotherMessage(message: String) {
    println(message)
}

fun main() {
    printHello()
    greet("Kotlin")
    val sum = add(5, 3)
    println("Sum: $sum")
    printMessage("Explicit Unit")
    printAnotherMessage("Implicit Unit")
}
```
:::

#### Function Parameters

::: kotlin-playground Function Parameters

@file main.kt

```kotlin
// Default parameters
fun drive(speed: String = "fast") {
    println("driving $speed")
}

// Required parameters
fun tempToday(day: String, temp: Int) {
    println("Today is $day and it's $temp degrees.")
}

// Mix of default and required parameters
fun reformat(
    str: String,
    divideByCamelHumps: Boolean,
    wordSeparator: Char,
    normalizeCase: Boolean = true
) {
    println("Reformatting: $str with separator '$wordSeparator'")
}

fun main() {
    // Using default parameter
    drive()
    drive("slow")
    drive(speed = "turtle-like")
    
    // Required parameters
    tempToday("Monday", 25)
    
    // Named arguments
    reformat("TodayIsADayLikeNoOther", false, '_')
    reformat("TodayIsADayLikeNoOther", divideByCamelHumps = false, wordSeparator = '_')
}
```
:::

### Compact Functions

#### Single-Expression Functions

::: kotlin-playground Compact Functions

@file main.kt

```kotlin
// Regular function
fun doubleRegular(x: Int): Int {
    return x * 2
}

// Compact function
fun double(x: Int): Int = x * 2

// Compact function with type inference
fun triple(x: Int) = x * 3

// More examples
fun square(x: Int) = x * x
fun isEven(x: Int) = x % 2 == 0
fun max(a: Int, b: Int) = if (a > b) a else b

fun main() {
    println("Double 5: ${double(5)}")
    println("Triple 4: ${triple(4)}")
    println("Square 6: ${square(6)}")
    println("Is 8 even? ${isEven(8)}")
    println("Max of 10 and 15: ${max(10, 15)}")
}
```
:::

### Lambdas and Higher-Order Functions

#### Lambda Functions

::: kotlin-playground Lambdas

@file main.kt

```kotlin
fun main() {
    // Basic lambda
    val waterFilter = { level: Int -> level / 2 }
    var dirtLevel = 20
    println("Filtered water: ${waterFilter(dirtLevel)}")
    
    // Lambda with explicit type
    val waterFilter2: (Int) -> Int = { level -> level / 2 }
    println("Filtered water 2: ${waterFilter2(dirtLevel)}")
    
    // Lambda with multiple parameters
    val multiply: (Int, Int) -> Int = { a, b -> a * b }
    println("Multiply 4 and 5: ${multiply(4, 5)}")
    
    // Lambda with no parameters
    val greeting: () -> String = { "Hello from lambda!" }
    println(greeting())

    // Lambda with multiple statements
    val multiStatement = { x: Int, y: Int ->
      println("Calculating sum of $x and $y")
      val result = x + y
      println("Result: $result")
      result // Last expression is the return value
      }
      println(multiStatement(3, 4))
   }
```
:::

#### Higher-Order Functions

::: kotlin-playground Higher-Order Functions

@file main.kt

```kotlin
// Higher-order function that takes a function as parameter
fun encodeMsg(msg: String, encode: (String) -> String): String {
    return encode(msg)
}

// Named function to pass as argument
fun reverseString(input: String): String = input.reversed()

fun main() {
    // Using lambda
    val enc1: (String) -> String = { input -> input.uppercase() }
    println("Encoded with lambda: ${encodeMsg("hello", enc1)}")
    
    // Using function reference
    println("Encoded with function reference: ${encodeMsg("hello", ::reverseString)}")
    
    // Inline lambda
    println("Encoded inline: ${encodeMsg("hello") { it.lowercase() }}")
    
    // Using built-in higher-order function
    repeat(3) {
        println("Repeated message $it")
    }
}
```
:::

### List Filters

#### Basic Filtering

::: kotlin-playground List Filters

@file main.kt

```kotlin
fun main() {
    // Basic filter
    val numbers = listOf(1, 2, 3, 4, 5, 6)
    val evenNumbers = numbers.filter { it % 2 == 0 }
    println("Even numbers: $evenNumbers")
    
    // Filter with explicit parameter
    val positiveNumbers = numbers.filter { n: Int -> n > 0 }
    println("Positive numbers: $positiveNumbers")
    
    // Filter strings
    val books = listOf("nature", "biology", "birds")
    val booksStartingWithB = books.filter { it[0] == 'b' }
    println("Books starting with 'b': $booksStartingWithB")
    
    // Using 'it' implicitly
    val colors = listOf("red", "red-orange", "dark red", "orange", "bright orange")
    val redColors = colors.filter { it.contains("red") }
    println("Colors containing 'red': $redColors")
}
```
:::

#### Eager vs Lazy Filters

::: kotlin-playground Eager vs Lazy

@file main.kt

```kotlin
fun main() {
    val instruments = listOf("viola", "cello", "violin", "guitar", "piano")
    
    // Eager filter (creates new list immediately)
    val eager = instruments.filter { it[0] == 'v' }
    println("Eager filter: $eager")
    
    // Lazy filter using sequence
    val lazy = instruments.asSequence().filter { it[0] == 'v' }
    println("Lazy filter sequence: $lazy")
    
    // Convert sequence back to list
    val lazyToList = lazy.toList()
    println("Lazy to list: $lazyToList")
    
    // Chaining operations with sequences
    val result = instruments.asSequence()
        .filter { it.length > 5 }
        .map { it.uppercase() }
        .toList()
    println("Chained operations: $result")
}
```
:::

#### Other List Transformations

::: kotlin-playground List Transformations

@file main.kt

```kotlin
fun main() {
    // Map transformation
    val numbers = listOf(1, 2, 3, 4, 5)
    val doubled = numbers.map { it * 2 }
    println("Doubled: $doubled")
    
    val names = listOf("alice", "bob", "charlie")
    val uppercased = names.map { it.uppercase() }
    println("Uppercased: $uppercased")
    
    // Flatten nested collections
    val numberSets = listOf(setOf(1, 2, 3), setOf(4, 5), setOf(1, 2))
    val flattened = numberSets.flatten()
    println("Flattened: $flattened")
    
    // Combining operations
    val words = listOf("hello", "world", "kotlin", "programming")
    val result = words
        .filter { it.length > 5 }
        .map { it.uppercase() }
        .sorted()
    println("Combined operations: $result")
}
```
:::

---

## Lesson 3: Classes and Objects

### Overview

In this lesson, you'll learn about:

- **Classes**: Blueprints for objects with properties and methods
- **Constructors**: Creating and initializing objects
- **Inheritance**: Extending classes and implementing interfaces
- **Extension functions**: Adding functionality to existing classes
- **Special classes**: Data classes, enums, objects, and companion objects
- **Code organization**: Packages and visibility modifiers

### Classes

#### Basic Class Definition

::: kotlin-playground Basic Classes

@file main.kt

```kotlin
// Simple class
class House {
    val color: String = "white"
    val numberOfWindows: Int = 2
    val isForSale: Boolean = false
    
    fun updateColor(newColor: String) {
        println("Updating color to $newColor")
    }
}

// Class with constructor parameters
class Person(val name: String, var age: Int)

// Class with behavior
class Circle(val radius: Double) {
    fun area(): Double {
        return Math.PI * radius * radius
    }
    
    fun circumference(): Double {
        return 2 * Math.PI * radius
    }
}

fun main() {
    val myHouse = House()
    println("House color: ${myHouse.color}")
    myHouse.updateColor("blue")
    
    val person = Person("Alice", 30)
    println("Person: ${person.name}, age ${person.age}")
    person.age = 31
    println("Updated age: ${person.age}")
    
    val circle = Circle(5.0)
    println("Circle area: ${circle.area()}")
    println("Circle circumference: ${circle.circumference()}")
}
```
:::

#### Constructors and Initialization

::: kotlin-playground Constructors

@file main.kt

```kotlin
// Class with default parameters
class Box(val length: Int, val width: Int = 20, val height: Int = 40) {
    init {
        println("Creating box: ${length}x${width}x${height}")
    }
    
    fun volume() = length * width * height
}

// Class with multiple constructors
class Rectangle(val width: Double, val height: Double) {
    constructor(side: Double) : this(side, side) {
        println("Creating square with side $side")
    }
    
    constructor(width: Int, height: Int) : this(width.toDouble(), height.toDouble()) {
        println("Creating rectangle from integers")
    }
    
    fun area() = width * height
    fun perimeter() = 2 * (width + height)
}

fun main() {
    val box1 = Box(100, 20, 40)
    val box2 = Box(length = 100)
    println("Box1 volume: ${box1.volume()}")
    println("Box2 volume: ${box2.volume()}")
    
    val rectangle1 = Rectangle(10.0, 5.0)
    val square = Rectangle(8.0)
    val rectangle2 = Rectangle(12, 6)
    
    println("Rectangle area: ${rectangle1.area()}")
    println("Square area: ${square.area()}")
    println("Rectangle2 perimeter: ${rectangle2.perimeter()}")
}
```
:::

#### Properties with Custom Getters and Setters

::: kotlin-playground Custom Properties

@file main.kt

```kotlin
class Person(var firstName: String, var lastName: String) {
    // Custom getter
    val fullName: String
        get() = "$firstName $lastName"
    
    // Property with custom getter and setter
    var displayName: String = ""
        get() = if (field.isEmpty()) fullName else field
        set(value) {
            field = value.trim()
        }
    
    // Computed property
    val initials: String
        get() = "${firstName.first()}${lastName.first()}"
}

class Temperature {
    var celsius: Double = 0.0
        set(value) {
            field = value
            println("Temperature set to $value°C")
        }
    
    val fahrenheit: Double
        get() = celsius * 9/5 + 32
    
    val kelvin: Double
        get() = celsius + 273.15
}

fun main() {
    val person = Person("John", "Doe")
    println("Full name: ${person.fullName}")
    println("Display name: ${person.displayName}")
    println("Initials: ${person.initials}")
    
    person.displayName = "Johnny"
    println("Custom display name: ${person.displayName}")
    
    val temp = Temperature()
    temp.celsius = 25.0
    println("${temp.celsius}°C = ${temp.fahrenheit}°F = ${temp.kelvin}K")
}
```
:::

### Inheritance

#### Interfaces

::: kotlin-playground Interfaces

@file main.kt

```kotlin
interface Shape {
    fun computeArea(): Double
    fun computePerimeter(): Double
    
    // Interface can have default implementation
    fun describe(): String = "This is a shape with area ${computeArea()}"
}

interface Drawable {
    fun draw(): String
}

class Circle(val radius: Double) : Shape, Drawable {
    override fun computeArea() = Math.PI * radius * radius
    override fun computePerimeter() = 2 * Math.PI * radius
    override fun draw() = "Drawing a circle with radius $radius"
}

class Rectangle(val width: Double, val height: Double) : Shape, Drawable {
    override fun computeArea() = width * height
    override fun computePerimeter() = 2 * (width + height)
    override fun draw() = "Drawing a rectangle ${width}x${height}"
}

fun main() {
    val circle = Circle(3.0)
    val rectangle = Rectangle(4.0, 5.0)
    
    println("Circle: ${circle.describe()}")
    println("Rectangle: ${rectangle.describe()}")
    println(circle.draw())
    println(rectangle.draw())
    
    val shapes: List<Shape> = listOf(circle, rectangle)
    shapes.forEach { shape ->
        println("Area: ${shape.computeArea()}, Perimeter: ${shape.computePerimeter()}")
    }
}
```
:::

#### Class Inheritance

::: kotlin-playground Class Inheritance

@file main.kt

```kotlin
// Base class must be marked as 'open'
open class Vehicle(val brand: String, val model: String) {
    open fun start() {
        println("$brand $model is starting...")
    }
    
    open fun stop() {
        println("$brand $model is stopping...")
    }
    
    fun info() = "$brand $model"
}

class Car(brand: String, model: String, val doors: Int) : Vehicle(brand, model) {
    override fun start() {
        println("Car $brand $model with $doors doors is starting with ignition...")
    }
}

class Motorcycle(brand: String, model: String, val engineSize: Int) : Vehicle(brand, model) {
    override fun start() {
        println("Motorcycle $brand $model with ${engineSize}cc engine is starting...")
    }
    
    fun wheelie() {
        println("$brand $model is doing a wheelie!")
    }
}

fun main() {
    val car = Car("Toyota", "Camry", 4)
    val motorcycle = Motorcycle("Honda", "CBR", 600)
    
    car.start()
    car.stop()
    println("Car info: ${car.info()}")
    
    motorcycle.start()
    motorcycle.wheelie()
    motorcycle.stop()
    
    // Polymorphism
    val vehicles: List<Vehicle> = listOf(car, motorcycle)
    vehicles.forEach { it.start() }
}
```
:::

#### Abstract Classes

::: kotlin-playground Abstract Classes

@file main.kt

```kotlin
abstract class Animal(val name: String) {
    abstract val species: String
    abstract fun makeSound(): String
    
    // Concrete method
    fun introduce() {
        println("Hi, I'm $name, a $species")
        println("I say: ${makeSound()}")
    }
    
    open fun sleep() {
        println("$name is sleeping...")
    }
}

class Dog(name: String) : Animal(name) {
    override val species = "Canis lupus"
    override fun makeSound() = "Woof!"
    
    fun fetch() {
        println("$name is fetching the ball!")
    }
}

class Cat(name: String) : Animal(name) {
    override val species = "Felis catus"
    override fun makeSound() = "Meow!"
    
    override fun sleep() {
        println("$name is sleeping for 16 hours...")
    }
}

fun main() {
    val dog = Dog("Buddy")
    val cat = Cat("Whiskers")
    
    dog.introduce()
    dog.fetch()
    dog.sleep()
    
    println()
    
    cat.introduce()
    cat.sleep()
    
    // Using as Animal type
    val animals: List<Animal> = listOf(dog, cat)
    animals.forEach { animal ->
        println("${animal.name} says ${animal.makeSound()}")
    }
}
```
:::

### Extension Functions

#### Adding Functions to Existing Classes

::: kotlin-playground Extension Functions

@file main.kt

```kotlin
// Extension function for Int
fun Int.isOdd(): Boolean = this % 2 == 1
fun Int.isEven(): Boolean = this % 2 == 0

// Extension function for String
fun String.removeWhitespace(): String = this.replace("\\s".toRegex(), "")
fun String.wordCount(): Int = this.trim().split("\\s+".toRegex()).size

// Extension function for List
fun <T> List<T>.secondOrNull(): T? = if (this.size >= 2) this[1] else null

// Extension property
val String.lastChar: Char?
    get() = if (isEmpty()) null else this[length - 1]

fun main() {
    // Using extension functions on Int
    println("Is 5 odd? ${5.isOdd()}")
    println("Is 4 even? ${4.isEven()}")
    
    // Using extension functions on String
    val text = "Hello World Kotlin"
    println("Original: '$text'")
    println("No whitespace: '${text.removeWhitespace()}'")
    println("Word count: ${text.wordCount()}")
    println("Last character: ${text.lastChar}")
    
    // Using extension function on List
    val numbers = listOf(1, 2, 3, 4, 5)
    val emptyList = emptyList<Int>()
    
    println("Second element: ${numbers.secondOrNull()}")
    println("Second element in empty list: ${emptyList.secondOrNull()}")
}
```
:::

### Special Classes

#### Data Classes

::: kotlin-playground Data Classes

@file main.kt

```kotlin
// Data class automatically generates toString, equals, hashCode, copy
data class Player(val name: String, val score: Int, val level: Int = 1)

data class Point(val x: Int, val y: Int)

fun main() {
    val player1 = Player("Alice", 1000, 5)
    val player2 = Player("Bob", 850)
    val player3 = player1.copy(score = 1200)
    
    println("Player 1: $player1")
    println("Player 2: $player2")
    println("Player 3: $player3")
    
    // Destructuring
    val (name, score, level) = player1
    println("Destructured: $name has $score points at level $level")
    
    // Using Pair and Triple
    val bookAuthor = Pair("1984", "George Orwell")
    val bookInfo = Triple("1984", "George Orwell", 1949)
    
    println("Book: $bookAuthor")
    println("Book with year: $bookInfo")
    
    // Using 'to' infix function
    val bookAuthor2 = "Animal Farm" to "George Orwell"
    println("Book 2: $bookAuthor2")
    
    // Working with maps
    val authors = mapOf(
        "1984" to "George Orwell",
        "Brave New World" to "Aldous Huxley",
        "Fahrenheit 451" to "Ray Bradbury"
    )
    println("Authors: $authors")
}
```
:::

#### Enum Classes

::: kotlin-playground Enum Classes

@file main.kt

```kotlin
enum class Color(val r: Int, val g: Int, val b: Int) {
    RED(255, 0, 0),
    GREEN(0, 255, 0),
    BLUE(0, 0, 255),
    WHITE(255, 255, 255),
    BLACK(0, 0, 0);
    
    fun toHex(): String = "#%02X%02X%02X".format(r, g, b)
}

enum class Direction {
    NORTH, SOUTH, EAST, WEST;
    
    fun opposite(): Direction = when (this) {
        NORTH -> SOUTH
        SOUTH -> NORTH
        EAST -> WEST
        WEST -> EAST
    }
}

enum class Planet(val mass: Double, val radius: Double) {
    MERCURY(3.303e+23, 2.4397e6),
    VENUS(4.869e+24, 6.0518e6),
    EARTH(5.976e+24, 6.37814e6),
    MARS(6.421e+23, 3.3972e6);
    
    fun surfaceGravity(): Double = 6.67300E-11 * mass / (radius * radius)
}

fun main() {
    // Using Color enum
    println("Red RGB: ${Color.RED.r}, ${Color.RED.g}, ${Color.RED.b}")
    println("Blue hex: ${Color.BLUE.toHex()}")
    
    // Using Direction enum
    println("North opposite: ${Direction.NORTH.opposite()}")
    
    // Using Planet enum
    println("Earth surface gravity: ${Planet.EARTH.surfaceGravity()}")
    
    // Iterating over enum values
    println("All colors:")
    Color.values().forEach { color ->
        println("${color.name}: ${color.toHex()}")
    }
    
    // Using enum in when expression
    val direction = Direction.NORTH
    val movement = when (direction) {
        Direction.NORTH -> "Moving up"
        Direction.SOUTH -> "Moving down"
        Direction.EAST -> "Moving right"
        Direction.WEST -> "Moving left"
    }
    println("Direction: $movement")
}
```
:::

#### Object and Companion Object

::: kotlin-playground Objects and Companions

@file main.kt

```kotlin
// Singleton object
object Calculator {
    fun add(a: Int, b: Int): Int = a + b
    fun subtract(a: Int, b: Int): Int = a - b
    fun multiply(a: Int, b: Int): Int = a * b
    fun divide(a: Int, b: Int): Double = a.toDouble() / b
}

// Object expression (anonymous object)
object DatabaseConfig {
    const val URL = "jdbc:mysql://localhost:3306/mydb"
    const val USERNAME = "admin"
    const val PASSWORD = "secret"
    
    fun getConnectionString(): String = "$URL?user=$USERNAME"
}

// Class with companion object
class MathUtils {
    companion object {
        const val PI = 3.14159
        const val E = 2.71828
        
        fun circleArea(radius: Double): Double = PI * radius * radius
        fun factorial(n: Int): Long = if (n <= 1) 1 else n * factorial(n - 1)
    }
    
    fun instanceMethod() {
        println("This is an instance method")
    }
}

// Named companion object
class PhysicsSystem {
    companion object WorldConstants {
        const val GRAVITY = 9.8
        const val UNIT = "metric"
        
        fun computeForce(mass: Double, acceleration: Double): Double {
            return mass * acceleration
        }
    }
}

fun main() {
    // Using singleton object
    println("Calculator: 5 + 3 = ${Calculator.add(5, 3)}")
    println("Calculator: 10 / 3 = ${Calculator.divide(10, 3)}")
    
    // Using object configuration
    println("Database URL: ${DatabaseConfig.URL}")
    println("Connection string: ${DatabaseConfig.getConnectionString()}")
    
    // Using companion object
    println("PI: ${MathUtils.PI}")
    println("Circle area (r=5): ${MathUtils.circleArea(5.0)}")
    println("5! = ${MathUtils.factorial(5)}")
    
    // Still can create instances
    val mathUtils = MathUtils()
    mathUtils.instanceMethod()
    
    // Using named companion object
    println("Gravity: ${PhysicsSystem.WorldConstants.GRAVITY}")
    println("Force: ${PhysicsSystem.WorldConstants.computeForce(10.0, 9.8)}")
}
```
:::

### Code Organization

#### Packages and Visibility

::: kotlin-playground Visibility Modifiers

@file main.kt

```kotlin
// Public by default
class PublicClass {
    val publicProperty = "I'm public"
    
    private val privateProperty = "I'm private"
    
    protected val protectedProperty = "I'm protected"
    
    internal val internalProperty = "I'm internal"
    
    fun publicFunction() = "Public function"
    
    private fun privateFunction() = "Private function"
    
    protected fun protectedFunction() = "Protected function"
    
    internal fun internalFunction() = "Internal function"
}

open class BaseClass {
    protected val protectedValue = "Accessible to subclasses"
    private val privateValue = "Not accessible to subclasses"
    
    protected fun protectedMethod() {
        println("Protected method called")
    }
}

class DerivedClass : BaseClass() {
    fun accessProtected() {
        println(protectedValue) // OK
        protectedMethod() // OK
        // println(privateValue) // Compilation error
    }
}

// Top-level private function
private fun topLevelPrivate() = "Top level private"

// Top-level internal function
internal fun topLevelInternal() = "Top level internal"

fun main() {
    val obj = PublicClass()
    println(obj.publicProperty)
    // println(obj.privateProperty) // Compilation error
    println(obj.internalProperty) // OK in same module
    
    val derived = DerivedClass()
    derived.accessProtected()
    
    println(topLevelInternal())
    println(topLevelPrivate())
}
```
:::

## Lesson 4: Concurrent Programming

**Kotlin coroutines are a powerful tool for managing background tasks, making asynchronous programming easier and more efficient**. This comprehensive guide covers all aspects of concurrent programming in Kotlin.

### Introduction to Coroutines

#### What are Coroutines?

**Coroutines in Kotlin are a powerful tool for handling asynchronous programming, enabling developers to write efficient, non-blocking code**. They are lightweight threads that can be suspended and resumed at specific points, making your code more readable and maintainable.

#### Key Benefits

- **Lightweight**: Much lighter than threads in terms of memory overhead
- **Non-blocking**: Don't block the calling thread
- **Sequential Code**: Write asynchronous code that looks synchronous
- **Built-in cancellation support**: **Cancellation is propagated automatically through the running coroutine hierarchy** 
- **Fewer memory leaks**: **Use structured concurrency to run operations within a scope** 

### Coroutine Builders

#### Launch - Fire and Forget

::: kotlin-playground Launch Example

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    // Start a coroutine with launch
    launch {
        delay(1000)
        println("Coroutine says: Hello, World!")
    }
    println("Main function continues...")
}
```
:::

**Characteristics:**
- Returns a `Job` object
- Used for tasks that don't return a result
- Fire-and-forget operations

#### Async - Result-Oriented

**Launches a coroutine that returns a result asynchronously. Returns a `Deferred<T>`, which is like a Future in Java** :

::: kotlin-playground Async Example

@file main.kt

```kotlin
import kotlinx.coroutines.*

suspend fun performTask(task: String): String {
    delay(1000)
    return "Task $task completed"
}

fun main() = runBlocking {
    val task1 = async { performTask("A") }
    val task2 = async { performTask("B") }
    
    println(task1.await())
    println(task2.await())
}
```
:::

#### RunBlocking - Bridging Blocking and Non-blocking

::: kotlin-playground RunBlocking Example

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    launch {
        delay(500)
        println("Task 1 completed")
    }
    launch {
        delay(500)
        println("Task 2 completed")
    }
    println("Waiting for tasks to complete...")
}
```
:::

### Dispatchers - Thread Management

**Dispatchers control where and how your coroutines run, like assigning them to specific threads or pools** .

#### Types of Dispatchers

::: kotlin-playground Dispatchers Example

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    // Default dispatcher - CPU-intensive work
    launch(Dispatchers.Default) {
        // Heavy computation
        println("CPU work on ${Thread.currentThread().name}")
    }
    
    // IO dispatcher - Network/File operations
    launch(Dispatchers.IO) {
        // Network request or file operation
        println("IO work on ${Thread.currentThread().name}")
    }
    
    // Unconfined dispatcher - Not recommended for general use
    launch(Dispatchers.Unconfined) {
        println("Unconfined work")
    }
    
    delay(100) // Wait for all tasks to complete
}
```
:::

#### WithContext - Switching Context

**withContext() calls the given code with the specified coroutine context, is suspended until it completes, and returns the result** :

::: kotlin-playground WithContext Example

@file main.kt

```kotlin
import kotlinx.coroutines.*

suspend fun fetchFromNetwork(): String {
    delay(1000) // Simulate network delay
    return "Data from network"
}

suspend fun updateUI(data: String) {
    println("UI updated with: $data")
}

suspend fun fetchDataAndSave() {
    val data = withContext(Dispatchers.IO) {
        // Network call
        fetchFromNetwork()
    }
    
    withContext(Dispatchers.Default) {
        // Update UI (using Default instead of Main for playground)
        updateUI(data)
    }
}

fun main() = runBlocking {
    fetchDataAndSave()
}
```
:::

### Structured Concurrency

**The CoroutineScope is the foundation of structured concurrency. It serves as a container for coroutines, defining the scope within which coroutines are launched** .

#### CoroutineScope
::: kotlin-playground CoroutineScope Example

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    // Creating a CoroutineScope
    val mainScope = CoroutineScope(Dispatchers.Default)
    
    // Launching a coroutine within the scope
    mainScope.launch {
        delay(1000)
        println("Coroutine executed on the Default thread")
    }
    
    // Wait for coroutine to complete
    delay(1500)
    
    // Cancelling the entire scope cancels all launched coroutines
    mainScope.cancel()
    println("Scope cancelled")
}
```
:::

#### Structured Hierarchy

**With structured concurrency, you can specify the major context elements (like dispatcher) once, when creating the top-level coroutine. All the nested coroutines then inherit the context and modify it only if needed** :

::: kotlin-playground Structured Hierarchy Example

@file main.kt

```kotlin
import kotlinx.coroutines.*

suspend fun loadData1(): String {
    delay(1000)
    return "Data from source 1"
}

suspend fun loadData2(): String {
    delay(1500)
    return "Data from source 2"
}

suspend fun loadData3(): String {
    delay(500)
    return "Data from source 3"
}

suspend fun loadDataConcurrently(): List<String> = coroutineScope {
    val deferred1 = async { loadData1() }
    val deferred2 = async { loadData2() }
    val deferred3 = async { loadData3() }
    
    listOf(deferred1.await(), deferred2.await(), deferred3.await())
}

fun main() = runBlocking {
    val results = loadDataConcurrently()
    println("Results: $results")
}
```
:::

#### Supervision

::: kotlin-playground Supervision Example

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    println("Starting supervised scope...")
    
    supervisorScope {
        val child1 = launch {
            try {
                delay(1000)
                throw Exception("Child 1 failed")
            } catch (e: Exception) {
                println("Child 1 failed: ${e.message}")
            }
        }
        
        val child2 = launch {
            delay(2000)
            println("Child 2 completed successfully")
        }
        
        // Wait for both children to complete
        child1.join()
        child2.join()
    }
    
    println("All children completed")
}
```
:::

### Channels - Communication Between Coroutines

**Channels provide a way to share information between different coroutines** .

#### Basic Channel Usage

::: kotlin-playground Basic Channel Example

@file main.kt

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() = runBlocking {
    val channel = Channel<String>()
    
    // Producer
    launch {
        channel.send("Hello")
        channel.send("World")
        channel.close()
    }
    
    // Consumer
    launch {
        for (message in channel) {
            println("Received: $message")
        }
    }
    
    delay(100) // Wait for all tasks to complete
}
```
:::


#### Channel Types

**By default, a "Rendezvous" channel is created** :

::: kotlin-playground Channel Types Example

@file main.kt

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun main() {
    runBlocking {
        // Different types of channels
        val rendezvousChannel = Channel<String>()
        val bufferedChannel = Channel<String>(10)
        val conflatedChannel = Channel<String>(Channel.CONFLATED)
        val unlimitedChannel = Channel<String>(Channel.UNLIMITED)
        
        println("Created different channel types:")
        println("- Rendezvous channel (capacity 0)")
        println("- Buffered channel (capacity 10)")
        println("- Conflated channel (latest value only)")
        println("- Unlimited channel (unlimited capacity)")
        
        // Demonstrating buffered channel
        launch {
            repeat(5) { i ->
                bufferedChannel.send("Message $i")
                println("Sent: Message $i")
            }
            bufferedChannel.close()
        }
        
        launch {
            for (message in bufferedChannel) {
                println("Received: $message")
                delay(100)
            }
        }
        
        delay(600) // Wait for all operations to complete
    }
}
```
:::
#### Producer Pattern

::: kotlin-playground Producer Pattern Example

@file main.kt

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.channels.*

fun CoroutineScope.produceNumbers() = produce<Int> {
    var x = 1
    while (true) {
        send(x++)
        delay(100)
    }
}

fun main() {
    runBlocking {
        val numbers = produceNumbers()
        
        repeat(5) {
            println(numbers.receive())
        }
        
        numbers.cancel()
        println("Producer cancelled")
    }
}
```
:::

### Flow - Reactive Streams

**Think of Flows as streams of data flowing through your server-side code, like the continuous stream of orders coming from the tables** .

#### Basic Flow

::: kotlin-playground Basic Flow Example

@file main.kt

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun simpleFlow(): Flow<Int> = flow {
    for (i in 1..3) {
        delay(100)
        emit(i)
    }
}

fun main() = runBlocking {
    simpleFlow().collect { value ->
        println("Received: $value")
    }
}
```
:::

#### Flow Operators

::: kotlin-playground Flow Operators Example

@file main.kt

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

fun main() = runBlocking {
    flowOf(1, 2, 3, 4, 5)
        .filter { it % 2 == 0 }
        .map { it * it }
        .collect { println("Result: $it") }
}
```
:::

#### Cold vs Hot Flows

::: kotlin-playground Cold vs Hot Flows Example

@file main.kt

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// Cold Flow - starts when collected
fun coldFlow() = flow {
    println("Cold flow started")
    emit(1)
    emit(2)
}

fun main() {
    runBlocking {
        println("=== Cold Flow Demo ===")
        coldFlow().collect { println("Cold flow value: $it") }
        
        println("\n=== Hot Flow Demo ===")
        val sharedFlow = MutableSharedFlow<Int>()
        
        val job1 = launch {
            sharedFlow.take(2).collect { println("Collector 1: $it") }
        }
        
        val job2 = launch {
            sharedFlow.take(2).collect { println("Collector 2: $it") }
        }
        
        delay(100) // Wait for collectors to be set up
        
        sharedFlow.emit(1)
        sharedFlow.emit(2)
        
        // Wait for both collectors to complete
        job1.join()
        job2.join()
        
        println("Demo completed!")
    }
}
```
:::


### Exception Handling

**Structured concurrency enhances error handling by propagating exceptions up to the nearest exception handler in the coroutine hierarchy** .

#### Try-Catch in Coroutines

::: kotlin-playground Try-Catch Example

@file main.kt

```kotlin
import kotlinx.coroutines.*

suspend fun divideNumbers(a: Int, b: Int): Int {
    delay(1000)
    return a / b
}

fun main() = runBlocking {
    try {
        val result = coroutineScope {
            async { divideNumbers(10, 0) }.await()
        }
        println("Result: $result")
    } catch (e: Exception) {
        println("Exception caught: $e")
    }
}
```
:::

#### CoroutineExceptionHandler

::: kotlin-playground Exception Handler Example

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val handler = CoroutineExceptionHandler { _, exception ->
        println("Caught exception: $exception")
    }
    
    val scope = CoroutineScope(Dispatchers.Default + handler)
    
    scope.launch {
        throw IllegalArgumentException("Something went wrong")
    }
    
    delay(1000)
}
```
:::

### Cancellation and Timeout

#### Cooperative Cancellation

::: kotlin-playground Cancellation Example

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    val job = launch {
        try {
            repeat(1000) { i ->
                println("Working $i...")
                delay(500)
            }
        } catch (e: CancellationException) {
            println("Job was cancelled")
            throw e
        } finally {
            println("Cleanup work")
        }
    }
    
    delay(1300)
    println("Cancelling job...")
    job.cancelAndJoin()
}
```
:::

#### Timeout

::: kotlin-playground Timeout Example

@file main.kt

```kotlin
import kotlinx.coroutines.*

fun main() = runBlocking {
    try {
        withTimeout(1300) {
            repeat(1000) { i ->
                println("Working $i...")
                delay(500)
            }
        }
    } catch (e: TimeoutCancellationException) {
        println("Timed out!")
    }
}
```
:::

### Thread Safety and Synchronization

**One approach to addressing shared mutable state is by using thread-safe data structures provided by the Kotlin standard library, such as Atomic types** .

#### Atomic Operations

::: kotlin-playground Atomic Operations Example

@file main.kt

```kotlin
import kotlinx.coroutines.*
import java.util.concurrent.atomic.AtomicInteger

fun main() = runBlocking {
    val counter = AtomicInteger(0)
    
    val jobs = List(100) {
        GlobalScope.launch {
            repeat(1000) {
                counter.incrementAndGet()
            }
        }
    }
    
    jobs.forEach { it.join() }
    println("Final counter value: ${counter.get()}")
}
```
:::

#### Mutex

::: kotlin-playground Mutex Example

@file main.kt

```kotlin
import kotlinx.coroutines.*
import kotlinx.coroutines.sync.*

fun main() = runBlocking {
    val mutex = Mutex()
    var counter = 0
    
    val jobs = List(100) {
        launch {
            repeat(1000) {
                mutex.withLock {
                    counter++
                }
            }
        }
    }
    
    jobs.forEach { it.join() }
    println("Final counter value: $counter")
}
```
:::

## Lesson 5 : Evolution of Kotlin

::: warning Kotlin playground not available for those new features

:::

### Explicit Backing Fields ([Issue 278](https://github.com/Kotlin/KEEP/issues/278))



```kotlin
data class Element(val name: String)

class C {
    val elementList: List<Element>
        field = mutableListOf()
    
    fun addElement(element: Element) {
        (field as MutableList<Element>).add(element)
    }
}

fun main() {
    val c = C()
    
    c.addElement(Element("First"))
    c.addElement(Element("Second"))
    
    println("Elements: ${c.elementList}")
    println("Size: ${c.elementList.size}")
    
    // field is the backing field, elementList exposes it as List<Element>
}
```

### Collection Literals ([KT-43871](https://youtrack.jetbrains.com/issue/KT-43871))

```kotlin
// Proposed collection literals syntax (not yet implemented)
val list = [1, 2, 3] // List<Int>
val map = ["one": 1, "two": 2, "three": 3] // Map<String, Int>
val set: Set<Int> = [1, 2, 3]
val map: MutableMap<String, Int> = ["one": 1, "two": 2, "three": 3]
val array = Array [1, 2, 3] // Array<Int>

typealias IntList = List<Int>
IntList [1, 2, 3]

fun foo(a: Set<Int>) {
    println("Received set: $a")
}

fun main() {
    // Using the proposed literals
    foo([1, 2, 3])
    
    println("List: $list")
    println("Map: $map") 
    println("Set: $set")
    println("Array: ${array.contentToString()}")
    
    val intList = IntList [1, 2, 3]
    println("IntList: $intList")
}
```

### Name based destructuring ([Kotlin 2.4](https://kotlinlang.org/docs/destructuring-declarations.html))


```kotlin
data class Talk(val title: String, val speakerName: String)

fun main() {
    val talk = Talk("Kotlin Coroutines", "John Doe")
    
    // Name-based destructuring (proposed syntax)
    (val speakerName, val title) = talk
    
    println("Good!")
    println("Speaker: $speakerName")
    println("Title: $title")
    
    // Benefits of name-based destructuring
    println("\nBenefits:")
    println("• Order doesn't matter")
    println("• Properties selected by name")
    println("• More readable than positional")
}
```

### Rich Errors ([KT-68296](https://youtrack.jetbrains.com/issue/KT-68296))

```kotlin
// Rich errors with union types (proposed syntax)
data class User(val name: String)
data class TransactionId(val id: String)
data class FetchingError(val message: String)
data class TransactionError(val errorMessage: String)

fun fetchUser(): User | FetchingError {
    return if (Math.random() > 0.5) {
        User("Alice")
    } else {
        FetchingError("Network error")
    }
}

fun User.charge(amount: Double): TransactionId | TransactionError {
    return if (amount > 0 && amount <= 1000) {
        TransactionId("txn_${System.currentTimeMillis()}")
    } else {
        TransactionError("Invalid amount: $amount")
    }
}

fun main() {
    val user = fetchUser()
    val transaction = user.charge(amount = 10.0)
    
    when (transaction) {
        is TransactionId -> println("Transaction succeeded")
        is FetchingError -> println("Fetching failed")
        is TransactionError -> 
            println("Transaction failed: ${transaction.errorMessage}")
    }
    
    println("Rich errors provide type-safe error handling")
}
```

### Must return values

```kotlin
// Must-use return values (proposed syntax)
data class User(val name: String)
data class TransactionId(val id: String)
data class FetchingError(val message: String)
data class TransactionError(val errorMessage: String)

fun fetchUser(): User | FetchingError {
    return if (Math.random() > 0.5) {
        User("Alice")
    } else {
        FetchingError("Network error")
    }
}

fun User.charge(amount: Double): TransactionId | TransactionError {
    return if (amount > 0 && amount <= 1000) {
        TransactionId("txn_${System.currentTimeMillis()}")
    } else {
        TransactionError("Invalid amount: $amount")
    }
}

fun main() {
    val user = fetchUser()
    when (val transaction = user?.charge(amount = 100.0)) {
        is TransactionId -> println("Transaction completed! Thanks!")
        is TransactionError -> println("Error: ${transaction.errorMessage}")
        else -> println("User fetch failed")
    }
    
    // Must-use prevents ignoring critical return values
    // fetchUser() // Would cause compiler error - return value must be used
}
```
:::

### Additional Kotlin Language Features

| Feature | Description | Status | Example Use Case |
|---------|-------------|--------|------------------|
| **Multi-field value classes** | Extension of value classes to support multiple fields while maintaining performance benefits | Proposed | `value class Coordinates(val x: Double, val y: Double)` - Efficient data containers with multiple properties |
| **Context parameters** | Implicit parameter passing mechanism, similar to Scala's implicit parameters | Experimental | Dependency injection, configuration passing without explicit parameter threading |
| **Infinite loop guards** | Compiler protection against accidental infinite loops in certain contexts | Proposed | Prevent `while(true)` without break conditions, timeout mechanisms for long-running operations |
| **HexFormat** | Built-in hexadecimal formatting and parsing utilities | Available in Kotlin 1.9+ | `HexFormat.of().formatHex(byteArray)` - Easy hex string conversion for cryptography, debugging |
| **Kotlin statics and static extensions** | Enhanced static member support and extension functions on companion objects | Proposed | Better Java interop, cleaner static utility functions, enhanced companion object capabilities |

### Resources for Latest Updates

| Resource | Purpose |
|----------|---------|
| [github.com/Kotlin/KEEP](https://github.com/Kotlin/KEEP) | Official Kotlin Enhancement Proposals - track feature development and proposals |
| [x.com/kotlin](https://x.com/kotlin) | Official Kotlin Twitter/X account - announcements, updates, and community news |
---
:::
