import { LitElement, html, css } from 'lit-element';

class MyApp extends LitElement {
  static get properties() {
    return {
      sheetItems: { type: Array },
      _newServiceOpened: { type: Boolean },
      _addContactOpened: { type: Boolean },
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
    this._newServiceOpened = false;
  }

  get renderAddContact() {
    return html`
      <stacked-sheet width="80%" title="New Contact">
        <button @click="${this.closeAll}">Close all</button>
      </stacked-sheet>
    `;
  }

  get renderNewService() {
    return html`
      <stacked-sheet title="New Service" width="80%">
        <button @click="${this.addContact}">Add Implementation Contact</button>
      </stacked-sheet>
    `;
  }

  closeAll() {
    this.sheetItems = [];
  }

  addContact() {
    this._addContactOpened = true;
    this.sheetItems = [...this.sheetItems, this.renderAddContact];
  }

  newService() {
    this._newServiceOpened = true;
    this.sheetItems = [...this.sheetItems, this.renderNewService];
  }

  handleSheetClosed() {
    setTimeout(() => {
      this.sheetItems = this.sheetItems.filter(
        (item, index) => index !== this.sheetItems.length - 1,
      );
    }, 500);
  }

  render() {
    return html`
      <stacked-sheets-holder @sheet-closed="${this.handleSheetClosed}">
        ${this.sheetItems.map(sheet => sheet)}
      </stacked-sheets-holder>

      <button @click="${this.newService}">New Service</button>
    `;
  }
}

window.customElements.define('my-app', MyApp);
