import{u as e}from"./index-mWtkDaPn.js";import{n as t,t as n}from"./dial-DWpH6hqP.js";import{r}from"./svg-BJXHUiNH.js";import{a as i,c as a,o,s,t as c}from"./format-CJZsMI5O.js";import{n as l,r as u}from"./health-RCxkCncK.js";import{d,n as f,t as p}from"./report-IYZEhpFM.js";import{a as m,i as h,n as g,t as _}from"./instruments-CT3J5AsX.js";var v=`<section class="annunciator" aria-labelledby="annunciator-title">
  <h3 id="annunciator-title" class="sr-only">Annunciator panel</h3>
  <a class="master" href="#overview" data-master data-state="off"
    >All clear</a
  >
  <ul class="tiles" data-tiles></ul>
  <p class="deck-note">
    Dark-panel rule: a tile lights only while something is abnormal, amber
    for caution and red for warning. Nothing lit, nothing to do.
  </p>
</section>

<div class="deck-row">
  <a class="card instrument velocity" href="#outlook" data-kpi="Resolution velocity">
    <header class="instrument-head">
      <h3>Resolution velocity</h3>
      <p>
        Issues resolved a day by agents and people, against the
        <span class="arrivals-word">blue mark</span>: issues arriving a day.
      </p>
    </header>
    <div class="dial-wrap" data-velocity-dial>
      <div class="dial-figure">
        <p class="readout tabular" data-velocity>—</p>
        <p class="readout-unit">resolved a day</p>
      </div>
    </div>
    <p class="verdict" data-velocity-verdict></p>
    <ul class="legend" data-velocity-legend></ul>
    <p class="odometer" data-kpi="Open issues">
      <span class="odometer-label">Open</span>
      <span class="kpi-value tabular" data-open>—</span>
      <span class="odometer-delta" data-open-delta></span>
    </p>
  </a>

  <a class="card instrument ratio" href="#outlook" data-kpi="Opened per issue closed">
    <header class="instrument-head">
      <h3>Opened per issue closed</h3>
      <p data-ratio-window>Issues opened for each one closed.</p>
    </header>
    <p class="ratio-figure">
      <span class="ratio-value tabular" data-ratio>—</span><span
        class="ratio-times"
        >×</span
      >
    </p>
    <p class="chip" data-ratio-chip></p>
    <div class="ratio-scale" data-ratio-scale aria-hidden="true">
      <div class="ratio-zones">
        <span data-zone="burning"></span>
        <span data-zone="steady"></span>
        <span data-zone="behind"></span>
        <span data-zone="doom"></span>
      </div>
      <span class="ratio-tag" data-ratio-tag hidden></span>
      <ol class="ratio-ticks" data-ratio-ticks></ol>
      <p class="ratio-captions">
        <span>Burning down</span><span>Break-even</span><span>Doom loop</span>
      </p>
    </div>
    <p class="ratio-text" data-ratio-text></p>
    <div class="ratio-history" data-ratio-history></div>
  </a>
</div>

<div class="dials" data-dials></div>

<article class="card crew" data-kpi="Resolved by AI agents">
  <header class="instrument-head crew-head">
    <h3>Crew split</h3>
    <ul class="legend">
      <li><span class="glyph agent" aria-hidden="true"></span>Agents</li>
      <li><span class="glyph human" aria-hidden="true"></span>People</li>
    </ul>
  </header>
  <div class="crew-rows" data-crew-rows></div>
  <dl class="crew-stats" data-crew-stats></dl>
  <p class="deck-note" data-crew-note></p>
</article>

<p class="sign-key" data-sign-key>
  <strong>Sign key</strong>
  <span><span class="glyph human" aria-hidden="true"></span>Person</span>
  <span><span class="glyph agent" aria-hidden="true"></span>Agent</span>
  <span><span class="tone-icon" data-tone="good" aria-hidden="true">✓</span>Normal</span>
  <span><span class="tone-icon" data-tone="warn" aria-hidden="true">!</span>Caution</span>
  <span><span class="tone-icon" data-tone="bad" aria-hidden="true">✕</span>Warning</span>
  <span><span class="target-mark" aria-hidden="true">▼</span>Target</span>
  <span class="sign-rule"
    >Dials only for bounded values with known limits; the backlog ratio on a
    log scale centred on break-even; DORA on bullet bars, worse to the left.</span
  >
</p>
`,y=`:host {
  display: grid;
  gap: 0.75rem;
}
:host p,
:host h3 {
  margin: 0;
}
:host .deck-note {
  font-size: 0.8125rem;
  color: var(--ink-muted);
}

/* Annunciator panel: always dark, tiles light only when abnormal. */
:host .annunciator {
  display: grid;
  grid-template-columns: minmax(8.5rem, auto) 1fr;
  gap: 0.75rem;
  padding: 0.875rem;
  border-radius: 14px;
  background: #121211;
  color: #c3c2b7;
}
:host .annunciator .deck-note {
  grid-column: 1 / -1;
  color: #96948d;
}
:host .master {
  display: grid;
  place-items: center;
  padding: 0.75rem;
  border-radius: 10px;
  border: 1px solid #383835;
  color: #75736d;
  font-weight: 800;
  font-size: 0.875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
}
:host .master[data-state='caution'] {
  background: var(--warning);
  border-color: var(--warning);
  color: #0b0b0b;
  box-shadow:
    0 0 0 3px #121211,
    0 0 0 5px var(--warning);
}
:host .master[data-state='warning'] {
  background: var(--critical);
  border-color: var(--critical);
  color: #fff;
  box-shadow:
    0 0 0 3px #121211,
    0 0 0 5px var(--critical);
}
:host .tiles {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 9.5rem), 1fr));
  gap: 0.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
:host .tile {
  display: grid;
  gap: 0.125rem;
  height: 100%;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid #2c2c2a;
  background: #1a1a19;
  color: #75736d;
  font-size: 0.8125rem;
  text-decoration: none;
}
:host .tile strong {
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #96948d;
}
:host .tile[data-state='caution'] {
  background: var(--warning);
  border-color: var(--warning);
  color: #0b0b0b;
}
:host .tile[data-state='warning'] {
  background: var(--critical);
  border-color: var(--critical);
  color: #fff;
}
:host .tile[data-state='caution'] strong,
:host .tile[data-state='warning'] strong {
  color: inherit;
}
:host .tile-icon {
  margin-right: 0.375rem;
}
@media (max-width: 560px) {
  :host .annunciator {
    grid-template-columns: 1fr;
  }
}

/* Instruments. */
:host .deck-row {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
}
:host .instrument {
  display: grid;
  gap: 0.5rem;
  align-content: start;
  padding: 1rem 1.125rem;
  color: inherit;
  text-decoration: none;
  transition: border-color 0.15s;
}
:host a.instrument:hover {
  border-color: var(--axis);
}
:host .instrument-head {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.125rem 0.5rem;
  align-items: baseline;
}
:host .instrument-head h3 {
  font-size: 0.8125rem;
  font-weight: 750;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
:host .instrument-head p {
  grid-column: 1 / -1;
  font-size: 0.8125rem;
  color: var(--ink-muted);
}
:host .better {
  font-size: 0.75rem;
  color: var(--ink-muted);
  white-space: nowrap;
}
:host .dial-wrap {
  position: relative;
  width: min(260px, 100%);
  justify-self: center;
}
:host .dial-figure {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  justify-items: center;
}
:host .readout {
  font-size: 2.25rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1;
}
:host .readout.boxed {
  font-size: 1.375rem;
  padding: 0.125rem 0.625rem;
  border: 1px solid var(--border);
  border-radius: 6px;
  background: var(--surface-2);
}
:host .readout-unit {
  font-size: 0.75rem;
  color: var(--ink-muted);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
:host .verdict,
:host .chip {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  font-weight: 650;
}
:host .verdict[data-tone='good'] {
  color: var(--good-ink);
}
:host .verdict[data-tone='bad'] {
  color: var(--critical-ink);
}
:host .velocity .verdict {
  justify-content: center;
}
:host .tone-icon {
  display: inline-grid;
  place-items: center;
  flex: none;
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  font-size: 0.6875rem;
  font-weight: 800;
  color: #fff;
  background: var(--ink-muted);
}
:host .tone-icon[data-tone='good'] {
  background: var(--good);
}
:host .tone-icon[data-tone='warn'] {
  background: var(--warning);
  color: #0b0b0b;
}
:host .tone-icon[data-tone='bad'] {
  background: var(--critical);
}

/* Glyphs: a person is a filled circle, an agent an open hexagon. */
:host .glyph {
  display: inline-block;
  flex: none;
  width: 0.75rem;
  height: 0.75rem;
  margin-right: 0.375rem;
  vertical-align: -0.0625rem;
}
:host .glyph.human {
  border-radius: 50%;
  background: var(--humans);
}
:host .glyph.agent {
  background: var(--agents);
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M7 3h10l5 9-5 9H7l-5-9z' fill='none' stroke='black' stroke-width='3' stroke-linejoin='round'/%3E%3C/svg%3E")
    center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M7 3h10l5 9-5 9H7l-5-9z' fill='none' stroke='black' stroke-width='3' stroke-linejoin='round'/%3E%3C/svg%3E")
    center / contain no-repeat;
}
:host .glyph.arrivals {
  width: 0.25rem;
  border-radius: 2px;
  background: var(--arrivals);
}
:host .arrivals-word {
  color: var(--arrivals);
  font-weight: 650;
}
:host .legend {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.25rem 1rem;
  margin: 0;
  padding: 0;
  list-style: none;
  font-size: 0.8125rem;
  color: var(--ink-2);
}
:host .odometer {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
}
:host .odometer-label {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
:host .odometer .kpi-value {
  padding: 0.125rem 0.5rem;
  border-radius: 6px;
  background: var(--ink);
  color: var(--page);
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.12em;
}
:host .odometer-delta {
  font-size: 0.8125rem;
  color: var(--ink-2);
}

/* The backlog ratio on a log scale. */
:host .ratio-figure {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1;
  letter-spacing: -0.04em;
}
:host .ratio-times {
  color: var(--ink-muted);
  font-weight: 400;
}
:host .chip {
  justify-self: start;
  padding: 0.25rem 0.625rem 0.25rem 0.375rem;
  border: 1px solid var(--border);
  border-radius: 999px;
}
:host .ratio-scale {
  position: relative;
  padding-top: 2rem;
}
:host .ratio-zones {
  display: flex;
  gap: 2px;
  height: 12px;
  border-radius: 3px;
  overflow: hidden;
}
:host .ratio-zones [data-zone='burning'] {
  background: var(--good);
}
:host .ratio-zones [data-zone='steady'] {
  background: var(--warning);
}
:host .ratio-zones [data-zone='behind'] {
  background: var(--serious);
}
:host .ratio-zones [data-zone='doom'] {
  background: var(--critical);
}
:host .ratio-tag {
  position: absolute;
  top: 0;
  transform: translateX(-50%);
  padding: 0.0625rem 0.375rem;
  border-radius: 4px;
  background: var(--ink);
  color: var(--page);
  font-size: 0.8125rem;
  font-weight: 750;
  white-space: nowrap;
}
:host .ratio-tag::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 100%;
  width: 2px;
  height: 1.25rem;
  margin-left: -1px;
  background: var(--ink);
}
:host .ratio-tag[data-edge='end'] {
  transform: translateX(-100%);
}
:host .ratio-tag[data-edge='start'] {
  transform: none;
}
:host .ratio-tag[data-edge='end']::after {
  left: auto;
  right: 0;
}
:host .ratio-tag[data-edge='start']::after {
  left: 1px;
}
:host .ratio-ticks {
  position: relative;
  height: 1.125rem;
  margin: 0.25rem 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.6875rem;
  color: var(--ink-muted);
}
:host .ratio-ticks li {
  position: absolute;
  transform: translateX(-50%);
}
:host .ratio-ticks li:first-child {
  transform: none;
}
:host .ratio-ticks li:last-child {
  transform: translateX(-100%);
}
:host .ratio-captions {
  display: flex;
  justify-content: space-between;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
:host .ratio-text {
  color: var(--ink-2);
}
:host .ratio-spark {
  display: block;
  width: 100%;
  height: 56px;
}
:host .spark-area {
  stroke: none;
  opacity: 0.15;
}
:host .spark-area[data-tone='good'] {
  fill: var(--good);
}
:host .spark-area[data-tone='bad'] {
  fill: var(--critical);
}
:host .spark-line {
  fill: none;
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
}
:host .spark-line[data-tone='good'] {
  stroke: var(--good);
}
:host .spark-line[data-tone='bad'] {
  stroke: var(--critical);
}
:host .spark-even {
  stroke: var(--ink-muted);
  stroke-dasharray: 4 3;
  vector-effect: non-scaling-stroke;
}

/* Dials for bounded figures. Subgrid keeps heads, dials, verdicts and notes
   on the same horizontal lines across each row. */
:host .dials {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr));
}
:host .dial-card {
  grid-row: span 4;
  grid-template-rows: subgrid;
  row-gap: 0.5rem;
  align-content: stretch;
  align-items: start;
}
:host .dial-card .instrument-head {
  grid-row: 1;
}
:host .dial-card .dial-wrap {
  grid-row: 2;
  width: min(180px, 100%);
}
:host .dial-card .verdict {
  grid-row: 3;
}
:host .dial-card .deck-note {
  grid-row: 4;
}
:host .dial-card .dial-tick-label {
  font-size: 12px;
}

/* Crew split. */
:host .crew {
  display: grid;
  gap: 0.75rem;
  padding: 1rem 1.125rem;
}
:host .crew-head .legend {
  justify-content: flex-end;
}
:host .crew-rows {
  display: grid;
  gap: 0.5rem;
}
:host .crew-row {
  display: grid;
  grid-template-columns: minmax(8rem, 14rem) 1fr auto;
  gap: 0.75rem;
  align-items: center;
  font-size: 0.875rem;
}
:host .crew-bar {
  display: flex;
  gap: 2px;
  height: 14px;
  border-radius: 3px;
  overflow: hidden;
  background: var(--surface-2);
}
:host .crew-bar .agent {
  background: var(--agents);
}
:host .crew-bar .assisted {
  background: repeating-linear-gradient(
    135deg,
    var(--agents) 0 3px,
    transparent 3px 6px
  );
  box-shadow: inset 0 0 0 1px var(--agents);
}
:host .crew-bar .human {
  background: var(--humans);
}
:host .crew-numbers {
  min-width: 5rem;
  text-align: right;
  font-weight: 650;
}
:host .crew-stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 190px), 1fr));
  gap: 0.5rem;
  margin: 0;
}
:host .crew-stats div {
  display: grid;
  grid-row: span 2;
  grid-template-rows: subgrid;
  row-gap: 0.25rem;
  align-items: start;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  background: var(--surface-2);
}
:host .crew-stats dt {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
:host .crew-stats dd {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 750;
}
@media (max-width: 560px) {
  :host .crew-row {
    grid-template-columns: 1fr auto;
  }
  :host .crew-bar {
    grid-column: 1 / -1;
    grid-row: 2;
  }
}

/* Sign key. */
:host .sign-key {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.375rem 1.125rem;
  padding-top: 0.75rem;
  border-top: 1px solid var(--border);
  font-size: 0.8125rem;
  color: var(--ink-2);
}
:host .sign-key > span {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
:host .target-mark {
  color: var(--series-5);
}
:host .sign-rule {
  color: var(--ink-muted);
}
`,b={good:`✓`,warn:`!`,bad:`✕`,neutral:`·`},x=(e,t)=>[{from:0,to:e,colour:`var(--critical)`},{from:e,to:t,colour:`var(--warning)`},{from:t,to:100,colour:`var(--good)`}],S=[`⅛×`,`¼×`,`½×`,`1×`,`2×`,`4×`,`8×+`],C=class extends e{static tagName=`flight-deck`;data=null;constructor(){super(v,y)}show(e){this.data=e,this.isConnected&&this.draw()}init(){this.draw()}draw(){let e=this.data;e&&(this.drawAnnunciators(e),this.drawVelocity(e),this.drawRatio(e),this.drawDials(e),this.drawCrew(e))}drawAnnunciators(e){let t=e.delivery,n=g({classes:e.classes,ci:e.ci&&e.ci.runs>0?e.ci:null,flowRatio:e.snapshot.doomLoop.ratio,awaitingReply:e.responses?.awaitingResponse??null,linkedFixShare:e.closures?.referencedShare??null,readinessZone:d(e.audit)?.zone.id??null,doraBands:t?[t.frequency.band,t.leadTimeHours.band,t.failureRate.band,t.restoreHours.band]:[]});this.querySelector(`[data-tiles]`).replaceChildren(...n.map(e=>this.tile(e)));let r=n.filter(e=>e.state!==`off`),i=this.querySelector(`[data-master]`);i.dataset.state=r.some(e=>e.state===`warning`)?`warning`:r.length?`caution`:`off`,i.textContent=r.length?`Master caution · ${r.length}`:`All clear`,i.href=r[0]?.href??`#overview`}tile(e){let t=document.createElement(`li`),n=document.createElement(`a`);n.className=`tile`,n.href=e.href,n.dataset.annunciator=e.id,n.dataset.state=e.state;let r=document.createElement(`strong`);if(r.textContent=e.label,e.state!==`off`){let t=document.createElement(`span`);t.className=`tile-icon`,t.setAttribute(`aria-hidden`,`true`),t.textContent=e.state===`warning`?`✕`:`!`,r.prepend(t)}let i=document.createElement(`span`);i.textContent=e.detail;let a=document.createElement(`span`);return a.className=`sr-only`,a.textContent=e.state===`off`?` (normal)`:` (${e.state}, lit)`,n.append(r,i,a),t.append(n),t}drawVelocity(e){let{velocity:n,latest:r,openDelta:i}=e.snapshot,l=n.agent+n.human,u=this.querySelector(`[data-velocity-dial]`);u.querySelector(`svg`)?.remove();let{max:d,step:f}=h(Math.max(l,n.arrivals));u.prepend(t({agents:n.agent,humans:n.human,arrivals:n.arrivals,max:d,step:f,label:`${o(l)} issues resolved a day: ${o(n.agent)} by agents, ${o(n.human)} by people, against ${o(n.arrivals)} new issues a day.`})),this.querySelector(`[data-velocity]`).textContent=o(l);let p=this.querySelector(`[data-velocity-verdict]`),m=l-n.arrivals;n.days===0?(p.dataset.tone=`neutral`,p.textContent=`No activity recorded yet`):(p.dataset.tone=m>=0?`good`:`bad`,p.textContent=m>=0?`▲ ${o(m)} a day ahead of new issues`:`▼ ${o(-m)} a day behind new issues`),this.querySelector(`[data-velocity-legend]`).replaceChildren(T(`agent`,`${o(n.agent)} agents`),T(`human`,`${o(n.human)} people`),T(`arrivals`,`${o(n.arrivals)} new a day`)),this.querySelector(`[data-open]`).textContent=c(r.open),this.querySelector(`[data-open-delta]`).textContent=n.days>0?`${s(i)} in ${a(n.days)}`:``}drawRatio(e){let{doomLoop:t,velocity:n,latest:r}=e.snapshot,i=t.ratio,o=(e,t)=>{this.querySelector(e).textContent=t},s=i===null?`—`:i===1/0?`∞`:i>=10?String(Math.round(i)):i.toFixed(1);o(`[data-ratio]`,s),n.days>0&&o(`[data-ratio-window]`,`Issues opened for each one closed, last ${a(n.days)}.`);let l=this.querySelector(`[data-ratio-chip]`),[u,d]={burning:[`good`,`Burning down the backlog`],steady:[`good`,`Keeping pace`],behind:[`warn`,`Falling behind`],doom:[`bad`,`Bug doom loop`],unknown:[`neutral`,`No activity in the last week`]}[t.level];l.dataset.tone=u,l.replaceChildren(w(u),d);let f=e=>m(e).position*100,p=[0,f(.9),f(1.1),f(2),100];this.querySelectorAll(`.ratio-zones span`).forEach((e,t)=>e.style.flex=`${p[t+1]-p[t]} 0 0`),this.querySelector(`[data-ratio-ticks]`).replaceChildren(..._.map((e,t)=>{let n=document.createElement(`li`);return n.style.left=`${f(e)}%`,n.textContent=S[t],n}));let h=this.querySelector(`[data-ratio-tag]`);if(h.hidden=i===null,i!==null){let e=m(i);h.style.left=`${e.position*100}%`,h.dataset.edge=e.position>.9?`end`:e.position<.1?`start`:``,h.textContent=`${s}×${e.clipped&&i>1?` ▸`:``}`}o(`[data-ratio-text]`,i!==null&&i>1.1&&t.doublingDays!==null?`At this rate the open backlog of ${c(r.open)} doubles in ${a(t.doublingDays)}.`:i!==null&&i<.9&&t.clearDays!==null?`At this rate the backlog is cleared in ${a(t.clearDays)}.`:``),this.querySelector(`[data-ratio-history]`).replaceChildren(...D(t.history))}drawDials(e){let{classes:t,ci:n,audit:r,responses:a,closures:o,snapshot:s}=e,l=[],m=e=>t?p.reduce((n,r)=>n+e(t[r]),0):0,h=m(e=>e.resolvedRecent),g=h?m(e=>e.resolvedWithinLimit)/h:null,_=m(e=>e.overLimit),v=a?.resolution;l.push({kpi:`Time to resolve`,title:`Resolved within limit`,sub:`Issues resolved inside their class time limit`,href:`#issues`,value:g===null?null:g*100,display:g===null?`—`:i(g),bands:x(50,80),verdict:t?_>0?{tone:`bad`,text:`${c(_)} open past ${_===1?`its`:`their`} limit`}:{tone:`good`,text:`All open issues within limits`}:null,note:v?.count?`median ${u(v.medianHours)} to resolve`:`No issues resolved recently`});let y=s.latest.open,b=a?.awaitingResponse??0,S=a&&y>0?1-b/y:null,C=a?.firstResponse;l.push({kpi:`Time to first response`,title:`Answered`,sub:`Open issues with a reply`,href:`#issues`,value:S===null?null:S*100,display:S===null?`—`:i(S),bands:x(50,80),verdict:a?b>0?{tone:`warn`,text:`${c(b)} open with no reply`}:{tone:`good`,text:`Every open issue has a reply`}:null,note:C?.count?`median first reply ${u(C.medianHours)}`:`No replies recorded recently`});let w=o&&o.total>0?o.referencedShare:null;l.push({kpi:`Closures with a linked fix`,title:`Closures with a linked fix`,sub:`Closed issues that point to a commit, pull request or release`,href:`#issues`,value:w===null?null:w*100,display:w===null?`—`:i(w),bands:x(50,80),verdict:w===null?null:w>=.8?{tone:`good`,text:`Closures can be verified`}:w>=.5?{tone:`warn`,text:`Many closures unverified`}:{tone:`bad`,text:`Most closures unverified`},note:o?`${c(o.byEvidence.fix_referenced)} of ${c(o.total)} closures`:`No data yet`});let T=n&&n.runs>0?n.successRate:null;l.push({kpi:`CI runs passing`,title:`CI runs passing`,sub:`Default branch`,href:`#delivery`,value:T===null?null:T*100,display:T===null?`—`:i(T),bands:x(75,90),verdict:T===null?null:n.failingNow.length?{tone:`bad`,text:`Failing: ${n.failingNow.join(`, `)}`}:T>=.9?{tone:`good`,text:`Green`}:{tone:`warn`,text:`Often red`},note:n?.runs?`${c(n.runs)} runs in ${n.windowDays} days`:`No CI runs recorded`});let E=d(r);l.push({kpi:`Agent readiness`,title:`Agent readiness`,sub:`Distance from the ideal set-up, from the audit`,href:`/audit`,value:E?.score??null,display:E?`${E.score}/100`:`—`,bands:f.map((e,t)=>({from:e.from,to:f[t+1]?.from??100,colour:[`var(--critical)`,`var(--warning)`,`var(--good)`][t]})),target:E?.projected??null,verdict:E?{tone:E.zone.id===`ready`?`good`:E.zone.id===`supervised`?`warn`:`bad`,text:E.zone.label}:null,note:E?`${E.distance} points from ideal`:`No audit yet`}),this.querySelector(`[data-dials]`).replaceChildren(...l.map(e=>this.dialCard(e)))}dialCard(e){let t=document.createElement(`a`);t.className=`card instrument dial-card`,t.href=e.href,t.dataset.kpi=e.kpi;let r=document.createElement(`header`);r.className=`instrument-head`;let i=document.createElement(`h3`);i.textContent=e.title;let a=document.createElement(`span`);a.className=`better`,a.textContent=`↑ better`;let o=document.createElement(`p`);o.textContent=e.sub,r.append(i,a,o);let s=document.createElement(`div`);s.className=`dial-wrap`,s.append(n({value:e.value,bands:e.bands,target:e.target??null,ticks:[0,50,100],label:`${e.title}: ${e.display}`+(e.verdict?`. ${e.verdict.text}`:``)}));let c=document.createElement(`div`);c.className=`dial-figure`;let l=document.createElement(`p`);if(l.className=`readout boxed tabular`,l.textContent=e.display,c.append(l),s.append(c),t.append(r,s),e.verdict){let n=document.createElement(`p`);n.className=`verdict`,n.dataset.tone=e.verdict.tone,n.append(w(e.verdict.tone),e.verdict.text),t.append(n)}let u=document.createElement(`p`);return u.className=`deck-note`,u.textContent=e.note,t.append(u),t}drawCrew(e){let{velocity:t,latest:n}=e.snapshot,r=e.pulls,a=[E(`Issues resolved a day`,t.agent,t.human,0,o),E(`Issues resolved, all time`,n.agentClosed,n.totalClosed-n.agentClosed,0,c)];if(r){let e=r.byOrigin;a.push(E(`Pull requests merged, ${r.windowDays} days`,e.agent.merged,e.human.merged,e.assisted.merged,c))}this.querySelector(`[data-crew-rows]`).replaceChildren(...a);let s=n.totalClosed?n.agentClosed/n.totalClosed:null,d=[[`Resolved by AI agents`,s===null?`—`:i(s)]];if(r){let e=l(r),t=r.byOrigin,n=e=>e===null?`—`:i(e);d.push([`Merged with an agent's hand`,e===null?`—`:i(e)],[`Merge rate, agent / person`,`${n(t.agent.mergeRate)} / ${n(t.human.mergeRate)}`],[`Time to merge, agent / person`,`${u(t.agent.medianHoursToMerge)} / ${u(t.human.medianHoursToMerge)}`])}this.querySelector(`[data-crew-stats]`).replaceChildren(...d.map(([e,t])=>{let n=document.createElement(`div`),r=document.createElement(`dt`);r.textContent=e;let i=document.createElement(`dd`);return i.className=`tabular`,i.textContent=t,n.append(r,i),n})),this.querySelector(`[data-crew-note]`).textContent=r?`Hatched: a person working with an agent. Agents working through a person’s account without a trailer count as people, so agent figures are a lower bound.`:`Pull request figures appear after the next tracker run.`}};function w(e){let t=document.createElement(`span`);return t.className=`tone-icon`,t.dataset.tone=e,t.setAttribute(`aria-hidden`,`true`),t.textContent=b[e],t}function T(e,t){let n=document.createElement(`li`),r=document.createElement(`span`);return r.className=`glyph ${e}`,r.setAttribute(`aria-hidden`,`true`),n.append(r,t),n}function E(e,t,n,r,i){let a=document.createElement(`div`);a.className=`crew-row`;let o=document.createElement(`span`);o.className=`crew-label`,o.textContent=e;let s=document.createElement(`div`);s.className=`crew-bar`;let c=t+r+n;s.setAttribute(`role`,`img`),s.setAttribute(`aria-label`,`${e}: ${i(t)} by agents`+(r?`, ${i(r)} by people with agents`:``)+`, ${i(n)} by people`);for(let[e,i]of[[t,`agent`],[r,`assisted`],[n,`human`]]){if(e<=0)continue;let t=document.createElement(`span`);t.className=i,t.style.flex=`${e} 0 0`,s.append(t)}c===0&&s.classList.add(`empty`);let l=document.createElement(`span`);return l.className=`crew-numbers tabular`,l.textContent=`${i(t+r)} · ${i(n)}`,a.append(o,s,l),a}function D(e){let t=e.slice(-30).filter(e=>e.ratio!==null);if(t.length<2)return[];let n=r(`svg`,{viewBox:`0 0 300 60`,preserveAspectRatio:`none`,class:`ratio-spark`,"aria-hidden":`true`}),i=e=>e/(t.length-1)*300,a=e=>56-m(e).position*52,o=t.map((e,t)=>`${t?`L`:`M`} ${i(t)} ${a(e.ratio)}`),s=t[t.length-1].ratio>1.1?`bad`:`good`;r(`path`,{d:`${o.join(` `)} L 300 60 L 0 60 Z`,class:`spark-area`,"data-tone":s},n),r(`line`,{x1:0,x2:300,y1:a(1),y2:a(1),class:`spark-even`},n),r(`path`,{d:o.join(` `),class:`spark-line`,"data-tone":s},n);let c=document.createElement(`p`);return c.className=`deck-note spark-caption`,c.textContent=`Ratio by day, last ${t.length} days · dashed: 1× break-even`,[n,c]}customElements.get(C.tagName)||customElements.define(C.tagName,C);export{C as FlightDeckComponent};