import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/components/stacked-sheet';

describe('<stacked-sheet>', () => {
  it('instantiating the element with default properties', async () => {
    const element = await fixture('<stacked-sheet></stacked-sheet>');
    expect(element.opened).to.equal(false);
    expect(element.title).to.equal('New Sheet');
    expect(element.width).to.equal('100%');

    // default offset should be 0
    expect(element.sheetOffset).to.equal(0);

    // default transition delay should be 0
    expect(element.sheetTransitionDelay).to.equal(0);
  });

  it('setting a property on the element works', async () => {
    const open = true;
    const element = await fixture(html`
      <stacked-sheet
        opened=${open}
        title="New Service"
        width="90%"
      >
      </stacked-sheet>
    `);
    expect(element.opened).to.equal(true);
    expect(element.title).to.equal('New Service');
    expect(element.width).to.equal('90%');
  });

  it('closing sheet should emit an event', async () => {
    const element = await fixture(html`
      <stacked-sheet> </stacked-sheet>
    `);

    setTimeout(() => { expect(element.opened).to.equal(true) }, 100);

    setTimeout(() => element.closeSheet());
    await oneEvent(element, 'sheet-closed');

    expect(element.opened).to.equal(false);
  });


  it('sheets should be aware of number of sheets in front', async () => {
    const element = await fixture(html`
      <stacked-sheets-holder>
        <stacked-sheet> </stacked-sheet>
        <stacked-sheet> </stacked-sheet>
        <stacked-sheet> </stacked-sheet>
      </stacked-sheets-holder>
    `);

    setTimeout(() => { expect(element.querySelectorAll('stacked-sheet')[0]._numberOfSheetsInFront).to.equal(2) }, 100);
    setTimeout(() => { expect(element.querySelectorAll('stacked-sheet')[1]._numberOfSheetsInFront).to.equal(1) }, 100);
    setTimeout(() => { expect(element.querySelectorAll('stacked-sheet')[2]._numberOfSheetsInFront).to.equal(0) }, 100);

  });
 
});
