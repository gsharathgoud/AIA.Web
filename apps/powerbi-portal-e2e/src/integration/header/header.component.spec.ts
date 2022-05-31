describe('Header Component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=headercomponent--primary'));
  it('should render the component', () => {
    cy.get('aia-web-header').should('exist');
  });
});
