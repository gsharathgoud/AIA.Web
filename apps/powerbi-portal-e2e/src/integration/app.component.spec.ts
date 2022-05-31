describe('powerbi-portal', () => {
  beforeEach(() => cy.visit('/iframe.html?id=appcomponent--welcome'));
  it('should render the component', () => {
    cy.get('aia-web-root').should('exist');
  });
});
