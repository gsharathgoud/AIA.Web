describe('Page-not-found Component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=pagenotfoundcomponent--primary'));
  it('should render the component', () => {
    cy.get('aia-web-pagenotfound').should('exist');
  });
});
