import{u as e}from"./index-mWtkDaPn.js";import{n as t,r as n,t as r}from"./health-RCxkCncK.js";import{a as i,t as a}from"./format-CJZsMI5O.js";var o=`<article class="card pulls">
  <header class="pulls-head">
    <h2>Pull requests</h2>
    <p>
      Who writes the changes: an AI agent's account, a person working with an
      agent (named in a commit trailer or the description), or a person alone.
      Last <span data-window>30</span> days.
    </p>
  </header>
  <p class="pulls-headline">
    <strong class="tabular" data-share>—</strong>
    <span data-share-text
      >of merged pull requests had an agent's hand in them</span
    >
  </p>
  <div class="segments" data-bar role="img"></div>
  <ul class="legend" data-legend></ul>
  <table class="pulls-table">
    <thead>
      <tr>
        <th scope="col">Written by</th>
        <th scope="col">Opened</th>
        <th scope="col">Merged</th>
        <th scope="col">Closed unmerged</th>
        <th scope="col">Merge rate</th>
        <th scope="col">Time to merge</th>
      </tr>
    </thead>
    <tbody data-rows></tbody>
  </table>
  <p class="pulls-note" data-agents></p>
  <p class="pulls-note">
    Agents working through a person's account without a trailer or signature are
    counted as people, so agent figures are a lower bound. Dependency and CI
    bots are left out.
  </p>
</article>
`,s=`:host {
  display: block;
}
:host .pulls {
  padding: 1.25rem;
}
@media (min-width: 640px) {
  :host .pulls {
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
:host .pulls-head p {
  margin-top: 0.25rem;
  max-width: 80ch;
  font-size: 0.8125rem;
  color: var(--ink-muted);
}
:host .pulls-headline {
  margin: 1.25rem 0 0.875rem;
  font-size: 0.9375rem;
  color: var(--ink-2);
}
:host .pulls-headline strong {
  margin-right: 0.375rem;
  font-size: 1.875rem;
  font-weight: 650;
  color: var(--ink);
}
:host .segments {
  display: flex;
  gap: 2px;
  height: 16px;
}
:host .segment {
  min-width: 3px;
  border-radius: 3px;
}
/* Assisted: the agents' colour with a hatch, so it reads apart without colour. */
:host .segment[data-origin='assisted'],
:host .swatch[data-origin='assisted'] {
  background: repeating-linear-gradient(
    135deg,
    var(--agents) 0 3px,
    var(--surface) 3px 5px
  ) !important;
}
:host .legend {
  list-style: none;
  margin: 0.75rem 0 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem 1.25rem;
  font-size: 0.8125rem;
  color: var(--ink-2);
}
:host .legend li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
:host .legend strong {
  color: var(--ink);
}
:host .swatch {
  width: 12px;
  height: 12px;
  border-radius: 3px;
}
:host .pulls-table {
  width: 100%;
  margin-top: 1.25rem;
  border-collapse: collapse;
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
}
:host .pulls-table th,
:host .pulls-table td {
  padding: 0.4rem 0.75rem;
  border-bottom: 1px solid var(--grid);
  text-align: right;
}
:host .pulls-table th:first-child,
:host .pulls-table td:first-child {
  text-align: left;
}
:host .pulls-table th {
  font-size: 0.75rem;
  font-weight: 600;
  color: var(--ink-muted);
}
:host .pulls-note {
  margin-top: 0.75rem;
  font-size: 0.8125rem;
  color: var(--ink-muted);
}
@media (max-width: 640px) {
  :host .pulls-table th:nth-child(4),
  :host .pulls-table td:nth-child(4) {
    display: none;
  }
}
`,c={agent:{label:`AI agent`,color:`var(--agents)`},assisted:{label:`Person with an agent`,color:`var(--agents)`},human:{label:`Person`,color:`var(--humans)`}},l=class extends e{static tagName=`pull-panel`;value=null;constructor(){super(o,s)}set pulls(e){this.value=e,this.isConnected&&this.draw()}get pulls(){return this.value}init(){this.draw()}draw(){let e=this.value;if(this.hidden=!e,!e)return;let o=(e,t)=>{this.querySelector(e).textContent=t};o(`[data-window]`,String(e.windowDays));let s=t(e);o(`[data-share]`,s===null?`—`:i(s)),o(`[data-share-text]`,s===null?`no pull requests merged in the last ${e.windowDays} days`:`of merged pull requests had an agent's hand in them`);let l=r.map(t=>({o:t,value:e.byOrigin[t].merged})),u=this.querySelector(`[data-bar]`);u.setAttribute(`aria-label`,`Merged pull requests by who wrote them: `+l.map(({o:e,value:t})=>`${c[e].label} ${t}`).join(`, `)),u.replaceChildren(...l.filter(({value:e})=>e>0).map(({o:e,value:t})=>{let n=document.createElement(`span`);return n.className=`segment`,n.dataset.origin=e,n.style.flex=`${t} 0 0`,n.style.background=c[e].color,n.title=`${c[e].label}: ${t} merged`,n})),this.querySelector(`[data-legend]`).replaceChildren(...l.map(({o:e,value:t})=>{let n=document.createElement(`li`),r=document.createElement(`span`);r.className=`swatch`,r.dataset.origin=e,r.style.background=c[e].color;let i=document.createElement(`strong`);return i.className=`tabular`,i.textContent=a(t),n.append(r,i,`${c[e].label}`),n})),this.querySelector(`[data-rows]`).replaceChildren(...r.map(t=>{let r=e.byOrigin[t],o=document.createElement(`tr`);o.dataset.origin=t;for(let e of[c[t].label,a(r.opened),a(r.merged),a(r.closedUnmerged),r.mergeRate===null?`—`:i(r.mergeRate),n(r.medianHoursToMerge)]){let t=document.createElement(`td`);t.textContent=e,o.append(t)}return o}));let d=Object.entries(e.agents).sort((e,t)=>t[1]-e[1]);o(`[data-agents]`,d.length?`Agents seen: ${d.map(([e,t])=>`${e} ${t}`).join(` · `)}.`:`No agent named in the last ${e.windowDays} days.`)}};customElements.get(l.tagName)||customElements.define(l.tagName,l);export{l as PullPanelComponent};