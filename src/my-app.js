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
      <stacked-sheet
        .opened="${this._addContactOpened}"
        title="New Contact"
        sheetOrder="2"
        sheetsTotal="2"
      >
        <button @click="">Add contact</button>
      </stacked-sheet>
    `;
  }

  get renderNewService() {
    return html`
      <stacked-sheet
        .opened="${this._newServiceOpened}"
        title="New Service"
        @opened-changed=${this.newServiceOpenedChanged}
        sheetOrder="1"
        sheetsTotal="2"
      >
        <button @click="${this.addContact}">Add Implementation Contact</button>
      </stacked-sheet>
    `;
  }

  newServiceOpenedChanged(e) {
    this._newServiceOpened = e.detail.opened;
  }

  addContact() {
    this._addContactOpened = true;
    this.sheetItems = [...this.sheetItems, this.renderAddContact];
  }

  newService() {
    this._newServiceOpened = true;
  }

  render() {
    return html`
      <stacked-sheets-holder>
        ${this.renderNewService} ${this.renderAddContact}
      </stacked-sheets-holder>

      <button @click="${this.newService}">New Service</button>
    `;
  }
}

window.customElements.define('my-app', MyApp);
