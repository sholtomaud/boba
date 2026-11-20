import{t as e}from"./index-DNLe-7X8.js";var t=class extends EventTarget{state;constructor(e){super(),this.state={...e}}getState(){return{...this.state}}setState(e){this.state={...this.state,...e},this.dispatchEvent(new CustomEvent(`change`,{detail:this.getState()}))}},n=`<div class="min-h-[calc(100vh-4rem)] bg-[var(--boba-bg)] text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 transition-colors duration-200">
  <div class="max-w-2xl mx-auto">

    <!-- Heading -->
    <div class="text-center mb-10">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 mb-3 uppercase tracking-wider shadow-sm">
        Enterprise Application Demo
      </span>
      <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-2">
        To-Do Task Manager
      </h1>
      <p class="text-sm text-slate-500 dark:text-slate-400 font-normal">
        Declarative state-managed task list built with Boba Store standards.
      </p>
    </div>

    <!-- Main Card -->
    <div class="bg-[var(--boba-surface)] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8">

      <!-- Input Row -->
      <div class="flex gap-3 mb-8">
        <input
          type="text"
          id="new-task-input"
          placeholder="Add a new task..."
          class="flex-grow px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 bg-white dark:bg-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:border-slate-500 transition-all text-sm font-medium"
          autocomplete="off"
        />
        <button
          id="add-task-btn"
          class="px-5 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-slate-200 text-white dark:text-slate-900 font-semibold rounded-lg transition-all shadow-sm flex items-center justify-center gap-1.5 text-sm cursor-pointer"
        >
          <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add
        </button>
      </div>

      <!-- Filters -->
      <div class="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4 mb-6 text-xs sm:text-sm">
        <div class="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-lg border border-slate-200/80 dark:border-slate-800">
          <button
            data-filter="all"
            class="filter-btn px-3 py-1.5 font-medium rounded-md transition-all cursor-pointer"
          >
            All
          </button>
          <button
            data-filter="active"
            class="filter-btn px-3 py-1.5 font-medium rounded-md transition-all cursor-pointer"
          >
            Active <span class="ml-1 text-[11px] px-1.5 py-0.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-full font-semibold" data-active-count></span>
          </button>
          <button
            data-filter="completed"
            class="filter-btn px-3 py-1.5 font-medium rounded-md transition-all cursor-pointer"
          >
            Completed
          </button>
        </div>

        <button
          id="clear-completed-btn"
          class="hidden text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline transition-colors py-1 px-2 cursor-pointer"
        >
          Clear Completed
        </button>
      </div>

      <!-- Task List -->
      <ul id="task-list" class="space-y-3"></ul>

      <!-- Empty State -->
      <div id="empty-state" class="hidden py-10 text-center">
        <svg class="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="1.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.375M9 18h3.375m1.875-10.125A2.25 2.25 0 0115.75 6H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25H6A2.25 2.25 0 013.75 18V6A2.25 2.25 0 016 3.75h1.5m9 0h-9" />
        </svg>
        <p class="text-sm text-slate-400 dark:text-slate-500 font-medium">No tasks found in this view.</p>
      </div>

      <!-- Task Footer Stats -->
      <div class="mt-8 pt-5 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
        <span data-remaining-label></span>
        <span>Total tasks: <span data-total-count></span></span>
      </div>

    </div>
  </div>
</div>

<!-- Task item template, cloned per task by todo-page.ts -->
<template id="task-item-template">
  <li class="flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg transition-all group shadow-sm">
    <div class="flex items-center space-x-3 flex-grow cursor-pointer toggle-task">

      <!-- Checkbox -->
      <div class="checkbox w-5 h-5 flex items-center justify-center rounded border transition-all">
        <svg class="check-icon hidden w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
          <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <!-- Task Text -->
      <span class="task-text font-medium text-sm transition-all"></span>
    </div>

    <!-- Delete Button -->
    <button
      class="delete-task p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition-all cursor-pointer"
      title="Delete Task"
    >
      <svg class="w-4 h-4 fill-none stroke-current" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    </button>
  </li>
</template>
`,r=`:host {
  display: block;
}
`,i=[{id:1,text:`Discover Boba framework standards`,completed:!0},{id:2,text:`Explore the upgraded regex router`,completed:!1},{id:3,text:`Build a gorgeous state-driven interface`,completed:!1}],a=class extends e{static tagName=`todo-page`;store;nextTaskId=4;constructor(){super(n,r);let e=localStorage.getItem(`boba-todo-state`),a=e?JSON.parse(e):{tasks:i,filter:`all`},o=a.tasks.reduce((e,t)=>t.id>e?t.id:e,0);this.nextTaskId=o>=1?o+1:1,a.filter=`all`,this.store=new t(a)}init(){this.store.addEventListener(`change`,()=>{localStorage.setItem(`boba-todo-state`,JSON.stringify(this.store.getState())),this.renderTasks()}),this.delegate(`click`,`#add-task-btn`,()=>this.addTask()),this.delegate(`keypress`,`#new-task-input`,e=>{e.key===`Enter`&&this.addTask()}),this.delegate(`click`,`.toggle-task`,(e,t)=>{let n=parseInt(t.getAttribute(`data-id`)||`0`,10);this.toggleTask(n)}),this.delegate(`click`,`.delete-task`,(e,t)=>{let n=parseInt(t.getAttribute(`data-id`)||`0`,10);this.deleteTask(n)}),this.delegate(`click`,`.filter-btn`,(e,t)=>{let n=t.getAttribute(`data-filter`);this.setFilter(n)}),this.delegate(`click`,`#clear-completed-btn`,()=>this.clearCompleted()),this.renderTasks()}addTask(){let e=this.querySelector(`#new-task-input`);if(!e)return;let t=e.value.trim();if(!t)return;let{tasks:n}=this.store.getState(),r={id:this.nextTaskId++,text:t,completed:!1};this.store.setState({tasks:[...n,r]});let i=this.querySelector(`#new-task-input`);i&&(i.value=``,i.focus())}toggleTask(e){let{tasks:t}=this.store.getState(),n=t.map(t=>t.id===e?{...t,completed:!t.completed}:t);this.store.setState({tasks:n})}deleteTask(e){let{tasks:t}=this.store.getState(),n=t.filter(t=>t.id!==e);this.store.setState({tasks:n})}setFilter(e){this.store.setState({filter:e})}clearCompleted(){let{tasks:e}=this.store.getState(),t=e.filter(e=>!e.completed);this.store.setState({tasks:t})}renderTasks(){let{tasks:e,filter:t}=this.store.getState(),n=e.filter(e=>t===`active`?!e.completed:t!==`completed`||e.completed),r=e.filter(e=>!e.completed).length,i=e.filter(e=>e.completed).length;this.renderFilterButtons(t);let a=this.querySelector(`[data-active-count]`);a&&(a.textContent=String(r)),this.querySelector(`#clear-completed-btn`)?.classList.toggle(`hidden`,i===0),this.renderTaskList(n);let o=this.querySelector(`[data-remaining-label]`);o&&(o.textContent=`${r} active task${r===1?``:`s`} remaining`);let s=this.querySelector(`[data-total-count]`);s&&(s.textContent=String(e.length))}renderFilterButtons(e){this.querySelectorAll(`.filter-btn`).forEach(t=>{let n=t.getAttribute(`data-filter`)===e;t.classList.toggle(`bg-white`,n),t.classList.toggle(`text-gray-900`,n),t.classList.toggle(`shadow-sm`,n),t.classList.toggle(`text-gray-500`,!n),t.classList.toggle(`hover:text-gray-900`,!n)})}renderTaskList(e){let t=this.querySelector(`#task-list`),n=this.querySelector(`#empty-state`),r=this.querySelector(`#task-item-template`);if(t&&r){if(t.innerHTML=``,e.length===0)n?.classList.remove(`hidden`);else{n?.classList.add(`hidden`);for(let n of e){let e=r.content.cloneNode(!0),i=e.querySelector(`.toggle-task`),a=e.querySelector(`.delete-task`),o=e.querySelector(`.checkbox`),s=e.querySelector(`.check-icon`),c=e.querySelector(`.task-text`);i.setAttribute(`data-id`,String(n.id)),a.setAttribute(`data-id`,String(n.id)),c.textContent=n.text,o.classList.toggle(`bg-green-500`,n.completed),o.classList.toggle(`border-green-500`,n.completed),o.classList.toggle(`text-white`,n.completed),o.classList.toggle(`border-gray-300`,!n.completed),o.classList.toggle(`group-hover:border-gray-400`,!n.completed),s.classList.toggle(`hidden`,!n.completed),c.classList.toggle(`line-through`,n.completed),c.classList.toggle(`text-gray-400`,n.completed),c.classList.toggle(`font-normal`,n.completed),c.classList.toggle(`text-gray-800`,!n.completed),t.appendChild(e)}}}}};customElements.get(a.tagName)||customElements.define(a.tagName,a);export{a as TodoPageComponent};