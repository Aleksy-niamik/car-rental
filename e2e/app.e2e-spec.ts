import { CarRentalPage } from './app.po';

describe('car-rental App', function() {
  let page: CarRentalPage;

  beforeEach(() => {
    page = new CarRentalPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
