describe('Home Component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=homecomponent--primary'));
  it('should render the component', () => {
    cy.get('a[routerlink="/home"]').click().get('aia-web-home').should('exist');
  });
});
