import{_ as s,o as a,c as e,a as t}from"./app-9pOlX4yO.js";const p="/learning-kotlin-multiplatform/assets/routes-BuqzzffU.png",o={};function i(l,n){return a(),e("div",null,n[0]||(n[0]=[t(`<h1 id="navigation" tabindex="-1"><a class="header-anchor" href="#navigation"><span>Navigation</span></a></h1><h2 id="🧪-create-navigation-between-composable-screens" tabindex="-1"><a class="header-anchor" href="#🧪-create-navigation-between-composable-screens"><span>🧪 Create Navigation between composable screens</span></a></h2><p>Compose multiplatform navigation library enable a navigation with <code>navigation host</code></p><h4 id="add-navigation-dependency-to-your-project" tabindex="-1"><a class="header-anchor" href="#add-navigation-dependency-to-your-project"><span>Add <code>Navigation</code> dependency to your project</span></a></h4><details class="hint-container details"><summary>gradle.build.kts (module : composeApp)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line"> commonMain<span class="token punctuation">.</span><span class="token function">dependencies</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">            plugins <span class="token punctuation">{</span></span>
<span class="line">            <span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line">                <span class="token function">alias</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>plugins<span class="token punctuation">.</span>kotlinSerialization<span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            commonMain<span class="token punctuation">.</span><span class="token function">dependencies</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line">            <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>kotlin<span class="token punctuation">.</span>navigation<span class="token punctuation">)</span></span>
<span class="line">            <span class="token function">implementation</span><span class="token punctuation">(</span>libs<span class="token punctuation">.</span>ktor<span class="token punctuation">.</span>serialization<span class="token punctuation">.</span>kotlinx<span class="token punctuation">.</span>json<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h4 id="create-your-navigation-host" tabindex="-1"><a class="header-anchor" href="#create-your-navigation-host"><span>Create your navigation host</span></a></h4><p>The navigation host is the configuration class that defines routes of your application.</p><p>Routes are path between all the composable screens that you will call later on your app.</p><p><img src="`+p+`" alt="routes overview"></p><p>For this Hands-on Lab we need 3 routes for :</p><ul><li>At startup to the <code>WelcomeScreen</code></li><li>from Welcome screen to the <code>QuizScreen</code></li><li>from the final question <code>QuizScreen</code>to the <code>ScoreScreen</code></li></ul><details class="hint-container details"><summary>App.kt (SourceSet: commonMain)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"></span>
<span class="line"><span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line"><span class="token keyword">import</span> kotlinx<span class="token punctuation">.</span>serialization<span class="token punctuation">.</span>Serializable</span>
<span class="line"></span>
<span class="line"><span class="token keyword">val</span> questions <span class="token operator">=</span> <span class="token function">listOf</span><span class="token punctuation">(</span></span>
<span class="line">    <span class="token function">Question</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-literal singleline"><span class="token string">&quot;Android is a great platform ?&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token function">Answer</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;YES&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Answer</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;NO&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    <span class="token function">Question</span><span class="token punctuation">(</span></span>
<span class="line">        <span class="token number">1</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token string-literal singleline"><span class="token string">&quot;Android is a bad platform ?&quot;</span></span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token number">2</span><span class="token punctuation">,</span></span>
<span class="line">        <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token function">Answer</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;YES&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token function">Answer</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token string-literal singleline"><span class="token string">&quot;NO&quot;</span></span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token annotation builtin">@Serializable</span></span>
<span class="line"><span class="token keyword">object</span> WelcomeRoute</span>
<span class="line"></span>
<span class="line"><span class="token annotation builtin">@Serializable</span></span>
<span class="line"><span class="token keyword">object</span> QuizRoute</span>
<span class="line"></span>
<span class="line"><span class="token annotation builtin">@Serializable</span></span>
<span class="line"><span class="token keyword">data</span> <span class="token keyword">class</span> <span class="token function">ScoreRoute</span><span class="token punctuation">(</span><span class="token keyword">val</span> score<span class="token operator">:</span> Int<span class="token punctuation">,</span> <span class="token keyword">val</span> questionSize<span class="token operator">:</span> Int<span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token annotation builtin">@Composable</span></span>
<span class="line"><span class="token keyword">fun</span> <span class="token function">App</span><span class="token punctuation">(</span></span>
<span class="line">    navController<span class="token operator">:</span> NavHostController <span class="token operator">=</span> <span class="token function">rememberNavController</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"></span>
<span class="line">    MaterialTheme <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">NavHost</span><span class="token punctuation">(</span></span>
<span class="line">            navController <span class="token operator">=</span> navController<span class="token punctuation">,</span></span>
<span class="line">            startDestination <span class="token operator">=</span> WelcomeRoute<span class="token punctuation">,</span></span>
<span class="line">        <span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">            composable<span class="token operator">&lt;</span>WelcomeRoute<span class="token operator">&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">                <span class="token function">welcomeScreen</span><span class="token punctuation">(</span></span>
<span class="line">                    onStartButtonPushed <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">                        navController<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span>route <span class="token operator">=</span> QuizRoute<span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">             composable<span class="token operator">&lt;</span>QuizRoute<span class="token operator">&gt;</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token function">questionScreen</span><span class="token punctuation">(</span></span>
<span class="line">                        questions <span class="token operator">=</span> questions<span class="token punctuation">,</span></span>
<span class="line">                        <span class="token comment">/* FOR SPEAKER TALK DEMO ON WEB APP */</span></span>
<span class="line">                        onFinishButtonPushed <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">                            score<span class="token operator">:</span> Int<span class="token punctuation">,</span> questionSize<span class="token operator">:</span> Int <span class="token operator">-&gt;</span> navController<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span>route <span class="token operator">=</span> <span class="token function">ScoreRoute</span><span class="token punctuation">(</span>score<span class="token punctuation">,</span> questionSize<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">                        <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">            composable<span class="token operator">&lt;</span>ScoreRoute<span class="token operator">&gt;</span> <span class="token punctuation">{</span> backStackEntry <span class="token operator">-&gt;</span></span>
<span class="line">                <span class="token keyword">val</span> scoreRoute<span class="token operator">:</span> ScoreRoute <span class="token operator">=</span> backStackEntry<span class="token punctuation">.</span>toRoute<span class="token operator">&lt;</span>ScoreRoute<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">                <span class="token function">scoreScreen</span><span class="token punctuation">(</span></span>
<span class="line">                    score <span class="token operator">=</span> scoreRoute<span class="token punctuation">.</span>score<span class="token punctuation">,</span></span>
<span class="line">                    total <span class="token operator">=</span> scoreRoute<span class="token punctuation">.</span>questionSize<span class="token punctuation">,</span></span>
<span class="line">                    onResetButtonPushed <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">                        navController<span class="token punctuation">.</span><span class="token function">navigate</span><span class="token punctuation">(</span>route <span class="token operator">=</span> QuizRoute<span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">)</span></span>
<span class="line">            <span class="token punctuation">}</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><div class="hint-container warning"><p class="hint-container-title">Warning</p><p>As you can see all composables now take as parameter a navigator. It will be needed to navigate with routes between screens.</p><p>for example, the <code>WelcomeScreen</code> composable is now declared as follows :</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token annotation builtin">@Composable</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">fun</span> <span class="token function">welcomeScreen</span><span class="token punctuation">(</span>navigator<span class="token operator">:</span> Navigator<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line">    <span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div><h4 id="use-the-navigation-host" tabindex="-1"><a class="header-anchor" href="#use-the-navigation-host"><span>Use the navigation host</span></a></h4><h5 id="use-the-callback" tabindex="-1"><a class="header-anchor" href="#use-the-callback"><span>Use the callback</span></a></h5><p>Use <code>onStartButtonPushed</code> declared on screen instantiation in the <code>NavHost</code> on welcome screen buttons click</p><details class="hint-container details"><summary>WelcomeScreen.kt (SourceSet: commonMain)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">fun</span> <span class="token function">welcomeScreen</span><span class="token punctuation">(</span>onStartButtonPushed<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Unit<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line"></span>
<span class="line">    <span class="token function">Button</span><span class="token punctuation">(</span></span>
<span class="line">        modifier <span class="token operator">=</span> Modifier<span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span>all <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">.</span>dp<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">        onClick <span class="token operator">=</span> <span class="token punctuation">{</span> <span class="token function">onStartButtonPushed</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The same can be done for other screens</p><p><em>QuestionScreen.kt</em> (commonMain)</p><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"><span class="token keyword">fun</span> <span class="token function">questionScreen</span><span class="token punctuation">(</span>questions<span class="token operator">:</span> List<span class="token operator">&lt;</span>Question<span class="token operator">&gt;</span><span class="token punctuation">,</span> onFinishButtonPushed<span class="token operator">:</span> <span class="token punctuation">(</span>Int<span class="token punctuation">,</span>Int<span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Unit<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line"><span class="token operator">..</span></span>
<span class="line"><span class="token function">Button</span><span class="token punctuation">(</span></span>
<span class="line">                modifier <span class="token operator">=</span> Modifier<span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span>bottom <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">.</span>dp<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">                onClick <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">                    <span class="token comment">/* FOR SPEAKER TALK DEMO ON WEB APP */</span></span>
<span class="line">                    <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">getPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>name <span class="token operator">==</span> <span class="token string-literal singleline"><span class="token string">&quot;WASM&quot;</span></span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                        <span class="token function">onSaveStatQuestion</span><span class="token punctuation">(</span></span>
<span class="line">                            questions<span class="token punctuation">[</span>questionProgress<span class="token punctuation">]</span><span class="token punctuation">.</span>id<span class="token punctuation">,</span></span>
<span class="line">                            questions<span class="token punctuation">[</span>questionProgress<span class="token punctuation">]</span><span class="token punctuation">.</span>label<span class="token punctuation">,</span></span>
<span class="line">                            selectedAnswer<span class="token punctuation">,</span></span>
<span class="line">                            questions<span class="token punctuation">[</span>questionProgress<span class="token punctuation">]</span><span class="token punctuation">.</span>correctAnswerId<span class="token punctuation">,</span></span>
<span class="line">                            questions<span class="token punctuation">[</span>questionProgress<span class="token punctuation">]</span><span class="token punctuation">.</span>answers<span class="token punctuation">[</span>selectedAnswer<span class="token punctuation">.</span><span class="token function">toInt</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">]</span><span class="token punctuation">.</span>label</span>
<span class="line">                        <span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">                    <span class="token keyword">if</span> <span class="token punctuation">(</span>selectedAnswer <span class="token operator">==</span> questions<span class="token punctuation">[</span>questionProgress<span class="token punctuation">]</span><span class="token punctuation">.</span>correctAnswerId<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                        score<span class="token operator">++</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                    <span class="token keyword">if</span> <span class="token punctuation">(</span>questionProgress <span class="token operator">&lt;</span> questions<span class="token punctuation">.</span>size <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">                        questionProgress<span class="token operator">++</span></span>
<span class="line">                        selectedAnswer <span class="token operator">=</span> <span class="token number">1</span></span>
<span class="line">                    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">                        <span class="token function">onFinishButtonPushed</span><span class="token punctuation">(</span>score<span class="token punctuation">,</span> questions<span class="token punctuation">.</span>size<span class="token punctuation">)</span></span>
<span class="line">                    <span class="token punctuation">}</span></span>
<span class="line">                <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><details class="hint-container details"><summary>ScoreScreen.kt (SourceSet : commonMain)</summary><div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt" data-title="kt"><pre><code><span class="line"></span>
<span class="line"><span class="token keyword">fun</span> <span class="token function">scoreScreen</span><span class="token punctuation">(</span>score<span class="token operator">:</span> Int<span class="token punctuation">,</span>total<span class="token operator">:</span>Int<span class="token punctuation">,</span>onResetButtonPushed<span class="token operator">:</span> <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-&gt;</span> Unit<span class="token punctuation">)</span><span class="token punctuation">{</span></span>
<span class="line"><span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line"> <span class="token function">Button</span><span class="token punctuation">(</span></span>
<span class="line">     modifier <span class="token operator">=</span> Modifier<span class="token punctuation">.</span><span class="token function">padding</span><span class="token punctuation">(</span>all <span class="token operator">=</span> <span class="token number">20</span><span class="token punctuation">.</span>dp<span class="token punctuation">)</span><span class="token punctuation">,</span></span>
<span class="line">    onClick <span class="token operator">=</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">onResetButtonPushed</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">     <span class="token punctuation">}</span></span>
<span class="line"> <span class="token punctuation">)</span> </span>
<span class="line"><span class="token operator">..</span><span class="token punctuation">.</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></details><h2 id="🎯-solutions" tabindex="-1"><a class="header-anchor" href="#🎯-solutions"><span>🎯 Solutions</span></a></h2><div class="hint-container tip"><p class="hint-container-title">Sources</p><p>The full solution for this section is availabe <a href="https://github.com/worldline/learning-kotlin-multiplatform/raw/main/docs/src/assets/solutions/2.navigation.zip" target="_blank" rel="noopener noreferrer">here</a></p></div><p><strong>✅ If everything is fine, congrats, you&#39;ve just finish this codelab. You can now experiment your kotlin skills eveywhere !</strong></p><h2 id="📖-further-reading" tabindex="-1"><a class="header-anchor" href="#📖-further-reading"><span>📖 Further reading</span></a></h2><ul><li><a href="https://github.com/Tlaster/PreCompose/blob/master/docs/component/navigation.md" target="_blank" rel="noopener noreferrer">Precompose navigation</a></li><li><a href="&#39;https://github.com/icerockdev/moko-resources&#39;">Moko</a></li><li><a href="https://github.com/terrakok/kmp-awesome" target="_blank" rel="noopener noreferrer">KMP awesome libs database</a></li><li><a href="https://storage.googleapis.com/android-stories/compose/Compose_Animation_Cheat_Sheet.pdf" target="_blank" rel="noopener noreferrer">Animation in compose cheat sheet</a></li><li><a href="https://google.github.io/accompanist/" target="_blank" rel="noopener noreferrer">The accompagnist : a group of libraries that aim to supplement Compose</a></li><li><a href="https://github.com/AAkira/Kotlin-Multiplatform-Libraries#repository" target="_blank" rel="noopener noreferrer">AAkira libs database</a></li></ul>`,23)]))}const u=s(o,[["render",i],["__file","index.html.vue"]]),r=JSON.parse('{"path":"/nav/","title":"Navigation","lang":"en-US","frontmatter":{"description":"Navigation 🧪 Create Navigation between composable screens Compose multiplatform navigation library enable a navigation with navigation host Add Navigation dependency to your pr...","head":[["meta",{"property":"og:url","content":"https://worldline.github.io/learning-kotlin-multiplatform/learning-kotlin-multiplatform/nav/"}],["meta",{"property":"og:title","content":"Navigation"}],["meta",{"property":"og:description","content":"Navigation 🧪 Create Navigation between composable screens Compose multiplatform navigation library enable a navigation with navigation host Add Navigation dependency to your pr..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"en-US"}],["meta",{"property":"og:updated_time","content":"2024-11-15T10:53:15.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-15T10:53:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Navigation\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-11-15T10:53:15.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"🧪 Create Navigation between composable screens","slug":"🧪-create-navigation-between-composable-screens","link":"#🧪-create-navigation-between-composable-screens","children":[]},{"level":2,"title":"🎯 Solutions","slug":"🎯-solutions","link":"#🎯-solutions","children":[]},{"level":2,"title":"📖 Further reading","slug":"📖-further-reading","link":"#📖-further-reading","children":[]}],"git":{"updatedTime":1731667995000,"contributors":[{"name":"Brah","email":"brah.gharbi@gmail.com","commits":1,"url":"https://github.com/Brah"},{"name":"Ibrahim Gharbi","email":"brah.gharbi@gmail.com","commits":14,"url":"https://github.com/Ibrahim Gharbi"},{"name":"A187839","email":"ibrahim.gharbi@worldline.com","commits":10,"url":"https://github.com/A187839"}]},"filePathRelative":"nav/README.md","autoDesc":true}');export{u as comp,r as data};