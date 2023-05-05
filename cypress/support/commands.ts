/// <reference types = "Cypress" />

Cypress.Commands.add('consultarProduto', (produto) => {
  cy.get('#twotabsearchtextbox')
    .click()
    .type(produto)

  cy.get('#nav-search-submit-button')
    .click()
})

Cypress.Commands.add('acessarPrimeiroItemLista', () => {
  cy.get('.sg-col-inner > .s-widget-container > .s-card-container')
    .each(($elm, index) => {
      if (index == 0) {
        cy.wrap($elm).click()
      }
    })
})

Cypress.Commands.add('adicionarProdutoAoCarrinho', () => {
  cy.get('#add-to-cart-button')
    .click()
})
