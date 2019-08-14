import { LitElement, html } from 'lit-element';

class StackedSheetsHolder extends LitElement {
  firstUpdated() {
    this.addEventListener('sheet-closed', this.updateSheets);
    this.addEventListener('sheet-opened', this.updateSheets);
  }

  updateSheets() {
    setTimeout(
      () => this.querySelectorAll('stacked-sheet').forEach(sheet => sheet.requestUpdate()),
      100,
    );
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

window.customElements.define('stacked-sheets-holder', StackedSheetsHolder);
