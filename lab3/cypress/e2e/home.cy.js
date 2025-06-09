describe('Strona główna', () => {
  it('Ładuje stronę główną i sprawdza nagłówek', () => {
    cy.visit('http://localhost:5173');
    cy.contains('Księgarnia Bookser');
  });

  it('Wyszukuje książkę po tytule', () => {
    cy.visit('http://localhost:5173');
    cy.get('input[type="text"]').type('Lalka');
    cy.get('button.button_search').click();
    cy.contains('Lalka');
  });
});
