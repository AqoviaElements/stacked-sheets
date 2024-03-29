import { html, css, LitElement } from "lit";
import "./components/stacked-sheet.js";
import "./components/stacked-sheets-holder.js";

export class MyApp extends LitElement {
  static get properties() {
    return {
      sheetItems: { type: Array },
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
      <stacked-sheet width="80%" title="New Contact">
        <button @click="${this.closeAll}">Close all</button>
      </stacked-sheet>
    `;
  }

  get renderNewService() {
    return html`
      <stacked-sheet
        title="New Service"
        width="80%"
        maxWidth="770px"
        ?showFooter=${true}
      >
        <button @click="${this.addContact}">Add Implementation Contact</button>
        <div slot="footer">
          <button>Next</button>
        </div>
      </stacked-sheet>
    `;
  }

  closeAll() {
    const elements = this.shadowRoot.querySelectorAll("stacked-sheet");

    elements.forEach(el => {
      el.closeSheet();
    });
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
        (item, index) => index !== this.sheetItems.length - 1
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
