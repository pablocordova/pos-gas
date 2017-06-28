import { PosGasPage } from './app.po';

describe('pos-gas App', () => {
  let page: PosGasPage;

  beforeEach(() => {
    page = new PosGasPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
