import { LitElement, html } from 'lit-element';

class SheetItemsHolder extends LitElement {

  firstUpdated() {
    this.addEventListener('sheetClosed', this.updateSheets);
    this.addEventListener('sheetOpened', this.updateSheets);
  }

  updateSheets() {
    setTimeout(() => this.querySelectorAll('sheet-item').forEach(sheet => sheet.requestUpdate()), 100);
  }

  render() {
    return html` 
      <slot></slot>
    `;
  }

}

window.customElements.define('sheet-items-holder', SheetItemsHolder);
