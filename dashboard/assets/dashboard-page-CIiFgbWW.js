import{a as e,c as t,l as n,n as r,o as i,r as a,s as o,t as s,u as c}from"./index-mWtkDaPn.js";import{a as l,c as u,d,f,o as p,r as m,u as h}from"./metrics-DrWwOoaN.js";import{l as g,n as _,r as v}from"./format-CJZsMI5O.js";import{a as y,i as b}from"./health-RCxkCncK.js";import{a as x,c as S,l as C,o as w,r as T,s as E}from"./report-IYZEhpFM.js";import"./trend-chart-qhVCz3fM.js";import"./closure-evidence-3DaJ84HA.js";import"./pull-panel-CayxPrT9.js";import"./outlook-panel-tuTSd-H5.js";import"./class-table-CnW6hUgN.js";import"./delivery-panel-CYr6hT1S.js";import"./repo-profile-Uc9LW14W.js";import"./flight-deck-DYYvoaJ7.js";function D(e){if(!e.closures)return null;let t=Object.values(e.closures).reduce((e,t)=>e+t,0);return{total:t,byEvidence:e.closures,referencedShare:t>0?e.closures.fix_referenced/t:0}}function O(e,t=7,n){let[r=``,...i]=e.trim().split(/\r?\n/),a=r.split(`,`).map(e=>e.trim()),o=e=>a.indexOf(e),[s,c,u]=[`date`,`open`,`resolved`].map(o),p=o(`resolved_by_human`);if(s===-1||c===-1||u===-1||i.length===0)return null;let g=i.map(e=>{let t=e.split(`,`).map(e=>e.trim()),n=p===-1?0:Number(t[p])||0,r=Number(t[u])-n;return`${t[s]},${t[c]},${r},${n}`}),_=d(h([`date,open,agent_closed,human_closed`,...g].join(`
`))),v=_[_.length-1],y=f(_,t,n);return{date:v.date,open:v.open,resolved:v.totalClosed,points:_,velocity:y,ratio:l(y),loop:m(_,t,n)}}async function k(e,t=fetch,n=`data/agent_queue.csv`){try{let r=await t(n,{cache:`no-cache`});return r.ok?O(await r.text(),7,e):null}catch{return null}}var A=`<main class="page">
  <header class="hero">
    <div>
      <p class="eyebrow">
        Repository health ·
        <a
          data-tracked-link
          class="hero-link"
          target="_blank"
          rel="noopener noreferrer"
        ></a>
      </p>
      <h1 data-title>Repository health</h1>
      <p class="lede" data-lede>
        Issues and pull requests, who resolves them (AI agents or people), how
        fast changes are delivered, where the backlog is heading, and how to set
        the repository up to do better.
      </p>
    </div>
    <p class="as-of" data-as-of role="status">Loading the latest numbers…</p>
  </header>

  <nav class="jump" aria-label="Sections">
    <a href="#overview">Overview</a>
    <a href="#outlook">Outlook</a>
    <a href="#issues">Issues</a>
    <a href="#agents">Pull requests and agents</a>
    <a href="#delivery">Delivery</a>
    <a href="#codebase">Codebase</a>
    <a href="/audit" class="jump-audit">Audit →</a>
  </nav>

  <section id="overview" class="section" data-content aria-busy="true">
    <h2 class="sr-only">Overview</h2>
    <flight-deck></flight-deck>
    <article class="card attention">
      <header class="attention-head">
        <h3>What needs attention</h3>
        <a href="/audit" class="attention-link" data-audit-link
          >Full audit<span data-audit-score></span
        ></a>
      </header>
      <ul class="findings" data-findings>
        <li class="finding" data-tone="neutral">Loading…</li>
      </ul>
    </article>
  </section>

  <section id="outlook" class="section">
    <outlook-panel></outlook-panel>
  </section>

  <section id="issues" class="section">
    <header class="section-head">
      <h2>Issues</h2>
      <p>
        The backlog over time, the facts for each class, and how issues are
        closed.
      </p>
    </header>
    <article class="card panel">
      <header class="panel-head">
        <h3>Open and resolved over time</h3>
        <p>
          Open issues, and running totals resolved by AI agents and by people.
        </p>
      </header>
      <trend-chart data-trend="public"></trend-chart>
    </article>
    <class-table></class-table>
    <closure-evidence></closure-evidence>
  </section>

  <section id="agents" class="section">
    <header class="section-head">
      <h2>Pull requests and agents</h2>
      <p>
        Who writes the changes and resolves the issues: AI agents or people.
      </p>
    </header>
    <pull-panel hidden></pull-panel>
    <article class="card panel" data-queue-trend hidden>
      <header class="panel-head">
        <h3 data-queue-title>Agents' own queue</h3>
        <p>
          The agents' file-based issue queue: open issues and running totals
          resolved.
        </p>
      </header>
      <trend-chart data-trend="agents"></trend-chart>
    </article>
  </section>

  <section id="delivery" class="section">
    <delivery-panel hidden></delivery-panel>
  </section>

  <section id="codebase" class="section">
    <repo-profile hidden></repo-profile>
  </section>

  <footer class="foot">
    <a data-csv-link>Download data.csv</a>
    <a href="/methodology">How it is measured</a>
    <a data-project-link target="_blank" rel="noopener noreferrer"
      >Repo SRE Dashboard</a
    >
  </footer>
</main>
`,j=`:host {
  display: block;
}
:host .page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2.5rem 1rem 3rem;
  display: grid;
  gap: 1.5rem;
}
@media (min-width: 640px) {
  :host .page {
    padding: 3rem 1.5rem 4rem;
  }
}
/* Grid items may shrink below their content (tables, the section links). */
:host .page > *,
:host .section > * {
  min-width: 0;
}
:host .hero {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 1rem 2rem;
}
:host h1 {
  margin: 0.5rem 0 0.75rem;
  font-size: clamp(1.875rem, 4.5vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.1;
  overflow-wrap: anywhere;
}
:host .lede {
  margin: 0;
  max-width: 62ch;
  color: var(--ink-2);
  font-size: 1.0625rem;
  line-height: 1.55;
}
:host .hero-link {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 3px;
}
:host .as-of {
  margin: 0;
  color: var(--ink-muted);
  font-size: 0.875rem;
}
:host .as-of.error {
  color: var(--critical-ink);
}

/* Section links: scroll sideways on narrow screens rather than wrap. */
:host .jump {
  position: sticky;
  top: 3.75rem;
  z-index: 5;
  display: flex;
  gap: 0.25rem;
  overflow-x: auto;
  margin: 0 -0.25rem;
  padding: 0.375rem 0.25rem;
  background: var(--nav-bg);
  backdrop-filter: blur(8px);
  scrollbar-width: none;
}
:host .jump a {
  flex: none;
  padding: 0.375rem 0.75rem;
  border-radius: 999px;
  color: var(--ink-2);
  font-size: 0.875rem;
  font-weight: 600;
  text-decoration: none;
}
:host .jump a:hover {
  background: var(--surface-2);
  color: var(--ink);
}
:host .jump .jump-audit {
  margin-left: auto;
  color: var(--ink);
  border: 1px solid var(--border);
  background: var(--surface);
}

:host .section {
  display: grid;
  gap: 1rem;
  scroll-margin-top: 7rem;
}
:host .section-head h2 {
  margin: 0.75rem 0 0.25rem;
  font-size: 1.375rem;
  letter-spacing: -0.015em;
}
:host .section-head p {
  margin: 0;
  color: var(--ink-2);
}
:host .panel {
  padding: 1.25rem 1.5rem;
}

/* Tone: an icon and words carry the meaning; colour only reinforces it. */
:host .tone-icon {
  display: inline-grid;
  place-items: center;
  flex: none;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 800;
  color: #fff;
  background: var(--ink-muted);
}
:host [data-tone='good'] .tone-icon {
  background: var(--good);
}
:host [data-tone='warn'] .tone-icon {
  background: var(--warning);
  color: #0b0b0b;
}
:host [data-tone='bad'] .tone-icon {
  background: var(--critical);
}

/* What needs attention. */
:host .attention {
  padding: 1.125rem 1.5rem 1.25rem;
}
:host .attention-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0.5rem 1rem;
}
:host .attention-head h3 {
  margin: 0;
  font-size: 1.0625rem;
}
:host .attention-link {
  font-size: 0.875rem;
  font-weight: 650;
  color: inherit;
  text-underline-offset: 3px;
}
:host .findings {
  display: grid;
  gap: 0.5rem;
  margin: 0.875rem 0 0;
  padding: 0;
  list-style: none;
}
:host .finding {
  display: flex;
  align-items: flex-start;
  gap: 0.625rem;
  line-height: 1.45;
}
:host .finding .tone-icon {
  margin-top: 0.125rem;
}
:host .finding a {
  color: inherit;
  text-decoration: none;
}
:host .finding a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

:host .foot {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border);
  font-size: 0.875rem;
}
:host .foot a {
  color: var(--ink-2);
  text-underline-offset: 3px;
}
`,M={good:`✓`,warn:`!`,bad:`✕`,neutral:`·`},N=class extends c{static tagName=`dashboard-page`;config=null;constructor(){super(A,j)}async init(){let e=await a();this.config=e;let t=this.querySelector(`[data-tracked-link]`);t.href=e.repositoryUrl||e.issuesUrl,t.textContent=e.repository,this.querySelector(`[data-title]`).textContent=e.title,this.querySelector(`[data-csv-link]`).href=s,this.querySelector(`[data-project-link]`).href=r;let n=this.querySelector(`[data-as-of]`);try{this.render(await p())}catch(e){n.classList.add(`error`),n.textContent=`Could not load the data: ${e.message}`}}render(e){let t=e.status,n=t?.raw,r=t&&u(t);this.querySelector(`[data-as-of]`).textContent=t?`Data as of ${v(t.updatedAt)} · updated ${t.schedule.description}`+(r?` · next around ${g(r)}`:``):`Data as of ${_(e.latest.date)} (UTC)`;let i=C(n);i?.description&&(this.querySelector(`[data-lede]`).textContent=i.description);let a=E(n),o=w(n),s=S(n),c=x(n),l=b(n),d=y(n),f=D(e.latest);this.querySelector(`flight-deck`).show({snapshot:e,classes:a,ci:o,delivery:s,audit:c,pulls:l,responses:d,closures:f}),this.renderFindings(T({classes:a,ci:o,flowRatio:e.doomLoop.ratio,audit:c}));let p=this.querySelector(`[data-audit-score]`);p.textContent=c?.score==null?``:` · ${c.score}/100`,this.querySelector(`[data-trend="public"]`).points=e.history,this.querySelector(`class-table`).classes=a;let m=this.querySelector(`closure-evidence`);m.closures=f,m.issues=t?.issues,m.update(),this.querySelector(`pull-panel`).pulls=l,this.querySelector(`delivery-panel`).show(s,o),this.querySelector(`repo-profile`).profile=i,this.querySelector(`[data-content]`).setAttribute(`aria-busy`,`false`),this.renderAgentQueue(t?.updatedAt),window.setTimeout(()=>this.renderOutlook(t?.updatedAt),80)}renderFindings(e){let t=e.length?e.map(e=>{let t=document.createElement(`li`);t.className=`finding`,t.dataset.tone=e.tone;let n=document.createElement(`span`);n.className=`tone-icon`,n.setAttribute(`aria-hidden`,`true`),n.textContent=M[e.tone];let r=document.createElement(`a`);return r.href=e.href,r.textContent=e.text,t.append(n,r),t}):[Object.assign(document.createElement(`li`),{className:`finding`,textContent:`Nothing urgent: no issues past their limits, CI is green, and the audit has no open items.`})];this.querySelector(`[data-findings]`).replaceChildren(...t)}async renderAgentQueue(e){let t=this.querySelector(`[data-queue-trend]`);if(!this.config?.queue)return;let n=await k(e);if(t.hidden=!n,!n)return;this.querySelector(`[data-queue-title]`).textContent=this.config.queue.name;let r=this.querySelector(`[data-trend="agents"]`);r.labels={open:`Open issues`,agentClosed:`Resolved by AI agents`,humanClosed:`Resolved by people`,totalClosed:`Total resolved`},r.points=n.points}async renderOutlook(r){let a=this.querySelector(`outlook-panel`);try{let c=await fetch(s,{cache:`no-cache`}),l=c.ok?o(await c.text()):null;if(!l){a.unavailable(`The outlook appears after the next tracker run, which records each class of issue.`);return}let u=l.bug.points,d=u[u.length-1].date,f=await i(l,n,{limits:this.config?.limits,cost:this.config?.cost??null,asOf:r,seed:Number(d.replaceAll(`-`,``))});a.show(f,d,`pending`);let p=await e(t(l),n);a.show(f,d,p)}catch(e){console.warn(`Outlook unavailable:`,e),a.unavailable(`The outlook could not be run in this browser.`)}}};customElements.get(N.tagName)||customElements.define(N.tagName,N);export{N as DashboardPageComponent};