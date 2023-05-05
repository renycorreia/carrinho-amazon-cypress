declare namespace Cypress {
  interface Chainable {
    consultarProduto: (produto: any) => Chainable<any>

    acessarPrimeiroItemLista: () => Chainable<any>

    adicionarProdutoAoCarrinho: () => Chainable<any>
  }
}
