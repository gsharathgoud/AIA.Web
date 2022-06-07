describe('powerbi-portal', () => {
  beforeEach(() => cy.visit('/iframe.html?id=bannercomponent--primary'));
  it('should render the component', () => {
    cy.get('aia-web-banner').should('exist');
  });
});
