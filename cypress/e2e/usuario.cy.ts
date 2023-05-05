/// <reference types = "Cypress" />
import { faker } from '@faker-js/faker'

const user = {
  fullname: faker.name.fullName(),
  email: faker.internet.email(),
  password: faker.internet.password()
}

describe('Suite 2 - Cadastro', {
  retries: {
    runMode: 3,
    openMode: 1
  }
}, () => {
  context('Usuário | Cadastrar usuário', () => {
    beforeEach(() => {
      cy.visit('/')
    })

    it('Preencher campos do cadastro do usuário [desafio]', () => {
    // tag: desafio
      cy.get('#nav-link-accountList-nav-line-1')
        .click()

      cy.get('#createAccountSubmit')
        .click()

      cy.get('#ap_customer_name')
        .type(user.fullname)

      cy.get('#ap_email')
        .type(user.email)

      cy.get('#ap_password')
        .type(user.password, { log: false })

      cy.get('#ap_password_check')
        .type(user.password, { log: false })
    })
  })
})
