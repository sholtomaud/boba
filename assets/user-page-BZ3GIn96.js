import{t as e}from"./index-DNLe-7X8.js";var t=`<div class="min-h-[calc(100vh-4rem)] bg-[var(--boba-bg)] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6">
  <div class="max-w-2xl mx-auto bg-[var(--boba-surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 text-center">
    <h1 class="text-3xl font-extrabold tracking-tight mb-2">User Profile</h1>
    <p class="text-slate-600 dark:text-slate-300 mb-1">
      Welcome, <strong id="user-name"></strong>!
    </p>
    <p class="text-sm text-slate-500 dark:text-slate-400 mb-6">
      The name comes from the <code class="font-mono">/user/:name</code> route parameter.
    </p>
    <a href="/users" class="text-sm font-semibold underline">Back to all users</a>
  </div>
</div>
`,n=`:host {
  display: block;
}
`,r=class extends e{static tagName=`user-page`;name=`Guest`;constructor(){super(t,n)}init(){this.querySelector(`#user-name`).textContent=this.name}};customElements.get(r.tagName)||customElements.define(r.tagName,r);export{r as UserPageComponent};