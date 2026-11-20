var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r};(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n=(e,t,n)=>{let r=t.lastIndexOf(`?`),i=e[r===-1||r<t.lastIndexOf(`/`)?t:t.slice(0,r)];return i?typeof i==`function`?i():Promise.resolve(i):new Promise((e,r)=>{(typeof queueMicrotask==`function`?queueMicrotask:setTimeout)(r.bind(null,Error(`Unknown variable dynamic import: `+t+(t.split(`/`).length===n?``:`. Note that variables only represent file names one level deep.`))))})},r=`modulepreload`,i=function(e){return`/boba/`+e},a={},o=function(e){return e.pathname.endsWith(`.css`)},s=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},c=function(e,t,n){let c=Promise.resolve();if(t&&t.length>0){let e,l=document.querySelector(`meta[property=csp-nonce]`),u=l?.nonce||l?.getAttribute(`nonce`);function d(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function f(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}c=d(t.map(t=>{t=i(t,n);let c=f(t),l=o(c);return s(a,c.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((l?e.styles:e.all).has(c.href))return;let t=document.createElement(`link`);if(t.rel=l?`stylesheet`:r,l||(t.as=`script`),t.crossOrigin=``,t.href=c.href,u&&t.setAttribute(`nonce`,u),document.head.appendChild(t),l)return new Promise((e,n)=>{let r=i=>{t.removeEventListener(`load`,r),t.removeEventListener(`error`,r),i.type===`error`?n(Error(`Unable to preload CSS for ${c}`)):e(i)};t.addEventListener(`load`,r),t.addEventListener(`error`,r)})})}).filter(e=>e!==void 0))}function l(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return c.then(t=>{for(let e of t||[])e.status===`rejected`&&l(e.reason);return e().catch(l)})},l=class e extends EventTarget{static instance;routes=[];currentPath=``;notFound;constructor(){super(),window.addEventListener(`popstate`,()=>{this.getAppPath()!==this.currentPath&&this.handleRoute()}),document.addEventListener(`click`,e=>this.handleLinkClick(e))}static getInstance(){return e.instance||=new e,e.instance}get baseUrl(){let e=new URL(document.baseURI).pathname;return e.endsWith(`/`)?e:e+`/`}getAppPath(){let{pathname:e,search:t}=window.location,n=this.baseUrl;return(e.startsWith(n)?e.slice(n.length-1):e)+t}registerRoute(e){let t=e.path.startsWith(`/`)?e.path:`/`+e.path,n=[],r=t.replace(/:([^/]+)/g,(e,t)=>(n.push(t),`([^\\/]+)`));this.routes.push({...e,path:t,regex:RegExp(`^${r}$`),paramNames:n})}start(){return this.handleRoute()}navigate(e){return this.go(e.startsWith(`/`)?e:`/`+e,!0)}handleRoute(){return this.go(this.getAppPath(),!1)}async go(e,t){let[n,r=``]=e.split(`?`),i=Object.fromEntries(new URLSearchParams(r)),a=this.findRoute(n),o={path:n,params:a?.params??{},query:i},s=e=>this.baseUrl+e.slice(1),c=await a?.route.beforeEnter?.(o);if(c===!1){!t&&this.currentPath&&window.history.pushState({},``,s(this.currentPath));return}if(typeof c==`string`)return this.navigate(c);let{pathname:l,search:u}=window.location;t&&l+u!==s(e)&&window.history.pushState({},``,s(e)),this.currentPath=e,a?await this.loadComponent(a.route.component,a.params,i):await this.show404(),this.dispatchEvent(new CustomEvent(`navigate`,{detail:o}))}findRoute(e){for(let t of this.routes){let n=e.match(t.regex);if(n){let e={};return t.paramNames.forEach((t,r)=>{e[t]=decodeURIComponent(n[r+1])}),{route:t,params:e}}}return null}async loadComponent(e,t={},n={}){try{await this.render(e,t,n)}catch(t){console.error(`Failed to load component: ${e}`,t),await this.show404()}}async show404(){try{if(this.notFound)return await this.render(this.notFound)}catch(e){console.error(`Failed to load component: ${this.notFound}`,e)}let e=document.querySelector(`#router-outlet`);e&&(e.innerHTML=`<h1>404 - Page Not Found</h1>`)}async render(e,t={},r={}){let i=document.querySelector(`#router-outlet`);if(!i)return;customElements.get(e)||await n(Object.assign({"../../components/about-page/about-page.ts":()=>c(()=>import(`./about-page-bTy9Ckof.js`),[]),"../../components/docs-page/docs-page.ts":()=>c(()=>import(`./docs-page-C1Um8nQF.js`),[]),"../../components/home-page/home-page.ts":()=>c(()=>import(`./home-page-BDMXbSfw.js`),[]),"../../components/nav-page/nav-page.ts":()=>c(()=>Promise.resolve().then(()=>p),void 0),"../../components/not-found-page/not-found-page.ts":()=>c(()=>import(`./not-found-page-C8BGuwcE.js`),[]),"../../components/todo-page/todo-page.ts":()=>c(()=>import(`./todo-page-CyfFzvJE.js`),[]),"../../components/user-page/user-page.ts":()=>c(()=>import(`./user-page-BZ3GIn96.js`),[]),"../../components/users-page/users-page.ts":()=>c(()=>import(`./users-page-BLfj383z.js`),[])}),`../../components/${e}/${e}.ts`,5);let a=document.createElement(e);Object.assign(a,t),a.params=t,a.query=r,i.replaceChildren(a)}handleLinkClick(e){if(e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;let t=e.target.closest(`a[href]`);if(!t||t.hasAttribute(`target`)||t.hasAttribute(`download`))return;let n=t.getAttribute(`href`);n.startsWith(`#`)?(e.preventDefault(),window.location.hash=n):n.startsWith(`/`)&&!n.startsWith(`//`)&&(e.preventDefault(),this.navigate(n))}},u=class extends HTMLElement{template;constructor(e,t){super();let n=this.tagName.toLowerCase(),r=t.replace(/:host/g,n);this.template=document.createElement(`template`),this.template.innerHTML=`<style>${r}</style>${e}`}#e=!1;connectedCallback(){this.#e||(this.#e=!0,this.replaceChildren(this.template.content.cloneNode(!0)),this.init()),this.connected()}init(){}connected(){}delegate(e,t,n){this.addEventListener(e,e=>{let r=e.target.closest(t);r&&this.contains(r)&&n.call(this,e,r)})}},d=`<header
  class="sticky top-0 z-50 backdrop-blur-md bg-[var(--boba-nav-bg)] border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 transition-colors duration-200"
>
  <div
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
  >
    <!-- Left Section: Logo & Primary Nav -->
    <div class="flex items-center space-x-8">
      <a href="/" class="flex items-center space-x-2.5 group">
        <div
          class="w-8 h-8 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 flex items-center justify-center p-1.5 font-bold shadow-sm transition-colors"
        >
          <svg class="w-full h-full" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 2.5L12 8"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <rect
              x="4.5"
              y="8"
              width="15"
              height="2.2"
              rx="1.1"
              fill="currentColor"
            />
            <path
              d="M6 10.2L7.38 19.16C7.57 20.78 8.94 22 10.58 22H13.42C15.06 22 16.43 20.78 16.62 19.16L18 10.2"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <circle cx="9.3" cy="18.3" r="1.3" fill="currentColor" />
            <circle cx="12" cy="18.8" r="1.3" fill="currentColor" />
            <circle cx="14.7" cy="18.3" r="1.3" fill="currentColor" />
            <circle cx="10.6" cy="15.7" r="1.3" fill="currentColor" />
            <circle cx="13.4" cy="15.7" r="1.3" fill="currentColor" />
          </svg>
        </div>
        <div class="flex items-center gap-2">
          <span
            class="text-lg font-bold tracking-tight text-slate-900 dark:text-slate-50 font-sans"
            >Boba</span
          >
        </div>
      </a>

      <nav
        data-nav
        class="hidden md:flex items-center space-x-1 text-sm font-medium"
      >
        <a
          href="/docs"
          class="px-3 py-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >Docs</a
        >
        <a
          href="/about"
          class="px-3 py-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >About</a
        >
        <a
          href="/todo"
          class="px-3 py-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >To-Do</a
        >
        <a
          href="/users"
          class="px-3 py-2 rounded-md text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors"
          >Users</a
        >
      </nav>
    </div>

    <!-- Right Section: GitHub Link -->
    <div class="flex items-center space-x-3 sm:space-x-4">
      <!-- GitHub Link -->
      <a
        href="https://github.com/sholtomaud/boba"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-slate-200 dark:text-slate-900 border border-slate-800 dark:border-slate-200 transition-colors shadow-sm"
        title="View Source Code on GitHub"
      >
        <svg
          class="w-4 h-4 fill-current"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <span>GitHub</span>
      </a>
    </div>
  </div>

  <!-- Mobile Navigation Bar Links -->
  <div
    data-nav
    class="md:hidden border-t border-slate-200 dark:border-slate-800 px-4 py-2 flex items-center justify-around text-xs font-medium bg-slate-50/50 dark:bg-slate-900/50"
  >
    <a
      href="/docs"
      class="px-2 py-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
      >Docs</a
    >
    <a
      href="/about"
      class="px-2 py-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
      >About</a
    >
    <a
      href="/todo"
      class="px-2 py-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
      >To-Do</a
    >
    <a
      href="/users"
      class="px-2 py-1 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100"
      >Users</a
    >
  </div>
</header>
`,f=`:host {
  display: block;
}
:host a[aria-current='page'] {
  color: var(--boba-text);
  font-weight: 600;
}
`,p=t({NavComponent:()=>m}),m=class extends u{static tagName=`app-nav`;constructor(){super(d,f)}#e=e=>{let{path:t}=e.detail;this.querySelectorAll(`[data-nav] a`).forEach(e=>{e.getAttribute(`href`)===t?e.setAttribute(`aria-current`,`page`):e.removeAttribute(`aria-current`)})};connected(){l.getInstance().addEventListener(`navigate`,this.#e)}disconnectedCallback(){l.getInstance().removeEventListener(`navigate`,this.#e)}};customElements.get(m.tagName)||customElements.define(m.tagName,m);var h=l.getInstance();if(h.notFound=`not-found-page`,h.registerRoute({path:`/`,component:`home-page`}),h.registerRoute({path:`/todo`,component:`todo-page`}),h.registerRoute({path:`/users`,component:`users-page`}),h.registerRoute({path:`/user/:name`,component:`user-page`}),h.registerRoute({path:`/docs`,component:`docs-page`}),h.registerRoute({path:`/about`,component:`about-page`}),h.start(),`serviceWorker`in navigator){let e=!navigator.serviceWorker.controller;navigator.serviceWorker.register(`sw.js`),navigator.serviceWorker.ready.then(({active:t})=>{if(e){let e=performance.getEntriesByType(`resource`);t?.postMessage(e.map(e=>e.name))}})}export{u as t};