### Partie 1 : Questions à choix multiple théorique (18 questions - 35min)

1. **Basics de Kotlin :**
    - Quelle est la principale différence entre `val` et `var` en Kotlin?
        - A) `val` est immuable tandis que `var` est mutable.
        - B) `val` est utilisé pour les variables locales, `var` pour les variables globales.
        - C) `val` est pour les types primitifs, `var` pour les objets.
        - D) Aucune différence entre `val` et `var`.

2. **Avancé en Kotlin :**
    - Quelle fonctionnalité de Kotlin rend la gestion de la nullité plus sûre?
        - A) Les opérateurs `?:` et `!!`
        - B) La déclaration `nullable`
        - C) Les types de données `Nullable`
        - D) Aucune gestion de la nullité en Kotlin

3. **Kotlin Multiplatform (KMP) :**
    - À quoi sert principalement Kotlin Multiplatform (KMP)?
        - A) Compiler du code Java sur plusieurs plates-formes.
        - B) Écrire du code une fois et le déployer sur différentes plateformes.
        - C) Convertir du code Java en code Kotlin.
        - D) Aucune des réponses ci-dessus.

4. Comment peut-on transmettre des données à un composable dans Jetpack Compose?
A) En utilisant des variables globales accessibles partout dans le code.
B) En déclarant des paramètres dans la fonction composable.
C) En reliant directement le composable à une base de données.
D) Aucune méthode pour transmettre des données à un composable.

5. Comment appelle-t-on un composable à l'intérieur d'un autre composable dans Jetpack Compose?
A) En utilisant une méthode callComposable().
B) En créant une instance du composable à appeler.
C) En invoquant directement la fonction du composable à l'intérieur de l'autre composable.
D) Les composables ne peuvent pas être imbriqués les uns dans les autres.

5. **Architecture repository/data source :**
    - Quel est le rôle principal d'un "Repository" dans l'architecture MVVM?
        - A) Gérer les requêtes réseau.
        - B) Gérer l'accès aux données et abstraire la source de données.
        - C) Manipuler les composables dans l'interface utilisateur.
        - D) Aucune des réponses ci-dessus.

6. **StateFlow :**
    - Quelle est la principale utilisation de StateFlow?
        - A) Gérer les états partagés et observer les changements asynchrones.
        - B) Gérer les états locaux dans une activité .
        - C) Gérer les états du cycle de vie des fragments.
        - D) Aucune des réponses ci-dessus.

7. **Basics des coroutines :**
    - Quelle est la principale caractéristique des coroutines?
        - A) Elles sont plus légères en termes de mémoire.
        - B) Elles permettent une exécution synchrone du code.
        - C) Elles s'exécutent exclusivement sur le thread principal.
        - D) Aucune fonctionnalité particulière.

8. **Ktor :**
    - Quel est le principal objectif de Ktor dans le développement d'applications multiplateformes?
        - A) Manipuler les bases de données locales.
        - B) Gérer les interfaces utilisateur.
        - C) Fournir un client HTTP multiplateforme.
        - D) Aucune des réponses ci-dessus.

9. **SQL Delight :**
    - Quel avantage SQL Delight apporte-t-il au développement d'applications Kotlin?
        - A) Génération de modèles de données basés sur des requêtes SQL.
        - B) Conversion automatique du code Java en code Kotlin.
        - C) Gestion des tâches asynchrones dans le code SQL.
        - D) Aucun avantage notable.

10. **Navigation avec precompose :**
    - Qu'est-ce que Precompose dans la navigation de Compose?
        - A) Une fonction pour préparer les données avant la navigation.
        - B) Un mécanisme pour précharger les composables pour une navigation plus rapide.
        - C) Un concept pour composer des animations avant une transition.
        - D) Aucune connaissance de Precompose dans la navigation.


11. **Kotlin et la gestion des exceptions :**
    - Comment Kotlin gère-t-il les exceptions par rapport à Java?
        - A) Kotlin n'a pas de mécanisme pour gérer les exceptions.
        - B) Kotlin utilise un mécanisme d'exceptions similaire à Java.
        - C) Kotlin remplace les exceptions par des gestionnaires d'erreurs.
        - D) Aucune gestion des exceptions dans Kotlin.

12. **Interopérabilité Kotlin-Java :**
    - Comment Kotlin interagit-il avec le code Java existant?
        - A) En forçant la conversion du code Java en code Kotlin.
        - B) En autorisant l'utilisation directe du code Java dans les fichiers Kotlin.
        - C) En nécessitant une réécriture complète du code Java pour le rendre compatible avec Kotlin.
        - D) Aucune interaction entre Kotlin et Java.

13. **Déclaration d'un composable :**
    - Quelle annotation est utilisée pour déclarer une fonction comme un composable dans Jetpack Compose?
        - A) `@ComposeFunction`
        - B) `@Composable`
        - C) `@UIController`
        - D) Aucune annotation requise

14. - Comment utilise-t-on un composable dans une hiérarchie d'interface utilisateur ?
        - A) En appelant directement la fonction composable dans le code.
        - B) En déclarant une instance de composable dans une classe spécifique.
        - C) En l'ajoutant directement dans une structure de composition à l'aide de la fonction déclarée.
        - D) Les composables ne peuvent pas être utilisés dans une hiérarchie d'interface utilisateur.

15. - Pourquoi est-il recommandé d'utiliser un repository dans les applications?
        - A) Pour isoler la logique métier des sources de données.
        - B) Pour rendre le code plus difficile à comprendre.
        - C) Pour minimiser l'utilisation de la programmation orientée objet.
        - D) Aucune raison valable d'utiliser une architecture repository.

16. - Quel est le rôle principal de StateFlow dans la conception des interfaces utilisateur?
        - A) Gérer l'état global de l'application.
        - B) Gérer les mises à jour asynchrones des composables.
        - C) Gérer les animations et transitions entre les écrans.
        - D) Aucune utilisation de StateFlow dans les composables.

17. **Gestion des exceptions avec les coroutines :**
    - Comment les coroutines gèrent-elles les exceptions?
        - A) En les propageant automatiquement au gestionnaire global.
        - B) En les attrapant et les traitant localement dans la coroutine.
        - C) En les convertissant en avertissements dans la console.
        - D) Aucune gestion des exceptions par les coroutines.

Quelle est la fonction du client Ktor dans le processus de gestion des requêtes HTTP ?
A) Construire l'interface utilisateur de l'application.
B) Gérer les requêtes réseau vers des serveurs distants.
C) Assurer la sécurité des données stockées localement.
D) Contrôler les animations et les transitions entre les écrans de l'application.


### Partie 2 - Analyse de code Kotlin (35min)


Dans une application Kotlin Multiplatform utilisant Jetpack Compose, quelle est la syntaxe pour définir un composable affichant un texte "Hello World!" ?

A)
```kotlin
@Composable
fun Greeting() {
    Text("Hello World!")
}
```

B)
```kotlin
fun Greeting() {
    Text("Hello World!")
}
```

C)
```kotlin
@Composable
fun Greeting(): Text("Hello World!") {
    // ...
}
```

D) 
```kotlin
@Composable
fun Greeting(): String {
    return "Hello World!"
}
```


Question 2 :
Quel est le moyen correct pour définir un StateFlow contenant un entier initialisé à 0 dans Kotlin Multiplatform ?

A)
```kotlin
val count = StateFlow<Int>(0)
```

B)
```kotlin
val count = MutableStateFlow(0)
```

C)
```kotlin
val count = StateFlow { 0 }
```

D)
```kotlin
val count = MutableStateFlow<Int>()
```

Question3
Dans une application Kotlin Multiplatform, comment déclarer une fonction qui renvoie un CoroutineScope pour la gestion des coroutines ?

A)
```kotlin
fun provideScope(): CoroutineScope {
    return CoroutineScope(Dispatchers.Default)
}
```

B)
```kotlin
fun provideScope(): CoroutineScope = CoroutineScope(Dispatchers.Default)
```

C)
```kotlin
fun provideScope() = CoroutineScope(Dispatchers.Default)
```

D)
```kotlin
fun provideScope(): CoroutineScope {
    return CoroutineScope()
}
```

Question 4 :
Quelle est la manière correcte de définir une requête HTTP GET avec Ktor dans une application Kotlin Multiplatform ?

A)
```kotlin
val result = HttpClient.get("https://api.example.com/data")
```

B)
```kotlin
val result = HttpClient.request("https://api.example.com/data") {
    method = HttpMethod.GET
}
```

C)
```kotlin
val result = HttpClient.get { url("https://api.example.com/data") }
```

D)
```kotlin
val result = HttpClient.request<String> {
    url("https://api.example.com/data")
    method = HttpMethod.GET
}
```


Question 5 :
Comment déclarer une fonction suspendue qui effectue une requête GET avec Ktor et renvoie une chaîne de caractères représentant la réponse dans une application Kotlin Multiplatform ?

A)
```kotlin
suspend fun fetchData(): String {
    return HttpClient.get("https://api.example.com/data")
}
```

B)
```kotlin
suspend fun fetchData(): String {
    return HttpClient.request("https://api.example.com/data") {
        method = HttpMethod.GET
    }
}
```

C)
```kotlin
suspend fun fetchData(): String {
    return HttpClient.get { url("https://api.example.com/data") }
}
```

D)
```kotlin
suspend fun fetchData(): String {
    return HttpClient.request<String> {
        url("https://api.example.com/data")
        method = HttpMethod.GET
    }
}
```
Question 6 :
Comment définir un modèle de données simple représentant un utilisateur avec un nom et un âge dans Kotlin Multiplatform ?

A)
```kotlin
data class User(name: String, age: Int)
```

B)
```kotlin
data class User(val name: String, val age: Int)
```

C)
```kotlin
class User {
    var name: String = ""
    var age: Int = 0
}
```

D)
```kotlin
class User(name: String, age: Int)
```


### Partie 3 - Conception d'interfaces visuelles multiplatform ( 35 min)


Description de la vue à créer :

La vue représente une application de gestion de tâches. Elle se compose de trois sections principales :

En-tête de l'application :
Affiche le titre de l'application.
Un bouton pour ajouter une nouvelle tâche.
Liste de tâches :
Affiche une liste de tâches avec leur titre et leur état (terminé ou non terminé).
Chaque tâche est représentée sous forme de carte avec une case à cocher pour indiquer son état.
Section de détails de la tâche sélectionnée :
Affiche les détails de la tâche sélectionnée (titre, description, date limite, etc.).

Solution
```kotlin
@Composable
fun TaskManagementApp(tasks: List<Task>) {
    Column {
        // En-tête de l'application
        TopAppBar(title = { Text(text = "Gestion de Tâches") },
            actions = {
                IconButton(onClick = { /* Action d'ajout de tâche */ }) {
                    Icon(Icons.Default.Add, contentDescription = "Ajouter une tâche")
                }
            }
        )

        // Liste de tâches
        LazyColumn {
            items(tasks) { task ->
                TaskItem(task = task)
            }
        }

        // Section des détails de la tâche sélectionnée
        // (Cette section pourrait être conditionnelle selon la tâche sélectionnée)
        // TaskDetails(selectedTask)
    }
}

@Composable
fun TaskItem(task: Task) {
    Card(
        modifier = Modifier
            .padding(8.dp)
            .fillMaxWidth(),
        elevation = 4.dp
    ) {
        Row(
            modifier = Modifier
                .padding(16.dp)
                .fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Checkbox(
                checked = task.completed,
                onCheckedChange = { /* Action lors du changement d'état de la tâche */ }
            )
            Text(text = task.title, modifier = Modifier.padding(start = 8.dp))
        }
    }
}

// Modèle de données pour une tâche
data class Task(val title: String, val completed: Boolean)

// Utilisation de la vue
val tasksList = listOf(
    Task("Faire les courses", completed = false),
    Task("Répondre aux emails", completed = true),
    Task("Préparer la présentation", completed = false),
    // ... autres tâches
)

// Affichage de la vue
TaskManagementApp(tasks = tasksList)
````

Partie 4 : Conception d'une application multiplatform (1h10min)


L'application de voyage collaborative vise à faciliter la planification et l'organisation de voyages en groupe. Elle permettra aux utilisateurs de créer des itinéraires de voyage, de partager des idées d'activités, de gérer les dépenses et de communiquer facilement entre les membres du groupe.

Fonctionnalités principales :
   - **Création d'un voyage :** Permettre aux utilisateurs de créer des voyages, d'ajouter des destinations et de définir des dates.
   - **Planification collaborative :** Possibilité pour les membres du groupe de suggérer des activités, des restaurants, des lieux à visiter, etc.
   - **Gestion des dépenses :** Suivi des dépenses individuelles et collectives pendant le voyage.
   - **Communication en temps réel :** Chat en groupe pour discuter, partager des photos et des informations en temps réel.
   - **Carte interactive :** Intégration de cartes interactives pour visualiser les lieux et les activités planifiées.
   - **Liste de tâches :** Attribution de tâches à différents membres pour la préparation du voyage.

Public cible :
Cette application cible les groupes d'amis, les familles et les communautés de voyageurs cherchant à organiser des voyages en groupe de manière collaborative.

Innovation :

L'innovation de cette application réside dans sa capacité à rassembler les membres d'un groupe de voyage pour planifier, gérer les dépenses et partager des expériences en temps réel pendant le voyage.

Exercice 
Fournir les spécifications techniques de l'application avec : 

   - **Mindmap des fonctionnalités :** Une mindmap détaillée montrant chaque fonctionnalité et les interactions entre les utilisateurs.
   - **Diagramme d'architecture de l'application multiplatform front

   - **Storyboard :** un brouillon des écrans de l'application

   - **Modèle de données :** Modèle de données pour stocker les informations sur les voyages, les activités, les dépenses et les membres du groupe.
















