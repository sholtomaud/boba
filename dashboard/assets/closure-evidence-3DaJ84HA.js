import{u as e}from"./index-mWtkDaPn.js";import{n as t,t as n}from"./metrics-DrWwOoaN.js";import{t as r}from"./format-CJZsMI5O.js";var i=`<article class="card evidence">
  <header class="evidence-head">
    <h2>How issues were closed</h2>
    <p>
      What GitHub records about each closure. A referenced fix is a commit,
      release or merged change that the closure points to.
    </p>
  </header>
  <div data-body>
    <p class="evidence-empty" data-empty hidden>
      Closure details will appear after the next tracker run.
    </p>
    <section data-closures hidden>
      <p class="evidence-headline">
        <strong class="tabular" data-referenced></strong>
        <span data-referenced-text></span>
      </p>
      <div class="segments" data-evidence-bar role="img"></div>
      <ul class="legend" data-evidence-legend></ul>
    </section>
    <section class="kinds" data-kinds hidden>
      <h3>Open issues by type</h3>
      <div class="segments" data-kind-bar role="img"></div>
      <ul class="legend" data-kind-legend></ul>
      <p class="evidence-note" data-labelled></p>
    </section>
  </div>
</article>
`,a=`:host {
  display: block;
}
:host .evidence {
  padding: 1.25rem;
}
@media (min-width: 640px) {
  :host .evidence {
    padding: 1.5rem 1.75rem 1.75rem;
  }
}
:host h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}
:host h3 {
  margin: 0 0 0.75rem;
  font-size: 0.875rem;
  font-weight: 700;
}
:host p {
  margin: 0;
}
:host .evidence-head p {
  margin-top: 0.25rem;
  max-width: 78ch;
  font-size: 0.8125rem;
  color: var(--ink-muted);
}
:host [data-body] {
  display: grid;
  gap: 1.75rem;
  margin-top: 1.25rem;
}
@media (min-width: 900px) {
  :host [data-body] {
    grid-template-columns: 1.4fr 1fr;
    gap: 2.5rem;
    align-items: end;
  }
  :host .kinds {
    padding-left: 2.5rem;
    border-left: 1px solid var(--grid);
  }
}
:host .evidence-empty {
  color: var(--ink-muted);
  font-size: 0.9375rem;
}
:host .evidence-headline {
  margin-bottom: 0.875rem;
  font-size: 0.9375rem;
  color: var(--ink-2);
}
:host .evidence-headline strong {
  margin-right: 0.375rem;
  font-size: 1.875rem;
  font-weight: 650;
  letter-spacing: -0.02em;
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
:host .legend {
  list-style: none;
  margin: 0.875rem 0 0;
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
  font-weight: 600;
}
:host .swatch {
  width: 10px;
  height: 10px;
  border-radius: 3px;
}
:host .evidence-note {
  margin-top: 0.875rem;
  font-size: 0.8125rem;
  color: var(--ink-muted);
}
`,o={fix_referenced:{label:`Fix referenced`,color:`var(--series-1)`},no_reference:{label:`Closed without a referenced fix`,color:`var(--series-2)`},declined:{label:`Declined (not planned)`,color:`var(--series-3)`},withdrawn:{label:`Withdrawn by the reporter`,color:`var(--series-4)`},duplicate:{label:`Duplicate`,color:`var(--series-5)`}},s={behavior:{label:`Bug reports`,color:`var(--series-1)`},feature:{label:`Feature request`,color:`var(--series-2)`},other:{label:`Other`,color:`var(--series-3)`}},c=class extends e{static tagName=`closure-evidence`;closures=null;issues;constructor(){super(i,a)}update(){if(!this.isConnected)return;let e=(e,t)=>{this.querySelector(e).hidden=!t};if(e(`[data-empty]`,!this.closures&&!this.issues),e(`[data-closures]`,!!this.closures),e(`[data-kinds]`,!!this.issues),this.closures){let{total:e,byEvidence:t}=this.closures;this.querySelector(`[data-referenced]`).textContent=`${r(t.fix_referenced)} of ${r(e)}`,this.querySelector(`[data-referenced-text]`).textContent=`${e===1?`closure references`:`closures reference`} a fix`,this.segments(`evidence`,`Closed issues by how they were closed`,n.map(e=>({...o[e],value:t[e]})))}if(this.issues){let{open:e,openLabelled:n,openByKind:i}=this.issues;this.segments(`kind`,`Open issues by type`,t.map(e=>({...s[e],value:i[e]}))),this.querySelector(`[data-labelled]`).textContent=`${r(n)} of ${r(e)} open issues carry a label. Type is read from the issue form each was filed with.`}}init(){this.update()}segments(e,t,n){let i=n.reduce((e,t)=>e+t.value,0),a=this.querySelector(`[data-${e}-bar]`);a.setAttribute(`aria-label`,`${t}: `+n.map(e=>`${e.label} ${e.value}`).join(`, `)),a.replaceChildren(...n.filter(e=>e.value>0).map(e=>{let t=document.createElement(`span`);return t.className=`segment`,t.style.flex=`${e.value} 0 0`,t.style.background=e.color,t.title=`${e.label}: ${r(e.value)}`,t})),i===0&&(a.style.background=`var(--grid)`),this.querySelector(`[data-${e}-legend]`).replaceChildren(...n.map(e=>{let t=document.createElement(`li`),n=document.createElement(`span`);n.className=`swatch`,n.style.background=e.color;let i=document.createElement(`strong`);return i.className=`tabular`,i.textContent=r(e.value),t.append(n,i,e.label),t}))}};customElements.get(c.tagName)||customElements.define(c.tagName,c);export{c as ClosureEvidenceComponent};