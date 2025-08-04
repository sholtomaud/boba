export abstract class BaseComponent extends HTMLElement {
  protected template: HTMLTemplateElement;

  constructor(html: string, css: string) {
    super();
    this.template = document.createElement('template');
    this.template.innerHTML = `<style>${css}</style>${html}`;
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback(): void {
    this.shadowRoot?.appendChild(this.template.content.cloneNode(true));
    this.init();
  }

  protected abstract init(): void;
}
