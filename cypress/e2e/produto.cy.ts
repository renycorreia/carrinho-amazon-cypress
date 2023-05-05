/// <reference types = "Cypress" />

describe('Suite 1 - Carrinho de compras', {
  retries: {
    runMode: 3,
    openMode: 0
  }
}, () => {
  context('Produto | Adicionar ao carrinho', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Consultar produto e adicionar primeiro item da lista ao carrinho [desafio]', () => {
      const produto = 'MOZCADA Forma para 7 Picolés de Silicone'

      cy.consultarProduto(produto)

      cy.acessarPrimeiroItemLista()

      cy.adicionarProdutoAoCarrinho()

      cy.get('.a-size-medium-plus')
        .should('contain.text', 'Adicionado ao carrinho')

      cy.get('.a-button-text')
        .contains('Ir para o carrinho')
        .click()

      cy.get('.sc-list-item-content')
        .should('contain.text', produto)
    })

    it('Adicionar produto com recorrencia ao carrinho [desafio]', () => {
      let produto = 'Johnson\'s Baby Sabonete Líquido Recém Nascido'

      cy.consultarProduto(produto)

      cy.acessarPrimeiroItemLista()

      cy.get('#rcxOrdFreqOnml')
        .select('1M|onml')

      cy.get('#rcx-subscribe-submit-button-announce')
        .click()

      cy.get('.a-size-medium-plus')
        .should('contain.text', 'Adicionado ao carrinho')

      cy.get('#recurrence-section')
        .should('contain.text', '\n\nEntregar a cada:\n\n\n1 mês\n\n')

      cy.get('#discount-section')
        .should('contain.text', 'Com desconto de 10% do Programe e Poupe.')

      cy.get('.a-button-text')
        .contains('Ir para o carrinho')
        .click()

      cy.get('.sc-list-item-content')
        .should('contain.text', produto)

      produto = 'Lenço Infantil Mamypoko Com 200 Toque Suave'

      cy.consultarProduto(produto)

      cy.acessarPrimeiroItemLista()

      cy.adicionarProdutoAoCarrinho()

      cy.get('.a-size-medium-plus')
        .should('contain.text', 'Adicionado ao carrinho')

      cy.get('#sw-atc-buy-box')
        .should('contain.text', 'Fechar pedido\n                    (2 produtos)')

      cy.get('.a-button-text')
        .contains('Ir para o carrinho')
        .click()

      cy.get('.sc-list-item-content')
        .should('contain.text', produto)
    })

    it('Adicionar mais produtos e somar carrinho [desafio]', () => {
      const produtos = ['Panela de Pressão Digital Mondial', 'Furadeira de Impacto Makita HP1640', 'Lenço Infantil Mamypoko Com 200 Toque Suave']

      let valorTotal = 0
      let valorTotalString = ''

      produtos.forEach((item, index) => {
        cy.consultarProduto(item)

        cy.acessarPrimeiroItemLista()

        cy.get('.priceToPay')
          .then(function ($elm) {
            const aux = $elm.text().split('R$')[1].replace(',', '.')

            const auxFloat = parseFloat(aux)
            valorTotal = valorTotal + auxFloat

            valorTotalString = valorTotal.toFixed(2).replace('.', ',')
          })

        cy.adicionarProdutoAoCarrinho()

        cy.get('.a-size-medium-plus')
          .should('contain.text', 'Adicionado ao carrinho')

        cy.get('#sw-atc-buy-box')
          .should('contain.text', `Fechar pedido\n                    (${index + 1} produto${index == 0 ? '' : 's'})`)

        cy.get('.a-button-text')
          .contains('Ir para o carrinho')
          .click()

        cy.get('.sc-list-item-content')
          .should('contain.text', item)

        cy.get('#sc-subtotal-amount-activecart').then(function ($elm) {
          cy.wrap($elm)
            .should('include.text', `${valorTotalString}`)
        })

        cy.get('#sc-subtotal-amount-buybox').then(function ($elm) {
          cy.wrap($elm)
            .should('include.text', `${valorTotalString}`)
        })
      })

      cy.get('#sc-subtotal-label-activecart')
        .should('contain.text', `Subtotal  (${produtos.length} ite${produtos.length == 0 ? 'm' : 'ns'}):`)

      cy.get('#sc-subtotal-amount-activecart').then(function ($elm) {
        cy.wrap($elm)
          .should('contain.text', `${valorTotalString}`)
      })

      cy.get('#sc-subtotal-label-buybox')
        .should('contain.text', `Subtotal  (${produtos.length} ite${produtos.length == 0 ? 'm' : 'ns'}):`)

      cy.get('#sc-subtotal-amount-buybox').then(function ($elm) {
        cy.wrap($elm)
          .should('contain.text', `${valorTotalString}`)
      })

      cy.get('#sc-buy-box-ptc-button')
        .click()

      cy.get('h1')
        .should('contain.text', 'Fazer login')
    })
  })
})
