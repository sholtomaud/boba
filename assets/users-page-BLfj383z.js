import{t as e}from"./index-DNLe-7X8.js";async function t(e=fetch){let t=await e(`data/users.json`);if(!t.ok)throw Error(`Could not load users (HTTP ${t.status})`);return t.json()}function n(e,t){return t.some(t=>t.name.toLowerCase()===e.name.toLowerCase())?`${e.name} is already in the list.`:``}var r=`<div class="min-h-[calc(100vh-4rem)] bg-[var(--boba-bg)] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 transition-colors duration-200">
  <div class="max-w-2xl mx-auto">

    <div class="text-center mb-10">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-2">
        Users
      </h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        A form, an API call and a service — with nothing but the platform.
      </p>
    </div>

    <div class="bg-[var(--boba-surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">

      <!-- The browser validates required/minlength/pattern before "submit" fires. -->
      <form id="user-form" class="grid sm:grid-cols-[1fr_auto_auto] gap-3 mb-2">
        <input
          name="name"
          aria-label="Name"
          placeholder="Name"
          required
          minlength="2"
          pattern="[\\p{L} '\\-]+"
          title="Letters, spaces, apostrophes and hyphens"
          autocomplete="off"
          class="px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm font-medium"
        />
        <select
          name="role"
          aria-label="Role"
          required
          class="px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-sm font-medium"
        >
          <option value="">Role…</option>
          <option>Engineer</option>
          <option>Designer</option>
          <option>Maintainer</option>
        </select>
        <button class="px-5 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold rounded-lg shadow-sm text-sm cursor-pointer">
          Add user
        </button>
      </form>

      <p id="user-status" role="status" class="text-sm text-slate-500 dark:text-slate-400 min-h-5 mb-4"></p>

      <ul id="user-list" class="divide-y divide-slate-200 dark:divide-slate-800"></ul>

      <template id="user-item-template">
        <li class="py-3 flex items-center justify-between">
          <a class="user-link font-semibold underline"></a>
          <span class="user-role text-xs font-mono text-slate-500 dark:text-slate-400"></span>
        </li>
      </template>
    </div>
  </div>
</div>
`,i=`:host {
  display: block;
}
`,a=class extends e{static tagName=`users-page`;users=[];constructor(){super(r,i)}async init(){let e=this.querySelector(`#user-form`),r=e.elements.namedItem(`name`);e.addEventListener(`submit`,t=>{t.preventDefault();let i=Object.fromEntries(new FormData(e));i.name=i.name.trim(),r.setCustomValidity(n(i,this.users)),e.reportValidity()&&(this.users.push(i),this.renderUsers(),this.setStatus(`Added ${i.name}.`),e.reset(),r.focus())}),r.addEventListener(`input`,()=>r.setCustomValidity(``)),this.setStatus(`Loading users…`);try{this.users=await t(),this.renderUsers(),this.setStatus(``)}catch(e){this.setStatus(e.message)}}setStatus(e){this.querySelector(`#user-status`).textContent=e}renderUsers(){let e=this.querySelector(`#user-item-template`),t=this.users.map(t=>{let n=e.content.cloneNode(!0),r=n.querySelector(`.user-link`);return r.textContent=t.name,r.setAttribute(`href`,`/user/${encodeURIComponent(t.name)}`),n.querySelector(`.user-role`).textContent=t.role,n});this.querySelector(`#user-list`).replaceChildren(...t)}};customElements.get(a.tagName)||customElements.define(a.tagName,a);export{a as UsersPageComponent};