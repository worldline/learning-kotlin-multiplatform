import{_ as s,o as a,c as t,a as e,b as p}from"./app-9pOlX4yO.js";const o={};function i(l,n){return a(),t("div",null,n[0]||(n[0]=[e(`<h1 id="preferences" tabindex="-1"><a class="header-anchor" href="#preferences"><span>Preferences</span></a></h1><p><a href="https://github.com/xxfast/KStore" target="_blank" rel="noopener noreferrer">Kstore</a> is a tiny Kotlin multiplatform library that assists in saving and restoring objects to and from disk using kotlinx.coroutines, kotlinx.serialization and kotlinx.io. Inspired by RxStore</p><div class="hint-container tip"><p class="hint-container-title">More settings options</p><p>if you want alternate library to store simple key-value data, you can use <a href="https://github.com/russhwolf/multiplatform-settings" target="_blank" rel="noopener noreferrer"><code>Multiplatform-Settings</code></a> or <a href="&#39;https://developer.android.com/reference/kotlin/androidx/datastore/package-summary.html&#39;"><code>DataStore multiplatform</code></a>. Be carefull, not all target web platform</p></div><p>Add kstore dependency to your project for each target platform</p><details class="hint-container details"><summary>build.gradle.kts (composeMain)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line">  commonMain<span class="token punctuation">.</span><span class="token function">dependencies</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line">            <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>kstore<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        androidMain<span class="token punctuation">.</span><span class="token function">dependencies</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line">            <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>kstore<span class="token punctuation">.</span>file<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        desktopMain<span class="token punctuation">.</span><span class="token function">dependencies</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line">            <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>kstore<span class="token punctuation">.</span>file<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        iosMain<span class="token punctuation">.</span><span class="token function">dependencies</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>kstore<span class="token punctuation">.</span>file<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        wasmJsMain<span class="token punctuation">.</span><span class="token function">dependencies</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>kstore<span class="token punctuation">.</span>storage<span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>Define the native call to get the kstore instance</p><details class="hint-container details"><summary>platform.kt (commonMain)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line">    <span class="token keyword">expect</span> <span class="token keyword">fun</span> <span class="token function">getKStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> KStore<span class="token operator">&lt;</span>Quiz<span class="token operator">&gt;</span><span class="token operator">?</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div></details><p>Define each platform call to get the kstore instance for Android, iOS, Web, Desktop</p><details class="hint-container details"><summary>platform.kt (androidMain)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line">    <span class="token keyword">actual</span> <span class="token keyword">fun</span> <span class="token function">getKStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> KStore<span class="token operator">&lt;</span>Quiz<span class="token operator">&gt;</span><span class="token operator">?</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token function">storeOf</span><span class="token punctuation">(</span>QuizApp<span class="token punctuation">.</span><span class="token function">context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>dataDir<span class="token punctuation">.</span>path<span class="token punctuation">.</span><span class="token function">plus</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;/quiz.json&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">toPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>Also Android needs context to instanciate the kstore. Without injection library, you can use an App context singleton.</p><details class="hint-container details"><summary>QuizApp.kt (androidMain)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">class</span> QuizApp <span class="token operator">:</span> <span class="token function">Application</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">init</span> <span class="token punctuation">{</span></span>
<span class="line">        app <span class="token operator">=</span> <span class="token keyword">this</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">companion</span> <span class="token keyword">object</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">private</span> <span class="token keyword">lateinit</span> <span class="token keyword">var</span> app<span class="token operator">:</span> QuizApp</span>
<span class="line">        <span class="token keyword">fun</span> <span class="token function">context</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Context <span class="token operator">=</span> app<span class="token punctuation">.</span>applicationContext</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span> </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>Add the QuizApp to the AndroidManifest.xml</p><details class="hint-container details"><summary>AndroidManifest.xml (androidMain)</summary><div class="language-xml line-numbers-mode" data-highlighter="prismjs" data-ext="xml" data-title="xml"><pre><code><span class="line">...</span>
<span class="line">    &lt;application</span>
<span class="line">        android:name=&quot;.QuizApp&quot;</span>
<span class="line">...</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>platform.kt (iosMain)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line">    <span class="token annotation builtin">@OptIn</span><span class="token punctuation">(</span>ExperimentalKStoreApi<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">actual</span> <span class="token keyword">fun</span> <span class="token function">getKStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> KStore<span class="token operator">&lt;</span>Quiz<span class="token operator">&gt;</span><span class="token operator">?</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> NSFileManager<span class="token punctuation">.</span>defaultManager<span class="token punctuation">.</span>DocumentDirectory<span class="token operator">?</span><span class="token punctuation">.</span>relativePath<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">plus</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;/quiz.json&quot;</span></span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">toPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">let</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token function">storeOf</span><span class="token punctuation">(</span></span>
<span class="line">            file<span class="token operator">=</span> it</span>
<span class="line">        <span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>platform.kt (wasmJsMain)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line">    <span class="token keyword">actual</span> <span class="token keyword">fun</span> <span class="token function">getKStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> KStore<span class="token operator">&lt;</span>Quiz<span class="token operator">&gt;</span><span class="token operator">?</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token function">storeOf</span><span class="token punctuation">(</span>key <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">&quot;kstore_quiz&quot;</span></span><span class="token punctuation">)</span></span>
<span class="line">     <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>platform.kt (desktopMain)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line">    <span class="token keyword">actual</span> <span class="token keyword">fun</span> <span class="token function">getKStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> KStore<span class="token operator">&lt;</span>Quiz<span class="token operator">&gt;</span><span class="token operator">?</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token function">storeOf</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">&quot;quiz.json&quot;</span></span><span class="token punctuation">.</span><span class="token function">toPath</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>Upgrade the Quiz object with an update timestamp</p><details class="hint-container details"><summary>Quiz.kt (commonMain)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token annotation builtin">@Serializable</span></span>
<span class="line"><span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">Quiz</span><span class="token punctuation">(</span><span class="token keyword">var</span> questions<span class="token operator">:</span> List<span class="token operator">&lt;</span>Question<span class="token operator">&gt;</span><span class="token punctuation">,</span>  <span class="token keyword">val</span> updateTime<span class="token operator">:</span>Long<span class="token operator">=</span><span class="token number">0L</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div></details><p>Create a QuizKStoreDataSource class to store the kstore data</p><details class="hint-container details"><summary>QuizKStoreDataSource.kts (commonMain)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">class</span> QuizKStoreDataSource <span class="token punctuation">{</span></span>
<span class="line">   <span class="token keyword">private</span> <span class="token keyword">val</span> kStoreQuiz<span class="token operator">:</span> KStore<span class="token operator">&lt;</span>Quiz<span class="token operator">&gt;</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token function">getKStore</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">getUpdateTimeStamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Long <span class="token operator">=</span> kStoreQuiz<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span>updateTime <span class="token operator">?:</span> <span class="token number">0L</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">setUpdateTimeStamp</span><span class="token punctuation">(</span>timeStamp<span class="token operator">:</span> Long<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">       kStoreQuiz<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">update</span> <span class="token punctuation">{</span> quiz<span class="token operator">:</span> Quiz<span class="token operator">?</span> <span class="token operator">-&gt;</span></span>
<span class="line">           quiz<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span>updateTime <span class="token operator">=</span> timeStamp<span class="token punctuation">)</span></span>
<span class="line">       <span class="token punctuation">}</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">getAllQuestions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> List<span class="token operator">&lt;</span>Question<span class="token operator">&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">       <span class="token keyword">return</span> kStoreQuiz<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">?</span><span class="token punctuation">.</span>questions <span class="token operator">?:</span> <span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">insertQuestions</span><span class="token punctuation">(</span>newQuestions<span class="token operator">:</span> List<span class="token operator">&lt;</span>Question<span class="token operator">&gt;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">       kStoreQuiz<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">update</span> <span class="token punctuation">{</span> quiz<span class="token operator">:</span> Quiz<span class="token operator">?</span> <span class="token operator">-&gt;</span></span>
<span class="line">           quiz<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">copy</span><span class="token punctuation">(</span>questions <span class="token operator">=</span> newQuestions<span class="token punctuation">)</span></span>
<span class="line">       <span class="token punctuation">}</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">   <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">resetQuizKstore</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">       kStoreQuiz<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">       kStoreQuiz<span class="token operator">?</span><span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span><span class="token function">Quiz</span><span class="token punctuation">(</span><span class="token function">emptyList</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">0L</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">   <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><p>Update the QuizRepository class to use the kstore</p><details class="hint-container details"><summary>QuizRepository.kts (commonMain)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">class</span> QuizRepository <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">val</span> mockDataSource <span class="token operator">=</span> <span class="token function">MockDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">val</span> quizApiDatasource <span class="token operator">=</span> <span class="token function">QuizApiDatasource</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">var</span> quizKStoreDataSource <span class="token operator">=</span> <span class="token function">QuizKStoreDataSource</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">fetchQuiz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> List<span class="token operator">&lt;</span>Question<span class="token operator">&gt;</span> <span class="token operator">=</span> quizApiDatasource<span class="token punctuation">.</span><span class="token function">getAllQuestions</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>questions</span>
<span class="line"></span>
<span class="line">    <span class="token keyword">private</span> <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">fetchAndStoreQuiz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> List<span class="token operator">&lt;</span>Question<span class="token operator">&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">        quizKStoreDataSource<span class="token punctuation">.</span><span class="token function">resetQuizKstore</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">val</span> questions <span class="token operator">=</span> <span class="token function">fetchQuiz</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        quizKStoreDataSource<span class="token punctuation">.</span><span class="token function">insertQuestions</span><span class="token punctuation">(</span>questions<span class="token punctuation">)</span></span>
<span class="line">        quizKStoreDataSource<span class="token punctuation">.</span><span class="token function">setUpdateTimeStamp</span><span class="token punctuation">(</span>Clock<span class="token punctuation">.</span>System<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>epochSeconds<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span> questions</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">suspend</span> <span class="token keyword">fun</span> <span class="token function">updateQuiz</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> List<span class="token operator">&lt;</span>Question<span class="token operator">&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">try</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">val</span> lastRequest <span class="token operator">=</span> quizKStoreDataSource<span class="token punctuation">.</span><span class="token function">getUpdateTimeStamp</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>lastRequest <span class="token operator">==</span> <span class="token number">0L</span> <span class="token operator">||</span> lastRequest <span class="token operator">-</span> Clock<span class="token punctuation">.</span>System<span class="token punctuation">.</span><span class="token function">now</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>epochSeconds <span class="token operator">&gt;</span> <span class="token number">300000</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">fetchAndStoreQuiz</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                quizKStoreDataSource<span class="token punctuation">.</span><span class="token function">getAllQuestions</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> NullPointerException<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span> <span class="token function">fetchAndStoreQuiz</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span>e<span class="token operator">:</span> Exception<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">            <span class="token keyword">return</span> mockDataSource<span class="token punctuation">.</span><span class="token function">generateDummyQuestionsList</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="hint-container tip"><p class="hint-container-title">Sources</p><p>The full sources can be retrieved <a href="https://github.com/worldline/learning-kotlin-multiplatform/raw/main/docs/src/assets/solutions/6.preferences.zip" target="_blank" rel="noopener noreferrer">here</a></p></div><h2 id="🎬-summary-video-of-the-course" tabindex="-1"><a class="header-anchor" href="#🎬-summary-video-of-the-course"><span>🎬 Summary video of the course</span></a></h2>`,24),p("iframe",{width:"560",height:"315",src:"https://youtube.com/embed/r-wUqYZgbOo",title:"KMP Quiz App overview",frameborder:"0",allow:"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",allowfullscreen:""},null,-1)]))}const u=s(o,[["render",i],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/preferences/","title":"Preferences","lang":"en-US","frontmatter":{"description":"Preferences Kstore is a tiny Kotlin multiplatform library that assists in saving and restoring objects to and from disk using kotlinx.coroutines, kotlinx.serialization and kotli...","head":[["meta",{"property":"og:url","content":"https://worldline.github.io/learning-kotlin-multiplatform/learning-kotlin-multiplatform/preferences/"}],["meta",{"property":"og:title","content":"Preferences"}],["meta",{"property":"og:description","content":"Preferences Kstore is a tiny Kotlin multiplatform library that assists in saving and restoring objects to and from disk using kotlinx.coroutines, kotlinx.serialization and kotli..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-10-04T21:20:21.000Z"}],["meta",{"property":"article:modified_time","content":"2024-10-04T21:20:21.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Preferences\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-10-04T21:20:21.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"🎬 Summary video of the course","slug":"🎬-summary-video-of-the-course","link":"#🎬-summary-video-of-the-course","children":[]}],"git":{"updatedTime":1728076821000,"contributors":[{"name":"Ibrahim Gharbi","email":"brah.gharbi@gmail.com","commits":15,"url":"https://github.com/Ibrahim Gharbi"}]},"filePathRelative":"preferences/README.md","autoDesc":true}');export{u as comp,r as data};