import { LitElement, html, unsafeCSS } from 'lit-element';
import { SheetItemStyles } from '../styles/sheet-item-styles.js';

class SheetItem extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      sheetVisible: { type: Boolean },
    };
  }

  static get styles() {
    return [
      SheetItemStyles
    ];
  }

  constructor() {
    super();
    this.sheetVisible = false;

    setTimeout(() => { this.sheetVisible = true }, 100);
  }

  firstUpdated() {
    const sheetClosedEvent = new CustomEvent("sheetOpened", { detail: {}, bubbles: true });
    this.dispatchEvent(sheetClosedEvent);
  }

  closeSheet() {
    this.sheetVisible = false;
    
    const sheetClosedEvent = new CustomEvent("sheetClosed", { detail: {}, bubbles: true });
    this.dispatchEvent(sheetClosedEvent);
  }

  get sheetOffset() {
    const pixelsOffset = 20;
    return this.numberOfSheetsInFront * -1 * pixelsOffset;
  }

  get numberOfSheetsInFront() {
    let count = 0;
    let currentSheet = this;

    while(currentSheet.nextElementSibling != null) {
      currentSheet = currentSheet.nextElementSibling;
      
      if (currentSheet.sheetVisible)
        count += 1;
    }

    return count;
  }

  render() {
    return html`
    <style>
      .sheet.-is-open {
        transform: translateX(${unsafeCSS(this.sheetOffset)}px);
      }
    </style>

    ${this.svgTemplate}

      <div class="sheet ${this.sheetVisible ? '-is-open' : ''}">

        <header class="sheet__header">
          <h1 class="sheet__main-heading">${this.title}</h1>
          <span class="sheet__close" @click="${this.closeSheet}"><svg><use xlink:href="#cross" /></svg></span>
        </header>

        <div class="sheet__frame">
          <div class="sheet__content">
            <slot></slot>
          </div>
        </div>

      </div>

      <div class="sheet-overlay"></div>
    `;
  }

  get svgTemplate() {
    return html`
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">  
        <symbol id="cross" viewBox="0 0 22 22">
            <title>Cross</title>
            <path d="M14.1,11.3 C13.9,11.1 13.9,10.8 14.1,10.6 L21.6,3.1 C21.8,2.9 21.9,2.6 21.9,2.4 C21.9,2.2 21.8,1.9 21.6,1.7 L20.2,0.3 C20,0.1 19.7,0 19.5,0 C19.2,0 19,0.1 18.8,0.3 L11.3,7.8 C11.1,8 10.8,8 10.6,7.8 L3.1,0.3 C2.9,0.1 2.6,0 2.4,0 C2.2,0 1.9,0.1 1.7,0.3 L0.3,1.7 C0.1,1.9 0,2.2 0,2.4 C0,2.6 0.1,2.9 0.3,3.1 L7.8,10.6 C8,10.8 8,11.1 7.8,11.3 L0.3,18.8 C0.1,19 0,19.3 0,19.5 C0,19.7 0.1,20 0.3,20.2 L1.7,21.6 C1.9,21.8 2.2,21.9 2.4,21.9 C2.6,21.9 2.9,21.8 3.1,21.6 L10.6,14.1 C10.8,13.9 11.1,13.9 11.3,14.1 L18.8,21.6 C19,21.8 19.3,21.9 19.5,21.9 C19.7,21.9 20,21.8 20.2,21.6 L21.6,20.2 C21.8,20 21.9,19.7 21.9,19.5 C21.9,19.3 21.8,19 21.6,18.8 L14.1,11.3 Z"/>
        </symbol>
      </svg>    
    `;
  }
}

window.customElements.define('sheet-item', SheetItem);
