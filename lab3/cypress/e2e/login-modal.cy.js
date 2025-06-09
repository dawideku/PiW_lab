describe('Przełączanie okna logowania', () => {
  it('Kliknięcie przycisku logowania przenosi na stronę logowania', () => {
    cy.visit('http://localhost:5173');

    cy.get('button').contains('Logowanie').click();

    cy.url().should('include', '/login');

    cy.contains('Zaloguj');
  });
});
