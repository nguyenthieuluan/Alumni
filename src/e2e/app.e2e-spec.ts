import { AlumniTemplatePage } from './app.po';

describe('Alumni App', function() {
  let page: AlumniTemplatePage;

  beforeEach(() => {
    page = new AlumniTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
