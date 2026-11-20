import{u as e}from"./index-mWtkDaPn.js";import{n as t,t as n}from"./format-CJZsMI5O.js";var r=`<article class="card profile">
  <header class="panel-head">
    <h2>Codebase</h2>
    <p data-description>What the repository is made of, and what guards it.</p>
  </header>
  <div class="languages" data-languages role="img"></div>
  <ul class="legend" data-legend></ul>
  <dl class="facts" data-facts></dl>
  <p class="panel-foot" data-note></p>
</article>
`,i=`:host {
  display: block;
}
:host .profile {
  padding: 1.25rem 1.5rem;
}
:host .languages {
  display: flex;
  gap: 2px;
  height: 12px;
  border-radius: 999px;
  overflow: hidden;
  background: var(--surface-2);
}
:host .languages span {
  min-width: 3px;
}
:host .legend {
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem 1rem;
  margin: 0.625rem 0 1.25rem;
  padding: 0;
  list-style: none;
  font-size: 0.8125rem;
  color: var(--ink-2);
}
:host .legend li {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
}
:host .swatch {
  width: 10px;
  height: 10px;
  border-radius: 3px;
}
:host .facts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 0.875rem 1.5rem;
  margin: 0;
}
:host .facts dt {
  font-size: 0.8125rem;
  color: var(--ink-muted);
}
:host .facts dd {
  margin: 0.125rem 0 0;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  overflow-wrap: anywhere;
}
:host .facts dd small {
  display: block;
  font-weight: 400;
  color: var(--ink-muted);
  font-size: 0.8125rem;
}
`,a=[`var(--series-1)`,`var(--series-2)`,`var(--series-3)`,`var(--series-4)`,`var(--series-5)`],o=class extends e{static tagName=`repo-profile`;value=null;constructor(){super(r,i)}set profile(e){this.value=e,this.isConnected&&this.draw()}init(){this.draw()}draw(){let e=this.value;if(this.hidden=!e,!e)return;e.description&&(this.querySelector(`[data-description]`).textContent=e.description);let r=e.languages.slice(0,a.length),i=e.languages.slice(a.length).reduce((e,t)=>e+t.share,0),o=[...r.map((e,t)=>({...e,colour:a[t]})),...i>0?[{name:`Other`,share:i,colour:`var(--axis)`}]:[]],s=e=>e>=.1?`${Math.round(e*100)}%`:`${(e*100).toFixed(1)}%`,c=this.querySelector(`[data-languages]`);c.setAttribute(`aria-label`,o.length?`Languages: ${o.map(e=>`${e.name} ${s(e.share)}`).join(`, `)}`:`No languages detected`),c.replaceChildren(...o.map(e=>{let t=document.createElement(`span`);return t.style.flex=`${e.share} 0 0`,t.style.background=e.colour,t.title=`${e.name} ${s(e.share)}`,t})),this.querySelector(`[data-legend]`).replaceChildren(...o.map(e=>{let t=document.createElement(`li`),n=document.createElement(`span`);return n.className=`swatch`,n.style.background=e.colour,t.append(n,`${e.name} ${s(e.share)}`),t}));let l=[[`Files`,n(e.files)+(e.truncated?`+`:``),`excluding vendored and built code`],[`Test files`,n(e.testFiles),e.files?`${Math.round(e.testFiles/e.files*100)}% of files`:void 0],[`Workflows`,n(e.workflows.length),e.workflows.length?`${e.workflows.filter(e=>e.onPullRequest).length} on pull requests · ${e.workflows.filter(e=>e.runsTests).length} run tests`:`no GitHub Actions`],[`Ecosystems`,e.ecosystems.length?e.ecosystems.join(`, `):`None found`],[`Default branch`,e.defaultBranch,e.protected===null?`protection unknown`:e.protected?`protected`:`not protected`],[`Licence`,e.license??`None`],[`Created`,e.createdAt?t(e.createdAt.slice(0,10)):`—`,e.pushedAt?`last push ${t(e.pushedAt.slice(0,10))}`:void 0],[`Visibility`,e.visibility?e.visibility[0].toUpperCase()+e.visibility.slice(1):`—`,`${n(e.stars)} stars · ${n(e.forks)} forks`]];this.querySelector(`[data-facts]`).replaceChildren(...l.flatMap(([e,t,n])=>{let r=document.createElement(`dt`);r.textContent=e;let i=document.createElement(`dd`);if(i.textContent=t,n){let e=document.createElement(`small`);e.textContent=n,i.append(e)}let a=document.createElement(`div`);return a.append(r,i),[a]})),this.querySelector(`[data-note]`).textContent=e.truncated?`The repository is larger than the API lists in one go, so file counts are a lower bound.`:``}};customElements.get(o.tagName)||customElements.define(o.tagName,o);export{o as RepoProfileComponent};