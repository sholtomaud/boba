import{r as e,u as t}from"./index-mWtkDaPn.js";import{s as n}from"./metrics-DrWwOoaN.js";import{t as r}from"./dial-DWpH6hqP.js";import{a as i,d as a,n as o,u as s}from"./report-IYZEhpFM.js";var c=`<main class="page">
  <header class="hero">
    <p class="eyebrow">Best-practice audit · <span data-repo></span></p>
    <h1>Audit</h1>
    <p class="lede">
      How this repository is set up and run, checked against current best
      practice for security, delivery and working with AI agents. Each finding
      says what was found, why it matters, and gives a fix you can copy.
    </p>
  </header>

  <section class="card score" data-score-card aria-live="polite">
    <div class="readiness">
      <div class="dial-wrap" data-dial-wrap>
        <div class="dial-figure">
          <p class="score-value tabular" data-score>—</p>
          <p class="score-unit">out of 100</p>
        </div>
      </div>
      <div class="score-text">
        <p class="distance" data-distance hidden></p>
        <p class="zone">
          <span class="zone-name" data-zone></span>
          <span class="zone-autonomy" data-autonomy></span>
        </p>
        <p class="projected" data-projected hidden></p>
        <p class="score-line" data-score-line>Loading the audit…</p>
        <div class="score-bar" data-score-bar aria-hidden="true"></div>
        <ul class="counts" data-counts></ul>
      </div>
    </div>
    <ul class="group-dials" data-group-dials></ul>
    <p class="score-note">
      Distance from ideal: how far this repository is from being set up for AI
      agents to work in safely and for this dashboard to measure what they and
      people do. Weighted by impact: high-impact checks count three times as
      much as low-impact ones. The magenta mark is where the file fixes below
      would take it. Checks that need history wait until there is enough.
    </p>
  </section>

  <div class="filters" role="group" aria-label="Show">
    <button type="button" data-filter="todo" aria-pressed="true">To do</button>
    <button type="button" data-filter="all" aria-pressed="false">All</button>
    <button type="button" data-filter="pass" aria-pressed="false">
      Passing
    </button>
    <button type="button" data-filter="waiting" aria-pressed="false">
      Waiting for data
    </button>
  </div>

  <div class="groups" data-groups></div>
  <p class="empty" data-empty hidden>Nothing here.</p>
</main>
`,l=`:host {
  display: block;
}
:host .page {
  max-width: 980px;
  margin: 0 auto;
  padding: 2.5rem 1rem 4rem;
  display: grid;
  gap: 1.25rem;
}
/* Grid items may shrink below their content (tables, the section links). */
:host .page > * {
  min-width: 0;
}
:host h1 {
  margin: 0.5rem 0 0.75rem;
  font-size: clamp(2rem, 5vw, 2.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
}
:host .lede {
  margin: 0;
  max-width: 62ch;
  color: var(--ink-2);
  line-height: 1.55;
}
:host .score {
  display: grid;
  gap: 1.25rem;
  padding: 1.5rem;
}
:host .readiness {
  display: flex;
  flex-wrap: wrap;
  gap: 1.25rem 2rem;
  align-items: center;
}
:host .dial-wrap {
  position: relative;
  width: min(240px, 100%);
  flex: 0 0 auto;
}
:host .dial-figure {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
}
:host .score-value {
  margin: 0;
  font-size: 2.5rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
}
:host .score-unit {
  margin: 0.25rem 0 0;
  color: var(--ink-muted);
  font-size: 0.75rem;
}
:host .score-text {
  flex: 1 1 280px;
  display: grid;
  gap: 0.625rem;
}
:host .distance {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 750;
  letter-spacing: -0.02em;
}
:host .zone {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.625rem;
  align-items: baseline;
  margin: 0;
}
:host .zone-name {
  font-weight: 700;
  padding: 0.125rem 0.625rem;
  border-radius: 999px;
  background: var(--surface-2);
}
:host .zone-name[data-zone='not-ready'] {
  color: var(--critical-ink);
}
:host .zone-name[data-zone='ready'] {
  color: var(--good-ink);
}
:host .zone-autonomy,
:host .projected {
  margin: 0;
  color: var(--ink-2);
}
:host .group-dials {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
:host .group-dial {
  display: grid;
  justify-items: center;
  text-align: center;
  gap: 0.125rem;
}
:host .group-dial .dial {
  width: 96px;
}
:host .group-dial .dial-band,
:host .group-dial .dial-track {
  stroke-width: 14;
}
:host .group-dial-value {
  margin-top: -1.25rem;
  font-size: 1.25rem;
  font-weight: 750;
}
:host .group-dial-name {
  font-size: 0.8125rem;
  color: var(--ink-2);
}
:host .score-line {
  margin: 0;
  font-weight: 650;
  font-size: 1.0625rem;
}
:host .score-bar {
  display: flex;
  gap: 2px;
  height: 10px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--surface-2);
}
:host .score-bar span[data-status='pass'] {
  background: var(--good);
}
:host .score-bar span[data-status='improve'] {
  background: var(--warning);
}
:host .score-bar span[data-status='missing'] {
  background: var(--critical);
}
:host .score-bar span[data-status='waiting'] {
  background: var(--axis);
}
:host .counts {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem 1.25rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.875rem;
  color: var(--ink-2);
}
:host .score-note {
  margin: 0;
  font-size: 0.8125rem;
  color: var(--ink-muted);
}
:host .filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
:host .filters button {
  font: inherit;
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.375rem 0.875rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--ink-2);
  cursor: pointer;
}
:host .filters button[aria-pressed='true'] {
  background: var(--ink);
  border-color: var(--ink);
  color: var(--page);
}
:host .groups {
  display: grid;
  gap: 1.75rem;
}
:host .group h2 {
  margin: 0 0 0.75rem;
  font-size: 1.125rem;
}
:host .group-list {
  display: grid;
  gap: 0.75rem;
}
:host .check {
  padding: 1.125rem 1.25rem;
  scroll-margin-top: 5rem;
}
:host .check:target {
  outline: 2px solid var(--series-1);
  outline-offset: 2px;
}
:host .check-head {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 0.75rem;
  align-items: center;
}
:host .check h3 {
  margin: 0;
  font-size: 1rem;
  flex: 1 1 240px;
}
:host .badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.1875rem 0.5rem;
  border-radius: 999px;
  border: 1px solid var(--border);
  white-space: nowrap;
}
:host .badge-icon {
  display: inline-grid;
  place-items: center;
  width: 1rem;
  height: 1rem;
  border-radius: 999px;
  font-size: 0.625rem;
  color: #fff;
}
:host .badge[data-status='pass'] .badge-icon {
  background: var(--good);
}
:host .badge[data-status='improve'] .badge-icon {
  background: var(--warning);
  color: #0b0b0b;
}
:host .badge[data-status='missing'] .badge-icon {
  background: var(--critical);
}
:host .badge[data-status='waiting'] .badge-icon {
  background: var(--ink-muted);
}
:host .impact {
  font-size: 0.75rem;
  color: var(--ink-muted);
  white-space: nowrap;
}
:host .check p {
  margin: 0.5rem 0 0;
  line-height: 1.5;
  font-size: 0.9375rem;
}
:host .evidence {
  color: var(--ink-2);
}
:host .why {
  color: var(--ink-2);
}
:host .why strong,
:host .todo strong {
  color: var(--ink);
}
:host .fix {
  margin-top: 0.75rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface-2);
  overflow: hidden;
}
:host .fix-summary {
  padding: 0.5rem 0.875rem;
  font-size: 0.875rem;
  font-weight: 650;
  cursor: pointer;
}
:host .fix[open] .fix-summary {
  border-bottom: 1px solid var(--border);
}
:host .fix-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.375rem 0.5rem 0.375rem 0.875rem;
  border-bottom: 1px solid var(--border);
  font-size: 0.8125rem;
  font-weight: 600;
  color: var(--ink-2);
}
:host .fix-head code {
  font-size: 0.8125rem;
  overflow-wrap: anywhere;
}
:host .copy {
  font: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 0.625rem;
  border-radius: 6px;
  border: 1px solid var(--border);
  background: var(--surface);
  color: var(--ink);
  cursor: pointer;
}
:host pre {
  margin: 0;
  padding: 0.75rem 0.875rem;
  overflow-x: auto;
  font-size: 0.8125rem;
  line-height: 1.5;
}
:host .docs {
  font-size: 0.875rem;
}
:host .docs a {
  color: inherit;
  text-underline-offset: 3px;
}
:host .empty {
  color: var(--ink-muted);
}
`,u={pass:{icon:`✓`,label:`Passing`},improve:{icon:`!`,label:`Could improve`},missing:{icon:`✕`,label:`Missing`},waiting:{icon:`…`,label:`Waiting for data`}},d=o.map((e,t)=>({from:e.from,to:o[t+1]?.from??100,colour:[`var(--critical)`,`var(--warning)`,`var(--good)`][t]})),f={high:`High impact`,medium:`Medium impact`,low:`Low impact`},p=class extends t{static tagName=`audit-page`;audit=null;filter=`todo`;constructor(){super(c,l)}async init(){this.delegate(`click`,`[data-filter]`,(e,t)=>{this.filter=t.dataset.filter,this.querySelectorAll(`[data-filter]`).forEach(e=>e.setAttribute(`aria-pressed`,String(e===t))),this.drawChecks()}),this.delegate(`click`,`[data-copy]`,(e,t)=>{let n=t.closest(`.fix`)?.querySelector(`code.fix-code`);n&&navigator.clipboard?.writeText(n.textContent??``).then(()=>{t.textContent=`Copied`,window.setTimeout(()=>t.textContent=`Copy`,1600)},()=>t.textContent=`Select and copy`)});let[t,r]=await Promise.all([e(),n()]);this.querySelector(`[data-repo]`).textContent=t.repository,this.audit=i(r?.raw),this.drawScore();let a=decodeURIComponent(location.hash.slice(1));if(a&&this.audit?.checks.some(e=>e.id===a)&&(this.filter=`all`,this.querySelectorAll(`[data-filter]`).forEach(e=>e.setAttribute(`aria-pressed`,String(e.dataset.filter===`all`)))),this.drawChecks(),a){let e=this.querySelector(`[id="${CSS.escape(a)}"]`),t=e?.querySelector(`details.fix`);t&&(t.open=!0),e?.scrollIntoView()}}drawScore(){let e=this.audit,t=(e,t)=>{this.querySelector(e).textContent=t};if(!e){t(`[data-score-line]`,`The audit appears after the next run of the dashboard workflow.`);return}t(`[data-score]`,e.score===null?`—`:String(e.score)),this.drawReadiness();let n=t=>e.checks.filter(e=>e.status===t).length,r=s(e.checks).length;t(`[data-score-line]`,`${e.passed} of ${e.judged} checks pass`+(r?` · ${r} to do`:``)+(e.waiting?` · ${e.waiting} waiting for data`:``));let i=[`pass`,`improve`,`missing`,`waiting`];this.querySelector(`[data-score-bar]`).replaceChildren(...i.flatMap(e=>n(e)?[Object.assign(document.createElement(`span`),{style:`flex: ${n(e)} 0 0`})].map(t=>(t.dataset.status=e,t)):[])),this.querySelector(`[data-counts]`).replaceChildren(...i.map(e=>{let t=document.createElement(`li`);return t.textContent=`${u[e].icon} ${n(e)} ${u[e].label.toLowerCase()}`,t}))}drawReadiness(){let e=a(this.audit),t=this.querySelector(`[data-dial-wrap]`);if(t.querySelector(`svg`)?.remove(),!e)return;let n=e.fileFixes.length,i=`${n} file ${n===1?`fix`:`fixes`}`,o=e.projected>e.score?` The ${i} would take it to ${e.projected}.`:``,s=r({value:e.score,bands:d,target:e.projected,ticks:[0,25,50,75,100],label:`Readiness ${e.score} out of 100, ${e.distance} points from ideal: ${e.zone.label.toLowerCase()}.${o}`});s.dataset.dial=``,t.prepend(s);let c=this.querySelector(`[data-distance]`);c.hidden=!1,c.textContent=e.distance?`${e.distance} points from ideal`:`At the ideal`;let l=this.querySelector(`[data-zone]`);l.textContent=e.zone.label,l.dataset.zone=e.zone.id,this.querySelector(`[data-autonomy]`).textContent=e.zone.autonomy;let u=this.querySelector(`[data-projected]`);u.hidden=!o,u.textContent=o?`Adding the ${i}, in one pull request, would take it to ${e.projected}.`:``,this.querySelector(`[data-group-dials]`).replaceChildren(...e.groups.map(e=>{let t=document.createElement(`li`);t.className=`group-dial`;let n=e.score===null?`${e.group}: waiting for data`:`${e.group}: ${e.score} out of 100, ${e.passed} of ${e.judged} checks pass`,i=r({value:e.score,bands:d,label:n});i.dataset.groupDial=``;let a=document.createElement(`span`);a.className=`group-dial-value tabular`,a.textContent=e.score===null?`—`:String(e.score),a.setAttribute(`aria-hidden`,`true`);let o=document.createElement(`span`);return o.className=`group-dial-name`,o.textContent=e.group,o.setAttribute(`aria-hidden`,`true`),t.append(i,a,o),t}))}drawChecks(){let e=(this.audit?.checks??[]).filter(e=>this.filter===`all`?!0:this.filter===`todo`?e.status===`missing`||e.status===`improve`:e.status===this.filter),t=this.filter===`todo`?s(e):e,n=[...new Set(t.map(e=>e.group))];this.querySelector(`[data-empty]`).hidden=t.length>0||!this.audit,this.querySelector(`[data-groups]`).replaceChildren(...n.map(e=>{let n=document.createElement(`section`);n.className=`group`;let r=document.createElement(`h2`);r.textContent=e;let i=document.createElement(`div`);return i.className=`group-list`,i.append(...t.filter(t=>t.group===e).map(e=>this.card(e))),n.append(r,i),n}))}card(e){let t=(e,t=``,n=``)=>{let r=document.createElement(e);return t&&(r.className=t),n&&(r.textContent=n),r},n=t(`article`,`card check`);n.id=e.id,n.dataset.status=e.status;let r=t(`header`,`check-head`),i=t(`span`,`badge`);i.dataset.status=e.status;let a=t(`span`,`badge-icon`,u[e.status].icon);if(a.setAttribute(`aria-hidden`,`true`),i.append(a,u[e.status].label),r.append(t(`h3`,``,e.title),i,t(`span`,`impact`,f[e.impact])),n.append(r,t(`p`,`evidence`,e.evidence)),e.why){let r=t(`p`,`why`);r.append(t(`strong`,``,`Why it matters: `),e.why),n.append(r)}if(e.recommendation){let r=t(`p`,`todo`);r.append(t(`strong`,``,`What to do: `),e.recommendation),n.append(r)}for(let r of e.fixes){let e=t(`details`,`fix`),i=t(`summary`,`fix-summary`);i.append(r.path?`Show the fix: add ${r.path}`:r.language===`shell`?`Show the command`:`Show the snippet`);let a=t(`div`,`fix-head`),o=t(`span`);r.path?o.append(`Add `,t(`code`,``,r.path)):o.textContent=r.language===`shell`?`Run`:`Add to the workflow`;let s=t(`button`,`copy`,`Copy`);s.type=`button`,s.dataset.copy=``,s.setAttribute(`aria-label`,`Copy ${r.path||(r.language===`shell`?`the command`:`the snippet`)}`),a.append(o,s);let c=t(`pre`),l=t(`code`,`fix-code`,r.content);l.dataset.language=r.language,c.append(l),e.append(i,a,c),n.append(e)}if(e.docs){let r=t(`p`,`docs`),i=t(`a`,``,`Documentation`);i.href=e.docs,i.target=`_blank`,i.rel=`noopener noreferrer`,r.append(i),n.append(r)}return n}};customElements.get(p.tagName)||customElements.define(p.tagName,p);export{p as AuditPageComponent,u as STATUS_LABEL};