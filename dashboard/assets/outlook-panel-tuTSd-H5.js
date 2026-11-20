import{i as e,u as t}from"./index-mWtkDaPn.js";import{n,o as r,t as i}from"./format-CJZsMI5O.js";import{r as a}from"./svg-BJXHUiNH.js";var o=`<article class="card outlook" data-outlook>
  <header class="outlook-head">
    <div>
      <h2>Project outlook</h2>
      <p>
        Will this repository stay manageable? Each class of issue has a limit on
        how long a new issue may wait. Simulated with GSSK from the last week's
        rates.
      </p>
    </div>
  </header>
  <p class="outlook-pending" data-pending>Running the simulation…</p>
  <div class="outlook-body" data-body hidden>
    <section class="outlook-index">
      <p class="index-label">Manageability index</p>
      <p class="index-value tabular" data-index></p>
      <p class="index-text" data-index-text></p>
      <p class="index-state" data-state>
        <span class="state-icon" data-state-icon aria-hidden="true"></span>
        <span data-state-label></span>
      </p>
    </section>
    <dl class="outlook-cards">
      <div class="outlook-card">
        <dt>Loses control</dt>
        <dd class="card-value" data-doom-all></dd>
        <dd class="card-note" data-doom-all-note></dd>
        <dd class="card-curve" data-curve-all></dd>
      </div>
      <div class="outlook-card">
        <dt>With humans alone</dt>
        <dd class="card-value" data-doom-humans></dd>
        <dd class="card-note" data-doom-humans-note></dd>
        <dd class="card-curve" data-curve-humans></dd>
      </div>
      <div class="outlook-card">
        <dt>Backlog cleared</dt>
        <dd class="card-value" data-completion></dd>
        <dd class="card-note" data-completion-note></dd>
      </div>
      <div class="outlook-card">
        <dt>Agents</dt>
        <dd class="card-value" data-agents></dd>
        <dd class="card-note" data-agents-note></dd>
      </div>
    </dl>
    <table class="outlook-classes">
      <caption>
        Each class now
      </caption>
      <thead>
        <tr>
          <th scope="col">Class</th>
          <th scope="col">Open</th>
          <th scope="col">Resolved a day</th>
          <th scope="col">Expected wait</th>
          <th scope="col">Limit</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody data-classes></tbody>
    </table>
    <p class="outlook-line" data-cost></p>
    <p class="outlook-line" data-reliability></p>
  </div>
</article>
`,s=`:host {
  display: block;
}
:host .outlook {
  padding: 1.25rem;
}
@media (min-width: 640px) {
  :host .outlook {
    padding: 1.5rem 1.75rem 1.75rem;
  }
}
:host h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}
:host p {
  margin: 0;
}
:host .outlook-head p {
  margin-top: 0.25rem;
  max-width: 80ch;
  font-size: 0.8125rem;
  color: var(--ink-muted);
}
:host .outlook-pending {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: var(--ink-muted);
}
:host .outlook-body {
  display: grid;
  gap: 1.5rem;
  margin-top: 1.25rem;
}
:host .outlook-body[hidden] {
  display: none;
}
@media (min-width: 960px) {
  :host .outlook-body {
    grid-template-columns: 15rem 1fr;
    column-gap: 2rem;
  }
  :host .outlook-classes,
  :host .outlook-line {
    grid-column: 1 / -1;
  }
}
:host .index-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-2);
}
:host .index-value {
  margin-top: 0.25rem !important;
  font-size: 3.5rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  line-height: 1;
}
:host .index-text {
  margin-top: 0.375rem !important;
  font-size: 0.875rem;
  color: var(--ink-2);
}
:host .index-state {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.75rem !important;
  padding: 0.3rem 0.75rem 0.3rem 0.4rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 700;
}
:host .state-icon {
  display: inline-grid;
  place-items: center;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 999px;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 800;
}
:host [data-state='secure'] .state-icon {
  background: var(--good);
}
:host [data-state='holding'] .state-icon {
  background: var(--warning);
  color: #0b0b0b;
}
:host [data-state='risk'] .state-icon {
  background: var(--serious);
}
:host [data-state='lost'] .state-icon {
  background: var(--critical);
}
:host .outlook-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(12rem, 100%), 1fr));
  gap: 1rem;
  margin: 0;
}
:host .outlook-card {
  display: grid;
  grid-row: span 4;
  grid-template-rows: subgrid;
  row-gap: 0;
  align-items: start;
  padding: 0.875rem 1rem;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--surface-2);
}
:host .outlook-card dt {
  font-size: 0.8125rem;
  color: var(--ink-2);
}
:host .outlook-card dd {
  margin: 0;
}
:host .card-value {
  margin-top: 0.25rem !important;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.2;
}
:host .card-note {
  margin-top: 0.25rem !important;
  font-size: 0.8125rem;
  color: var(--ink-muted);
}
:host .card-curve svg {
  display: block;
  width: 100%;
  height: 28px;
  margin-top: 0.5rem;
}
:host .outlook-classes {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
}
:host .outlook-classes caption {
  margin-bottom: 0.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  text-align: left;
}
:host .outlook-classes th,
:host .outlook-classes td {
  padding: 0.4rem 0.75rem;
  border-bottom: 1px solid var(--grid);
  text-align: right;
}
:host .outlook-classes th:first-child,
:host .outlook-classes td:first-child,
:host .outlook-classes th:last-child,
:host .outlook-classes td:last-child {
  text-align: left;
}
:host .outlook-classes th {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--ink-muted);
}
:host .class-status[data-status='over'] {
  color: var(--critical-ink);
  font-weight: 700;
}
:host .class-status[data-status='within'] {
  color: var(--good-ink);
  font-weight: 600;
}
:host .class-status[data-status='unjudged'] {
  color: var(--ink-muted);
}
:host .outlook-line {
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--ink-2);
}
@media (max-width: 640px) {
  :host .outlook-classes th:nth-child(3),
  :host .outlook-classes td:nth-child(3) {
    display: none;
  }
}
`,c={security:`Security`,bug:`Bugs`,other:`Features and other`},l={secure:{icon:`✓`,label:`In control`},holding:{icon:`!`,label:`Holding, with risk`},risk:{icon:`!`,label:`Likely to lose control`},lost:{icon:`✕`,label:`Control already lost`}},u=e=>`${Math.round(e*100)}%`,d=e=>Number.isFinite(e)?e<1?`${Math.round(e*24)} h`:`${Number.isInteger(e)?e:r(e)} ${e===1?`day`:`days`}`:`never`,f=class extends t{static tagName=`outlook-panel`;constructor(){super(o,s)}unavailable(e){this.isConnected&&(this.querySelector(`[data-pending]`).textContent=e)}show(t,a,o){if(!this.isConnected)return;let s=e=>n(new Date(Date.parse(a)+e*864e5).toISOString().slice(0,10)),f=(e,t)=>{this.querySelector(e).textContent=t};this.querySelector(`[data-pending]`).hidden=!0,this.querySelector(`[data-body]`).hidden=!1;let h=s(t.horizonDay);f(`[data-index]`,u(t.index)),f(`[data-index-text]`,`chance of staying manageable to ${h}, where the forecast stops being better than a guess`);let g=t.doom.all.day===0?`lost`:t.index>=.9?`secure`:t.index>=.5?`holding`:`risk`;this.querySelector(`[data-state]`).dataset.state=g,f(`[data-state-icon]`,l[g].icon),f(`[data-state-label]`,l[g].label);let _=(e,n)=>{let r=t.doom[e];f(`[data-doom-${e}]`,r.day===0?`Now`:r.day===null?`Not by ${h}`:s(r.day)),f(`[data-doom-${e}-note]`,r.day===0?`a class is already past its limit ${n}`:r.day===null?`${u(r.byHorizon)} chance by then ${n}`:`50% chance by then ${n}; ${u(r.byHorizon)} by ${h}`),this.curve(`[data-curve-${e}]`,r.day===0?[]:r.curve)};_(`all`,`with agents and humans`),_(`humans`,`with people alone`);let v=t.completion;f(`[data-completion]`,v.state===`diverging`?`Diverging`:v.state===`beyond`?`Not within ${v.days} days`:s(v.p50)),f(`[data-completion-note]`,v.state===`diverging`?`issues arrive at least as fast as they are resolved, so there is no completion date`:v.state===`beyond`?`fewer than half the simulations clear it`:v.p85===null?`50% chance by then`:`50% chance by then; 85% by ${s(v.p85)}`);let y=t.agents;f(`[data-agents]`,{benefit:`A benefit`,burden:`A burden`,neutral:`No clear effect`,none:`No agent activity`}[y.verdict]),f(`[data-agents-note]`,y.verdict===`none`?`no issues filed or resolved by agents in the last week`:`chance of losing control by ${h}: ${u(y.withAgents)} with agents, ${u(y.withoutAgents)} without; median backlog ${i(y.openWith)} with, ${i(y.openWithout)} without`),this.querySelector(`[data-classes]`).replaceChildren(...e.map(e=>{let n=t.now[e],a=t.judged.includes(e),o=document.createElement(`tr`),s=a?n.over?`over`:`within`:`unjudged`,l=[c[e],i(Math.max(0,n.open)),r(n.resolvedPerDay),a?d(n.waitDays):`—`,d(n.limitDays),s===`unjudged`?`No issues yet`:s===`over`?`✕ Over limit`:`✓ Within limit`];return l.forEach((e,t)=>{let n=document.createElement(`td`);n.textContent=e,t===l.length-1&&(n.className=`class-status`,n.dataset.status=s),o.append(n)}),o.dataset.class=e,o}));let b=t.cost;f(`[data-cost]`,b?`Cost: about ${m(b.monthlySpendNow,b.currency)} a month at today's resolution rate; keeping pace with new issues would take ${m(b.monthlyToKeepPace,b.currency)} a month.`+p(t,`human`,h,s)+p(t,`agentic`,h,s):`Cost: set the agent-cost-per-issue and human-hourly-rate inputs to see what resolving issues costs, and when it would outrun a budget.`),f(`[data-reliability]`,o===`pending`?`Reliability: checking past forecasts…`:o?`Reliability: ${o.inside} of ${o.checked} past 7-day forecasts of the backlog landed inside their 90% range (${u(o.inside/o.checked)}).`:`Reliability: needs at least two weeks of history to check past forecasts.`)}curve(e,t){let n=this.querySelector(e);if(t.length<2){n.replaceChildren();return}let r=a(`svg`,{viewBox:`0 0 100 28`,preserveAspectRatio:`none`,"aria-hidden":`true`}),i=e=>e/(t.length-1)*100,o=e=>26-e*24;a(`line`,{x1:0,x2:100,y1:o(.5),y2:o(.5),stroke:`var(--axis)`,"stroke-width":1,"vector-effect":`non-scaling-stroke`,"stroke-dasharray":`2 2`},r),a(`path`,{d:t.map((e,t)=>`${t?`L`:`M`} ${i(t)} ${o(e)}`).join(` `),fill:`none`,stroke:`var(--critical)`,"stroke-width":2,"vector-effect":`non-scaling-stroke`},r),n.replaceChildren(r)}};function p(e,t,n,r){let i=t===`human`?`People's`:`Agents'`,a=t===`human`?`monthly-human-budget`:`monthly-agentic-budget`,o=e.doom.cost?.[t]??null;return o?o.day===null?` ${i} budget holds to ${n} (${u(o.byHorizon)} chance of exceeding it).`:` Keeping pace is likely to exceed ${i.toLowerCase()} budget by ${r(o.day)}.`:` Set ${a} to forecast when ${i.toLowerCase()} budget would be exceeded.`}function m(e,t){try{return new Intl.NumberFormat(`en-US`,{style:`currency`,currency:t,maximumFractionDigits:0}).format(e)}catch{return`${i(e)} ${t}`}}customElements.get(f.tagName)||customElements.define(f.tagName,f);export{f as OutlookPanelComponent};