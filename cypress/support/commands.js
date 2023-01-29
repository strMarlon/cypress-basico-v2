
Cypress.Commands.add('filMandatoryFieldsAndSubmit', ()=> {
    cy.get('#firstName').type('Marlon')
    cy.get('#lastName').type('Amorim')
    cy.get('#email').type('marlon@gmail.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button', 'Enviar').click()
})