import { BaseComponent } from '../../core/base-component.ts';
import template from './home-page.html?raw';
import style from './home-page.css?raw';

interface BuildInfo {
  commit: string;
  commitUrl: string;
  runUrl: string;
  builtAt: string;
}

export class HomeComponent extends BaseComponent {
  static tagName = 'home-page';

  constructor() {
    super(template, style);
  }

  async init() {
    // Written by site/assemble.js when the site is built on GitHub Actions.
    let build: BuildInfo;
    try {
      build = await (await fetch('data/build.json')).json();
    } catch {
      return; // Not a deployed build.
    }
    const commit = this.querySelector<HTMLAnchorElement>('[data-commit]')!;
    commit.textContent = build.commit.slice(0, 7);
    commit.href = build.commitUrl;
    this.querySelector<HTMLAnchorElement>('[data-run]')!.href = build.runUrl;
    const built = this.querySelector<HTMLTimeElement>('[data-built]')!;
    built.dateTime = build.builtAt;
    built.textContent = new Date(build.builtAt).toLocaleDateString(undefined, {
      dateStyle: 'long',
    });
    this.querySelector<HTMLElement>('#build-status')!.hidden = false;
  }
}

if (!customElements.get(HomeComponent.tagName)) {
  customElements.define(HomeComponent.tagName, HomeComponent);
}
