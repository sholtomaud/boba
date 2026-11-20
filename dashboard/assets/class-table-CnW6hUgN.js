import{u as e}from"./index-mWtkDaPn.js";import{i as t,t as n}from"./report-IYZEhpFM.js";import{i as r,t as i}from"./format-CJZsMI5O.js";var a=`<article class="card classes">
  <header class="panel-head">
    <h2>Issues by class</h2>
    <p>
      Each class has its own time limit. Figures for opened, closed and time to
      resolve cover the last <span data-window>30</span> days.
    </p>
  </header>
  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th scope="col">Class</th>
          <th scope="col">Open</th>
          <th scope="col">Past limit</th>
          <th scope="col">Oldest open</th>
          <th scope="col">Opened</th>
          <th scope="col">Closed</th>
          <th scope="col">By agents</th>
          <th scope="col">With a fix</th>
          <th scope="col">Time to resolve</th>
          <th scope="col">Resolved in limit</th>
        </tr>
      </thead>
      <tbody data-rows></tbody>
    </table>
  </div>
  <p class="panel-foot">
    Security issues are those labelled security or vulnerability, or that name a
    CVE or GHSA. Bugs come from labels and issue forms. "With a fix" counts
    closures that reference a commit, pull request or release.
  </p>
</article>
`,o=`:host {
  display: block;
}
:host .classes {
  padding: 1.25rem 1.5rem 1.25rem;
}
:host .table-wrap {
  overflow-x: auto;
  margin: 0 -0.25rem;
}
:host table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.875rem;
  font-variant-numeric: tabular-nums;
}
:host th,
:host td {
  padding: 0.625rem 0.5rem;
  text-align: right;
  border-bottom: 1px solid var(--grid);
  white-space: nowrap;
}
:host th:first-child,
:host td:first-child {
  text-align: left;
}
:host thead th {
  color: var(--ink-muted);
  font-weight: 600;
  font-size: 0.75rem;
}
:host tbody th {
  font-weight: 600;
}
:host td[data-tone='bad'] {
  color: var(--critical-ink);
  font-weight: 700;
}
:host td[data-tone='good'] {
  color: var(--good-ink);
}
:host .limit {
  display: block;
  color: var(--ink-muted);
  font-weight: 400;
  font-size: 0.75rem;
}
`,s={security:`Security`,bug:`Bugs`,other:`Features and other`},c=e=>e===null?`—`:`${r(e<10?e:Math.round(e))} d`,l=(e,t)=>t?`${Math.round(e/t*100)}%`:`—`,u=class extends e{static tagName=`class-table`;value=null;constructor(){super(a,o)}set classes(e){this.value=e,this.isConnected&&this.draw()}init(){this.draw()}draw(){let e=this.value;this.hidden=!e,e&&(this.querySelector(`[data-window]`).textContent=String(e.bug.windowDays),this.querySelector(`[data-rows]`).replaceChildren(...n.map(n=>{let r=e[n],a=document.createElement(`tr`);a.dataset.class=n;let o=document.createElement(`th`);o.scope=`row`,o.textContent=s[n];let u=document.createElement(`span`);u.className=`limit`,u.textContent=`${t(r.limitDays)} limit`,o.append(u),a.append(o);let d=[[i(r.open)],[i(r.overLimit),r.overLimit?`bad`:r.open?`good`:``],[c(r.oldestOpenDays)],[i(r.openedRecent)],[i(r.closedRecent)],[i(r.closedRecentByAgents)],[l(r.closedRecentWithFix,r.closedRecent)],[c(r.medianDaysToResolve)],[l(r.resolvedWithinLimit,r.resolvedRecent),r.resolvedRecent?r.resolvedWithinLimit/r.resolvedRecent>=.9?`good`:r.resolvedWithinLimit/r.resolvedRecent<.5?`bad`:``:``]];for(let[e,t]of d){let n=document.createElement(`td`);n.textContent=e,t&&(n.dataset.tone=t),a.append(n)}return a})))}};customElements.get(u.tagName)||customElements.define(u.tagName,u);export{u as ClassTableComponent};