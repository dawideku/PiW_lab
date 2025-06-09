describe('Filtrowanie książek po stronie głównej', () => {
  it('Zaznacza filtr gatunku i sprawdza wynik', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[type="checkbox"][value="fantastyka"]').check({ force: true });

    cy.get('.book-tile').should('exist');
    cy.get('.book-tile').each(($book) => {
      cy.wrap($book).should('contain.text', 'Fantastyka');
    });
  });

  it('Zaznacza kilka filtrów jednocześnie', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[type="checkbox"][value="fantastyka"]').check({ force: true });
    cy.get('input[type="checkbox"][value="2023"]').check({ force: true });

    cy.get('.book-tile').should('exist');
  });
});
