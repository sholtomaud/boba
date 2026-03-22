export class BaseComponent extends HTMLElement {
  constructor(html, css) {
    super();
    this.template = document.createElement('template');
    this.template.innerHTML = `<style>${css}</style>${html}`;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
    this.init();
  }

  init() {}
}
