import{u as e}from"./index-mWtkDaPn.js";var t=`<main class="missing">
  <p class="code tabular">404</p>
  <h1>Page Not Found</h1>
  <p>The page you are looking for doesn't exist or has been moved.</p>
  <a href="/">Go back home</a>
</main>
`,n=`:host {
  display: block;
}
:host .missing {
  min-height: calc(100vh - 3.5rem);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  text-align: center;
  color: var(--ink-2);
}
:host .code {
  margin: 0;
  font-size: 4.5rem;
  font-weight: 800;
  color: var(--ink);
}
:host h1 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  color: var(--ink);
}
:host a {
  margin-top: 1rem;
  padding: 0.75rem 1.25rem;
  border-radius: 10px;
  background: var(--ink);
  color: var(--page);
  font-weight: 600;
  text-decoration: none;
}
`,r=class extends e{static tagName=`not-found-page`;constructor(){super(t,n)}};customElements.get(r.tagName)||customElements.define(r.tagName,r);export{r as NotFoundPageComponent};