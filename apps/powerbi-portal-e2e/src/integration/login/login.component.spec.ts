describe('Login Component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=logincomponent--primary'));
  it('should render the component', () => {
    cy.get('a[routerlink="/login"]').click().get('aia-web-login').should('exist');
  });
});
