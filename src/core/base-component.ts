export class BaseComponent extends HTMLElement {
  template: HTMLTemplateElement;

  constructor(htmlContent: string, cssContent: string) {
    super();
    const tagName = this.tagName.toLowerCase();
    const scopedCss = cssContent.replace(/:host/g, tagName);
    this.template = document.createElement('template');
    this.template.innerHTML = `<style>${scopedCss}</style>${htmlContent}`;
  }

  connectedCallback() {
    this.appendChild(this.template.content.cloneNode(true));
    this.init();
  }

  init() {}
}

export function html(strings: TemplateStringsArray, ...values: any[]) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
}

export function css(strings: TemplateStringsArray, ...values: any[]) {
  return strings.reduce((acc, str, i) => acc + str + (values[i] || ''), '');
}
