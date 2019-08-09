import { LitElement, html, css } from 'lit-element';

class StackedSheets extends LitElement {
  static get properties() {
    return {
      prop1: { type: String },
    };
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
        }
      `,
    ];
  }

  constructor() {
    super();
    this.prop1 = 'stacked-sheets';
  }

  render() {
    return html`
      <h2>Hello ${this.prop1}!</h2>
    `;
  }
}

window.customElements.define('stacked-sheets', StackedSheets);
