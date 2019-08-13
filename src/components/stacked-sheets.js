import { LitElement, html, css } from 'lit-element';

class StackedSheets extends LitElement {
  static get properties() {
    return {
      sheetItems: { type: Array },
      _newServiceOpened: { type: Boolean},
      _addContactOpened: { type: Boolean},
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
        <sheet-item 
          .sheetVisible="${this._addContactOpened}"
          title="New Contact">
          <button @click="">Add contact</button>
        </sheet-item>
    `;
  }

  get renderNewService() {
    return html`
        <sheet-item 
          .sheetVisible="${this._newServiceOpened}" 
          title="New Service">
          <button @click="${this.addContact}">Add Implementation Contact</button>
        </sheet-item>
    `;
  }

  addContact() {
    this._addContactOpened = true;
  }

  newService() {
    this._newServiceOpened = true;
  }

  render() {
    return html`
      <sheet-items-holder>
        ${this.renderNewService}
        ${this.renderAddContact}
      </sheet-items-holder>

      <button @click="${this.newService}">New Service</button>
    `;
  }
}

window.customElements.define('stacked-sheets', StackedSheets);
