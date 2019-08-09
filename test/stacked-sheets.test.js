import { html, fixture, expect } from '@open-wc/testing';

import '../src/stacked-sheets';

describe('<stacked-sheets>', () => {
  it('instantiating the element with default properties', async () => {
    const element = await fixture('<stacked-sheets></stacked-sheets>');
    const elementShadowRoot = element.shadowRoot;
    const elementHeader = elementShadowRoot.querySelector('h2');
    expect(element.prop1).to.equal('stacked-sheets');
    expect(elementHeader.innerHTML).to.equal('Hello stacked-sheets!');
  });

  it('setting a property on the element works', async () => {
    const element = await fixture(html`
      <stacked-sheets prop1="new-prop1"></stacked-sheets>
    `);
    const elementShadowRoot = element.shadowRoot;
    const elementHeader = elementShadowRoot.querySelector('h2');
    expect(element.prop1).to.equal('new-prop1');
    expect(elementHeader.innerHTML).to.equal('Hello new-prop1!');
  });
});
