describe('Footer Component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=footercomponent--primary'));
  it('should render the component', () => {
    cy.get('aia-web-footer').should('exist');
  });
});
