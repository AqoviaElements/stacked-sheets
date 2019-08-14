import { html, fixture, expect, oneEvent } from '@open-wc/testing';

import '../src/components/stacked-sheet';

describe('<stacked-sheet>', () => {
  it('instantiating the element with default properties', async () => {
    const element = await fixture('<stacked-sheet></stacked-sheet>');
    expect(element.opened).to.equal(false);
    expect(element.title).to.equal('New Sheet');
    expect(element.sheetOrder).to.equal(0);
    expect(element.sheetsTotal).to.equal(0);
    expect(element.width).to.equal('100%');

    // default offset should be 0
    expect(element.updateSheetPosition()).to.equal(0);

    // default transition delay should be 0
    expect(element.updateTransitionDelay()).to.equal(0);
  });

  it('setting a property on the element works', async () => {
    const order = 1;
    const total = 2;
    const open = true;
    const element = await fixture(html`
      <stacked-sheet 
        opened=${open} 
        title="New Service"
        .sheetOrder=${order}
        .sheetsTotal=${total}
        width="90%"
      >
      </stacked-sheet>
    `);
    expect(element.opened).to.equal(true);
    expect(element.title).to.equal('New Service');
    expect(element.sheetOrder).to.equal(1);
    expect(element.sheetsTotal).to.equal(2);
    expect(element.width).to.equal('90%');
    
  });

  it('changing sheet order should update the offset', async () => {
    const order = 1;
    const total = 2;
    const element = await fixture(html`
      <stacked-sheet 
        .sheetOrder=${order}
        .sheetsTotal=${total}
      >
      </stacked-sheet>
    `);
    expect(element.updateSheetPosition()).to.equal(-20);
  });

  it('changing sheet order should update the transition delay', async () => {
    const order = 1;
    const total = 2;
    const element = await fixture(html`
      <stacked-sheet 
        .sheetOrder=${order}
        .sheetsTotal=${total}
      >
      </stacked-sheet>
    `);
    expect(element.updateTransitionDelay()).to.equal(0.5);
  });

  it('closing sheet should emit an event', async () => {
    const open = true;
    const element = await fixture(html`
      <stacked-sheet
        opened=${open}
      >
      </stacked-sheet>
    `);

    expect(element.opened).to.equal(true);
    
    setTimeout(() => element.closeSheet());
    const openedChanged = await oneEvent(element, 'opened-changed');

    expect(openedChanged.detail.opened).to.equal(false);
    expect(element.opened).to.equal(false);
  });
});
