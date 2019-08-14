import { LitElement, html} from 'lit-element';

class StackedSheetsHolder extends LitElement {

    render() {
        return html`
            <slot></slot>
        `;
    }
}

window.customElements.define('stacked-sheets-holder', StackedSheetsHolder);