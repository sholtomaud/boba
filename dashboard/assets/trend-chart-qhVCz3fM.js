import{u as e}from"./index-mWtkDaPn.js";import{l as t}from"./metrics-DrWwOoaN.js";import{n,t as r}from"./format-CJZsMI5O.js";import{r as i}from"./svg-BJXHUiNH.js";var a=`<figure class="trend">
  <ul class="trend-legend" data-legend aria-label="Series"></ul>
  <div class="trend-plot" data-plot>
    <div class="trend-tooltip" data-tooltip hidden></div>
  </div>
  <details class="trend-table">
    <summary>View as table</summary>
    <div class="trend-table-scroll">
      <table>
        <thead>
          <tr>
            <th scope="col">Date (UTC)</th>
            <th scope="col">Open</th>
            <th scope="col">Closed by AI agent</th>
            <th scope="col">Closed by human</th>
            <th scope="col">Total closed</th>
            <th scope="col">Hours to midnight</th>
          </tr>
        </thead>
        <tbody data-rows></tbody>
      </table>
    </div>
  </details>
</figure>
`,o=`:host {
  display: block;
}
:host .trend {
  margin: 0;
}
:host .trend-legend {
  list-style: none;
  margin: 0 0 0.75rem;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem 0.5rem;
}
:host .trend-legend button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.625rem;
  border: 1px solid var(--border);
  border-radius: 999px;
  background: transparent;
  color: var(--ink-2);
  font: inherit;
  font-size: 0.8125rem;
  cursor: pointer;
  transition:
    background 0.15s,
    opacity 0.15s;
}
:host .trend-legend button:hover {
  background: var(--surface-2);
}
:host .trend-legend button[aria-pressed='false'] {
  opacity: 0.45;
}
:host .trend-legend button[aria-pressed='false'] .key {
  background: var(--axis) !important;
}
:host .key {
  display: inline-block;
  width: 14px;
  height: 3px;
  border-radius: 2px;
}
:host .trend-plot {
  position: relative;
  height: 320px;
  touch-action: pan-y;
}
:host .trend-plot svg {
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
}
:host .trend-tooltip {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 180px;
  padding: 0.625rem 0.75rem;
  border: 1px solid var(--border);
  border-radius: 10px;
  background: var(--surface);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.14);
  font-size: 0.8125rem;
  pointer-events: none;
  z-index: 2;
}
:host .trend-tooltip .tip-date {
  margin-bottom: 0.375rem;
  color: var(--ink-muted);
  font-weight: 600;
}
:host .trend-tooltip .tip-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--ink-2);
}
:host .trend-tooltip .tip-row strong {
  min-width: 3ch;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}
:host .trend-table {
  margin-top: 1rem;
  font-size: 0.8125rem;
}
:host .trend-table summary {
  cursor: pointer;
  color: var(--ink-2);
  font-weight: 600;
  width: fit-content;
}
:host .trend-table-scroll {
  margin-top: 0.75rem;
  max-height: 320px;
  overflow: auto;
}
:host table {
  width: 100%;
  border-collapse: collapse;
  font-variant-numeric: tabular-nums;
}
:host th,
:host td {
  padding: 0.375rem 0.75rem;
  border-bottom: 1px solid var(--grid);
  text-align: right;
  white-space: nowrap;
}
:host th:first-child,
:host td:first-child {
  text-align: left;
}
:host th {
  position: sticky;
  top: 0;
  background: var(--surface);
  color: var(--ink-muted);
  font-weight: 600;
}
`,s=[{key:`open`,label:`Open issues`,color:`var(--series-1)`},{key:`agentClosed`,label:`Closed by AI agent`,color:`var(--series-2)`},{key:`humanClosed`,label:`Closed by human`,color:`var(--series-3)`},{key:`totalClosed`,label:`Total closed`,color:`var(--series-4)`}],c={top:12,right:16,bottom:32,left:44},l=864e5,u=class extends e{static tagName=`trend-chart`;data=[];names={};hiddenSeries=new Set;resize;constructor(){super(a,o)}set points(e){this.data=e,this.isConnected&&this.update()}get points(){return this.data}set labels(e){this.names=e,this.isConnected&&this.renderLegend()}label(e){return this.names[e.key]??e.label}init(){this.renderLegend(),this.delegate(`click`,`[data-series]`,(e,t)=>{let n=t.dataset.series;this.hiddenSeries.has(n)?this.hiddenSeries.delete(n):this.hiddenSeries.size<s.length-1&&this.hiddenSeries.add(n),this.renderLegend(),this.draw()});let e=this.querySelector(`[data-plot]`);this.resize=new ResizeObserver(()=>this.draw()),this.resize.observe(e),this.data.length&&this.update()}disconnectedCallback(){this.resize?.disconnect()}update(){this.draw(),this.renderTable()}renderLegend(){this.querySelector(`[data-legend]`).replaceChildren(...s.map(e=>{let t=document.createElement(`li`),n=document.createElement(`button`);n.type=`button`,n.dataset.series=e.key,n.setAttribute(`aria-pressed`,String(!this.hiddenSeries.has(e.key)));let r=document.createElement(`span`);return r.className=`key`,r.style.background=e.color,n.append(r,this.label(e)),t.append(n),t}))}renderTable(){let e=this.querySelectorAll(`thead th`);s.forEach((t,n)=>{e[n+1].textContent=this.label(t)}),this.querySelector(`[data-rows]`).replaceChildren(...[...this.data].reverse().map(e=>{let t=document.createElement(`tr`);for(let n of[e.date,r(e.open),r(e.agentClosed),r(e.humanClosed),r(e.totalClosed),e.hoursToMidnight.toFixed(1)]){let e=document.createElement(`td`);e.textContent=n,t.append(e)}return t}))}draw(){let e=this.querySelector(`[data-plot]`),a=this.querySelector(`[data-tooltip]`);if(!e||!a||this.data.length===0)return;let o=e.clientWidth,u=e.clientHeight;if(o===0)return;let d=o-c.left-c.right,f=u-c.top-c.bottom,p=s.filter(e=>!this.hiddenSeries.has(e.key)),m=this.data.map(e=>Date.parse(e.date)),h=m[0]-(m.length===1?l:0),g=m[m.length-1]+(m.length===1?l:0),_=t(Math.max(1,...this.data.flatMap(e=>p.map(t=>e[t.key])))),v=e=>c.left+(e-h)/(g-h)*d,y=e=>c.top+f-e/_*f,b=i(`svg`,{viewBox:`0 0 ${o} ${u}`,role:`img`,"aria-label":`Issue counts from ${n(this.data[0].date)} to ${n(this.data[this.data.length-1].date)}. The table below lists every value.`});for(let e=0;e<=4;e++){let t=_/4*e,n=y(t);i(`line`,{x1:c.left,x2:o-c.right,y1:n,y2:n,stroke:e===0?`var(--axis)`:`var(--grid)`,"stroke-width":1,"shape-rendering":`crispEdges`},b);let a=i(`text`,{x:c.left-10,y:n,"text-anchor":`end`,"dominant-baseline":`central`,fill:`var(--ink-muted)`,"font-size":11,class:`tabular`},b);a.textContent=r(t)}let x=Math.max(2,Math.floor(d/80)),S=Math.max(1,Math.ceil(this.data.length/x));this.data.forEach((e,t)=>{let r=t===this.data.length-1;if(t%S!==0&&!r||!r&&v(m[m.length-1])-v(m[t])<64)return;let a=i(`text`,{x:v(m[t]),y:u-8,"text-anchor":this.data.length===1?`middle`:t===0?`start`:r?`end`:`middle`,fill:`var(--ink-muted)`,"font-size":11},b);a.textContent=n(e.date,!1)});for(let e of p){let t=this.data.map((t,n)=>`${n?`L`:`M`} ${v(m[n])} ${y(t[e.key])}`).join(` `);i(`path`,{d:t,fill:`none`,stroke:e.color,"stroke-width":2,"stroke-linejoin":`round`,"stroke-linecap":`round`},b)}for(let e of p){let t=this.data[this.data.length-1];i(`circle`,{cx:v(m[m.length-1]),cy:y(t[e.key]),r:4,fill:e.color,stroke:`var(--surface)`,"stroke-width":2},b)}let C=i(`g`,{visibility:`hidden`},b),w=i(`line`,{y1:c.top,y2:c.top+f,stroke:`var(--ink-muted)`,"stroke-width":1,"shape-rendering":`crispEdges`},C),T=p.map(e=>i(`circle`,{r:4,fill:e.color,stroke:`var(--surface)`,"stroke-width":2},C)),E=i(`rect`,{x:c.left,y:c.top,width:d,height:f,fill:`transparent`,tabindex:0,"aria-label":`Chart values. Use the arrow keys to move between days.`},b),D=this.data.length-1,O=e=>{D=Math.max(0,Math.min(this.data.length-1,e));let t=this.data[D],n=v(m[D]);w.setAttribute(`x1`,String(n)),w.setAttribute(`x2`,String(n)),p.forEach((e,r)=>{T[r].setAttribute(`cx`,String(n)),T[r].setAttribute(`cy`,String(y(t[e.key])))}),C.setAttribute(`visibility`,`visible`),this.fillTooltip(a,t,p),a.hidden=!1;let r=a.offsetWidth,i=n+14+r>o?n-14-r:n+14;a.style.transform=`translate(${Math.max(0,i)}px, ${c.top}px)`},k=()=>{C.setAttribute(`visibility`,`hidden`),a.hidden=!0},A=e=>{let t=b.getBoundingClientRect(),n=h+(e-t.left-c.left)/d*(g-h),r=0;return m.forEach((e,t)=>{Math.abs(e-n)<Math.abs(m[r]-n)&&(r=t)}),r};E.addEventListener(`pointermove`,e=>O(A(e.clientX))),E.addEventListener(`pointerleave`,k),E.addEventListener(`focus`,()=>O(D)),E.addEventListener(`blur`,k),E.addEventListener(`keydown`,e=>{if(e.key===`ArrowLeft`)O(D-1);else if(e.key===`ArrowRight`)O(D+1);else if(e.key===`Escape`)k();else return;e.preventDefault()}),e.querySelector(`svg`)?.remove(),e.prepend(b)}fillTooltip(e,t,i){let a=document.createElement(`div`);a.className=`tip-date`,a.textContent=n(t.date);let o=i.map(e=>{let n=document.createElement(`div`);n.className=`tip-row`;let i=document.createElement(`span`);i.className=`key`,i.style.background=e.color;let a=document.createElement(`strong`);return a.textContent=r(t[e.key]),n.append(i,a,this.label(e)),n});e.replaceChildren(a,...o)}};customElements.get(u.tagName)||customElements.define(u.tagName,u);export{u as TrendChartComponent};