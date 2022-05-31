describe('Reports Component', () => {
  beforeEach(() => cy.visit('/iframe.html?id=reportscomponent--primary'));
  it('should render the component', () => {
    cy.get('a[routerlink="/reports"]').click().get('aia-web-reports').should('exist');
  });
});
