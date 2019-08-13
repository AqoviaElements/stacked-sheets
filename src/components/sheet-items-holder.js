import { LitElement, html, css } from 'lit-element';

class SheetItemsHolder extends LitElement {
  static get properties() {
    return {
      sheetItems: { type: Array }
    };
  }

  updated(changedProperties) {
    let childElements = this.shadowRoot.querySelector("slot").assignedNodes();
    console.log("Elements:" + childElements);
  }

  

  render() {
    return html` 
      <slot></slot>
    `;
  }

}

window.customElements.define('sheet-items-holder', SheetItemsHolder);
