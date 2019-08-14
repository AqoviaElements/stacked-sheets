import { LitElement, html, css } from 'lit-element';

class StackedSheets extends LitElement {
  static get properties() {
    return {
      sheetItems: { type: Array }
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
    this.sheetItems = [];
  }

  get renderAddContact() {
    return html`
        <sheet-item 
          title="New Contact">
          <button @click="">Add contact</button>
        </sheet-item>
    `;
  }

  get renderNewService() {
    return html`
        <sheet-item 
          title="New Service">
          <button @click="${this.addContact}">Add Implementation Contact</button>
        </sheet-item>
    `;
  }

  addContact() {
    this.sheetItems = [...this.sheetItems, this.renderAddContact];
  }

  newService() {
    this.sheetItems = [...this.sheetItems, this.renderNewService];
  }

  handleSheetClosed() {
    setTimeout(() => {
      this.sheetItems = this.sheetItems.filter(
        (item, index) => index !== (this.sheetItems.length-1)
      );
    }, 500);
  }

  render() {
    return html`
      <sheet-items-holder @sheetClosed="${this.handleSheetClosed}">
        ${this.sheetItems.map(sheet => sheet)}
      </sheet-items-holder>

      <button @click="${this.newService}">New Service</button>
    `;
  }

}

window.customElements.define('stacked-sheets', StackedSheets);
