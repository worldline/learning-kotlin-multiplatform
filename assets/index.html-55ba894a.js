import{_ as p,M as o,p as i,q as c,R as n,t as s,N as t,a1 as e}from"./framework-96b046e1.js";const l="/learning-kotlin-multiplatform/assets/diagramme_sql-f4a50cd1.png",u={},r=e(`<h1 id="local-database" tabindex="-1"><a class="header-anchor" href="#local-database" aria-hidden="true">#</a> Local Database</h1><p>SQLDelight generates typesafe Kotlin APIs from your SQL statements. It verifies your schema, statements, and migrations at compile-time and provides IDE features like autocomplete and refactoring which make writing and maintaining SQL simple.</p><p>SQLDelight understands your existing SQL schema.</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> hockey_player <span class="token punctuation">(</span>
  id <span class="token keyword">INTEGER</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> AUTOINCREMENT<span class="token punctuation">,</span>
  name <span class="token keyword">TEXT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
  number <span class="token keyword">INTEGER</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>It generates typesafe code for any labeled SQL statements.</p><div class="custom-container warning"><p class="custom-container-title">WARNING</p><p>Be carefull with SQL Delight , the project and his dependancies just move from <code>com.squareup.sqldelight.*</code> to <code>app.cash.sqldelight.*</code></p><p>Pay attention also with beta, alpha version of Android studio that could produce bugs on gradle task management for code generation of SQL Delight databases.</p></div><h2 id="🧪-add-sqldelight-db-to-your-quizz" tabindex="-1"><a class="header-anchor" href="#🧪-add-sqldelight-db-to-your-quizz" aria-hidden="true">#</a> 🧪 Add sqldelight db to your quizz</h2>`,7),d={href:"https://cashapp.github.io/sqldelight/2.0.0/multiplatform_sqlite/",target:"_blank",rel:"noopener noreferrer"},k=e(`<h4 id="add-the-correct-dependancies-to-the-project" tabindex="-1"><a class="header-anchor" href="#add-the-correct-dependancies-to-the-project" aria-hidden="true">#</a> Add the correct dependancies to the project</h4><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code>plugins <span class="token punctuation">{</span>
<span class="token operator">..</span><span class="token punctuation">.</span>
    <span class="token function">id</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;app.cash.sqldelight&quot;</span></span><span class="token punctuation">)</span> version <span class="token string-literal singleline"><span class="token string">&quot;2.0.0&quot;</span></span>
<span class="token punctuation">}</span>
<span class="token operator">..</span><span class="token punctuation">.</span>
 sourceSets <span class="token punctuation">{</span>
        <span class="token keyword">val</span> commonMain <span class="token keyword">by</span> getting <span class="token punctuation">{</span>
            dependencies <span class="token punctuation">{</span>
              <span class="token operator">..</span><span class="token punctuation">.</span>
                <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;app.cash.sqldelight:runtime:2.0.0&quot;</span></span><span class="token punctuation">)</span>
                <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;app.cash.sqldelight:coroutines-extensions:2.0.0&quot;</span></span><span class="token punctuation">)</span>
                <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;org.jetbrains.kotlinx:kotlinx-datetime:0.4.1&quot;</span></span><span class="token punctuation">)</span>

            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">val</span> androidMain <span class="token keyword">by</span> getting <span class="token punctuation">{</span>
            dependencies <span class="token punctuation">{</span>
               <span class="token operator">..</span><span class="token punctuation">.</span>
                <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;app.cash.sqldelight:android-driver:2.0.0&quot;</span></span><span class="token punctuation">)</span>

            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token operator">..</span><span class="token punctuation">.</span>
        <span class="token keyword">val</span> iosMain <span class="token keyword">by</span> creating <span class="token punctuation">{</span>
         <span class="token operator">..</span><span class="token punctuation">.</span>
            dependencies <span class="token punctuation">{</span>
                <span class="token operator">..</span><span class="token punctuation">.</span>
                <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;app.cash.sqldelight:native-driver:2.0.0&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">val</span> desktopMain <span class="token keyword">by</span> getting <span class="token punctuation">{</span>
            dependencies <span class="token punctuation">{</span>
               <span class="token operator">..</span><span class="token punctuation">.</span>
                <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;app.cash.sqldelight:sqlite-driver:2.0.0&quot;</span></span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token operator">..</span><span class="token punctuation">.</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="create-the-native-sql-driver-factory-and-use-it-for-creating-the-db-with-actual-expect-kotlin-keywords" tabindex="-1"><a class="header-anchor" href="#create-the-native-sql-driver-factory-and-use-it-for-creating-the-db-with-actual-expect-kotlin-keywords" aria-hidden="true">#</a> Create the native SQL driver factory and use it for creating the DB with <code>actual</code>/<code>expect</code> kotlin keywords</h4><h4 id="read-carefully-the-modelisation-uml-below" tabindex="-1"><a class="header-anchor" href="#read-carefully-the-modelisation-uml-below" aria-hidden="true">#</a> Read carefully the modelisation UML below</h4><p><img src="`+l+`" alt="diagram SQL "></p><h4 id="create-you-sqldelight-model-quizdatabase-sq" tabindex="-1"><a class="header-anchor" href="#create-you-sqldelight-model-quizdatabase-sq" aria-hidden="true">#</a> Create you SQLDelight model &#39;QuizDatabase.sq&#39;</h4><h4 id="create-your-database-datasource-by-generating-insert-and-update-suspending-functions" tabindex="-1"><a class="header-anchor" href="#create-your-database-datasource-by-generating-insert-and-update-suspending-functions" aria-hidden="true">#</a> Create your Database datasource by generating insert and update suspending functions</h4><h4 id="update-your-repository-by-instanciating-your-database" tabindex="-1"><a class="header-anchor" href="#update-your-repository-by-instanciating-your-database" aria-hidden="true">#</a> Update your repository by instanciating your database</h4><p>Your repository handle the following cases :</p><ul><li>If there is no network and it&#39;s the first time launch of the app : handle and error</li><li>if there is no network and you have db datas : return on the flow the db data</li><li>if there is network and db data are younger than 5 min : return on the flow the db data</li><li>if there is network and db data are older than 5 min : retourn on the flow the network data and reset db data</li></ul><h2 id="🎯-solutions" tabindex="-1"><a class="header-anchor" href="#🎯-solutions" aria-hidden="true">#</a> 🎯 Solutions</h2><details class="custom-container details"><summary>QuizDatabase.sq (ressources of commonMain)*</summary><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> update_time <span class="token punctuation">(</span>
     timestamprequest <span class="token keyword">INTEGER</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> update_time<span class="token punctuation">(</span>timestamprequest<span class="token punctuation">)</span> <span class="token keyword">VALUES</span> <span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> questions <span class="token punctuation">(</span>
    id <span class="token keyword">INTEGER</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    label <span class="token keyword">TEXT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    correctAnswerId <span class="token keyword">INTEGER</span>  <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
 <span class="token punctuation">)</span><span class="token punctuation">;</span>


 <span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> answers <span class="token punctuation">(</span>
    id <span class="token keyword">INTEGER</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    label <span class="token keyword">TEXT</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    question_id <span class="token keyword">INTEGER</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span><span class="token punctuation">,</span>
    <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>id<span class="token punctuation">,</span> question_id<span class="token punctuation">)</span><span class="token punctuation">,</span>
    <span class="token keyword">FOREIGN</span> <span class="token keyword">KEY</span> <span class="token punctuation">(</span>question_id<span class="token punctuation">)</span>
      <span class="token keyword">REFERENCES</span> questions <span class="token punctuation">(</span>id<span class="token punctuation">)</span>
          <span class="token keyword">ON</span> <span class="token keyword">UPDATE</span> <span class="token keyword">CASCADE</span>
          <span class="token keyword">ON</span> <span class="token keyword">DELETE</span> <span class="token keyword">CASCADE</span>
 <span class="token punctuation">)</span><span class="token punctuation">;</span>



 selectUpdateTimestamp:
 <span class="token keyword">SELECT</span> <span class="token operator">*</span>
 <span class="token keyword">FROM</span> update_time<span class="token punctuation">;</span>

 insertTimeStamp:
 <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> update_time<span class="token punctuation">(</span>timestamprequest<span class="token punctuation">)</span>
 <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>:<span class="token keyword">timestamp</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

 deleteTimeStamp:
 <span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> update_time<span class="token punctuation">;</span>

 deleteQuestions:
 <span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> questions<span class="token punctuation">;</span>

 deleteAnswers:
 <span class="token keyword">DELETE</span> <span class="token keyword">FROM</span> answers<span class="token punctuation">;</span>


 selectAllQuestionsWithAnswers:
 <span class="token keyword">SELECT</span> <span class="token operator">*</span>
 <span class="token keyword">FROM</span> questions
 <span class="token keyword">INNER</span> <span class="token keyword">JOIN</span> answers <span class="token keyword">ON</span> questions<span class="token punctuation">.</span>id <span class="token operator">=</span> answers<span class="token punctuation">.</span>question_id<span class="token punctuation">;</span>

 insertQuestion:
 <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> questions<span class="token punctuation">(</span>id<span class="token punctuation">,</span> label<span class="token punctuation">,</span>correctAnswerId<span class="token punctuation">)</span>
 <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>?<span class="token punctuation">,</span> ?<span class="token punctuation">,</span> ?<span class="token punctuation">)</span><span class="token punctuation">;</span>

 insertAnswer:
 <span class="token keyword">INSERT</span> <span class="token keyword">INTO</span> answers<span class="token punctuation">(</span>id<span class="token punctuation">,</span> label<span class="token punctuation">,</span>question_id<span class="token punctuation">)</span>
 <span class="token keyword">VALUES</span> <span class="token punctuation">(</span>?<span class="token punctuation">,</span> ?<span class="token punctuation">,</span> ?<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>network/QuizDB.kt (commonMain)</summary><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">package</span> network


<span class="token keyword">import</span> app<span class="token punctuation">.</span>cash<span class="token punctuation">.</span>sqldelight<span class="token punctuation">.</span>async<span class="token punctuation">.</span>coroutines<span class="token punctuation">.</span>awaitAsList
<span class="token keyword">import</span> app<span class="token punctuation">.</span>cash<span class="token punctuation">.</span>sqldelight<span class="token punctuation">.</span>async<span class="token punctuation">.</span>coroutines<span class="token punctuation">.</span>awaitAsOneOrNull
<span class="token keyword">import</span> app<span class="token punctuation">.</span>cash<span class="token punctuation">.</span>sqldelight<span class="token punctuation">.</span>db<span class="token punctuation">.</span>SqlDriver
<span class="token keyword">import</span> com<span class="token punctuation">.</span>myapplication<span class="token punctuation">.</span>common<span class="token punctuation">.</span>cache<span class="token punctuation">.</span>Database
<span class="token keyword">import</span> kotlinx<span class="token punctuation">.</span>coroutines<span class="token punctuation">.</span>CoroutineScope
<span class="token keyword">import</span> network<span class="token punctuation">.</span>data<span class="token punctuation">.</span>Answer
<span class="token keyword">import</span> network<span class="token punctuation">.</span>data<span class="token punctuation">.</span>Question

<span class="token keyword">class</span> <span class="token function">QuizDbDataSource</span><span class="token punctuation">(</span><span class="token keyword">private</span> <span class="token keyword">val</span> sqlDriver<span class="token operator">:</span> SqlDriver<span class="token punctuation">,</span> <span class="token keyword">private</span> <span class="token keyword">val</span> coroutineScope<span class="token operator">:</span> CoroutineScope<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">private</span>  <span class="token keyword">var</span> database<span class="token operator">=</span><span class="token function">Database</span><span class="token punctuation">(</span>sqlDriver<span class="token punctuation">)</span>
    <span class="token keyword">private</span>  <span class="token keyword">var</span> quizQueries<span class="token operator">=</span>database<span class="token punctuation">.</span>quizDatabaseQueries


    <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">getUpdateTimeStamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span>Long <span class="token operator">=</span> quizQueries<span class="token punctuation">.</span><span class="token function">selectUpdateTimestamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">awaitAsOneOrNull</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span>timestamprequest <span class="token operator">?:</span> <span class="token number">0L</span>


    <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">setUpdateTimeStamp</span><span class="token punctuation">(</span>timeStamp<span class="token operator">:</span>Long<span class="token punctuation">)</span>  <span class="token punctuation">{</span>
        quizQueries<span class="token punctuation">.</span><span class="token function">deleteTimeStamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        quizQueries<span class="token punctuation">.</span><span class="token function">insertTimeStamp</span><span class="token punctuation">(</span>timeStamp<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

     <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">getAllQuestions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> List<span class="token operator">&lt;</span>Question<span class="token operator">&gt;</span> <span class="token punctuation">{</span>
         <span class="token keyword">return</span> quizQueries<span class="token punctuation">.</span><span class="token function">selectAllQuestionsWithAnswers</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">awaitAsList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

             <span class="token punctuation">.</span><span class="token function">groupBy</span> <span class="token punctuation">{</span>it<span class="token punctuation">.</span>question_id <span class="token punctuation">}</span>
             <span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> <span class="token punctuation">(</span>questionId<span class="token punctuation">,</span> rowList<span class="token punctuation">)</span> <span class="token operator">-&gt;</span>

             <span class="token function">Question</span><span class="token punctuation">(</span>
                 id <span class="token operator">=</span> questionId<span class="token punctuation">,</span>
                 label <span class="token operator">=</span> rowList<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>label<span class="token punctuation">,</span>
                 correctAnswerId <span class="token operator">=</span> rowList<span class="token punctuation">.</span><span class="token function">first</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>correctAnswerId<span class="token punctuation">,</span>
                 answers <span class="token operator">=</span> rowList<span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> answer <span class="token operator">-&gt;</span>
                     <span class="token function">Answer</span><span class="token punctuation">(</span>
                         id <span class="token operator">=</span> answer<span class="token punctuation">.</span>id_<span class="token punctuation">,</span>
                         label <span class="token operator">=</span> answer<span class="token punctuation">.</span>label_
                     <span class="token punctuation">)</span>
                 <span class="token punctuation">}</span>
             <span class="token punctuation">)</span>
         <span class="token punctuation">}</span>
     <span class="token punctuation">}</span>



    <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">insertQuestions</span><span class="token punctuation">(</span>questions<span class="token operator">:</span>List<span class="token operator">&lt;</span>Question<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        quizQueries<span class="token punctuation">.</span><span class="token function">deleteQuestions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        quizQueries<span class="token punctuation">.</span><span class="token function">deleteAnswers</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        questions<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span>question <span class="token operator">-&gt;</span>
            quizQueries<span class="token punctuation">.</span><span class="token function">insertQuestion</span><span class="token punctuation">(</span>question<span class="token punctuation">.</span>id<span class="token punctuation">,</span> question<span class="token punctuation">.</span>label<span class="token punctuation">,</span> question<span class="token punctuation">.</span>correctAnswerId<span class="token punctuation">)</span>
            question<span class="token punctuation">.</span>answers<span class="token punctuation">.</span><span class="token function">forEach</span> <span class="token punctuation">{</span>answer <span class="token operator">-&gt;</span>
                quizQueries<span class="token punctuation">.</span><span class="token function">insertAnswer</span><span class="token punctuation">(</span>answer<span class="token punctuation">.</span>id<span class="token punctuation">,</span>answer<span class="token punctuation">.</span>label<span class="token punctuation">,</span>question<span class="token punctuation">.</span>id<span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="custom-container details"><summary>QuizRepository.kt</summary><div class="language-kotlin line-numbers-mode" data-ext="kt"><pre class="language-kotlin"><code><span class="token keyword">package</span> network

<span class="token keyword">import</span> app<span class="token punctuation">.</span>cash<span class="token punctuation">.</span>sqldelight<span class="token punctuation">.</span>db<span class="token punctuation">.</span>SqlDriver
<span class="token keyword">import</span> kotlinx<span class="token punctuation">.</span>coroutines<span class="token punctuation">.</span>CoroutineScope
<span class="token keyword">import</span> kotlinx<span class="token punctuation">.</span>coroutines<span class="token punctuation">.</span>Dispatchers
<span class="token keyword">import</span> kotlinx<span class="token punctuation">.</span>coroutines<span class="token punctuation">.</span>flow<span class="token punctuation">.</span>MutableStateFlow
<span class="token keyword">import</span> kotlinx<span class="token punctuation">.</span>coroutines<span class="token punctuation">.</span>flow<span class="token punctuation">.</span>update
<span class="token keyword">import</span> kotlinx<span class="token punctuation">.</span>coroutines<span class="token punctuation">.</span>launch
<span class="token keyword">import</span> kotlinx<span class="token punctuation">.</span>datetime<span class="token punctuation">.</span>Clock
<span class="token keyword">import</span> network<span class="token punctuation">.</span>data<span class="token punctuation">.</span>Question


<span class="token keyword">class</span> <span class="token function">QuizRepository</span><span class="token punctuation">(</span>sqlDriver<span class="token operator">:</span> SqlDriver<span class="token punctuation">)</span>  <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">val</span> mockDataSource <span class="token operator">=</span> <span class="token function">MockDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> quizAPI <span class="token operator">=</span> <span class="token function">QuizApiDatasource</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> coroutineScope <span class="token operator">=</span> <span class="token function">CoroutineScope</span><span class="token punctuation">(</span>Dispatchers<span class="token punctuation">.</span>Main<span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">var</span> quizDB <span class="token operator">=</span> <span class="token function">QuizDbDataSource</span><span class="token punctuation">(</span>sqlDriver<span class="token punctuation">,</span>coroutineScope<span class="token punctuation">)</span>

    <span class="token keyword">private</span> <span class="token keyword">var</span> _questionState<span class="token operator">=</span>  <span class="token function">MutableStateFlow</span><span class="token punctuation">(</span>listOf<span class="token operator">&lt;</span>Question<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">var</span> questionState <span class="token operator">=</span> _questionState

    <span class="token keyword">init</span> <span class="token punctuation">{</span>
        <span class="token function">updateQuiz</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">fetchQuiz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> List<span class="token operator">&lt;</span>Question<span class="token operator">&gt;</span> <span class="token operator">=</span> quizAPI<span class="token punctuation">.</span><span class="token function">getAllQuestions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>questions

    <span class="token keyword">private</span> <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">fetchAndStoreQuiz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> List<span class="token operator">&lt;</span>Question<span class="token operator">&gt;</span><span class="token punctuation">{</span>
        <span class="token keyword">val</span> questions  <span class="token operator">=</span> <span class="token function">fetchQuiz</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
        quizDB<span class="token punctuation">.</span><span class="token function">insertQuestions</span><span class="token punctuation">(</span>questions<span class="token punctuation">)</span>
        quizDB<span class="token punctuation">.</span><span class="token function">setUpdateTimeStamp</span><span class="token punctuation">(</span>Clock<span class="token punctuation">.</span>System<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>epochSeconds<span class="token punctuation">)</span>
        <span class="token keyword">return</span> questions
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">updateQuiz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>


        coroutineScope<span class="token punctuation">.</span><span class="token function">launch</span> <span class="token punctuation">{</span>
            _questionState<span class="token punctuation">.</span><span class="token function">update</span> <span class="token punctuation">{</span>
                <span class="token keyword">try</span> <span class="token punctuation">{</span>
                    <span class="token keyword">val</span> lastRequest <span class="token operator">=</span> quizDB<span class="token punctuation">.</span><span class="token function">getUpdateTimeStamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span>lastRequest <span class="token operator">==</span> <span class="token number">0L</span> <span class="token operator">||</span> lastRequest <span class="token operator">-</span> Clock<span class="token punctuation">.</span>System<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>epochSeconds <span class="token operator">&gt;</span> <span class="token number">300000</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                        <span class="token function">fetchAndStoreQuiz</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                        quizDB<span class="token punctuation">.</span><span class="token function">getAllQuestions</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> NullPointerException<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    <span class="token function">fetchAndStoreQuiz</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> Exception<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                    e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                    mockDataSource<span class="token punctuation">.</span><span class="token function">generateDummyQuestionsList</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">}</span>

            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details>`,14),v={class:"custom-container tip"},m=n("p",{class:"custom-container-title"},"TIP",-1),b={href:"https://github.com/russhwolf/multiplatform-settings",target:"_blank",rel:"noopener noreferrer"},h=n("code",null,"Multiplatform-Settings",-1),w=n("a",{href:"'https://developer.android.com/reference/kotlin/androidx/datastore/package-summary.html'"},[n("code",null,"DataStore multiplatform")],-1),y={class:"custom-container tip"},f=n("p",{class:"custom-container-title"},"TIP",-1),g={href:"https://github.com/realm/realm-kotlin",target:"_blank",rel:"noopener noreferrer"},q=n("code",null,"Realm kotlin",-1),E={href:"https://github.com/xxfast/KStore",target:"_blank",rel:"noopener noreferrer"},S=n("p",null,[n("strong",null,"✅ If everything is fine, go to the next chapter →")],-1),_=n("h2",{id:"📖-further-reading",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#📖-further-reading","aria-hidden":"true"},"#"),s(" 📖 Further reading")],-1),L={href:"https://www.jetbrains.com/help/kotlin-multiplatform-dev/multiplatform-ktor-sqldelight.html",target:"_blank",rel:"noopener noreferrer"},Q={href:"https://github.com/cashapp/sqldelight",target:"_blank",rel:"noopener noreferrer"};function T(A,N){const a=o("ExternalLinkIcon");return i(),c("div",null,[r,n("blockquote",null,[n("p",null,[s("Refer to the multiplatform implementation of SQLDelight in official Github pages 👉 "),n("a",d,[s("https://cashapp.github.io/sqldelight/2.0.0/multiplatform_sqlite/"),t(a)])])]),k,n("div",v,[m,n("p",null,[s("if you want to store simple key-value data, you can use "),n("a",b,[h,t(a)]),s(" or "),w])]),n("div",y,[f,n("p",null,[s("For not using SQLight ORM, you can use "),n("a",g,[q,t(a)]),s(" or "),n("a",E,[s("KStore"),t(a)])])]),S,_,n("ul",null,[n("li",null,[n("a",L,[s("SQL Delight tutorial (obsolete)"),t(a)])]),n("li",null,[n("a",Q,[s("SQL Delight lib "),t(a)])])])])}const x=p(u,[["render",T],["__file","index.html.vue"]]);export{x as default};
