/// <reference types="Cypress" />

//const { should } = require("chai")

describe('Central de Atendimento ao Cliente TAT', ()=> {
	beforeEach('', ()=>{
        cy.visit('./src/index.html')
    })	
    //v1
    it('Verifica o título da aplicação', ()=> {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')// verificando se o title esta correto
    })
    //v2
    it('Preenche os campos obrigatórios e envia o formulário', ()=>{
        const longText = 'Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste, Teste,'

        cy.get('#firstName').type('Marlon')
        cy.get('#lastName').type('Amorim')
        cy.get('#email').type('marlon@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0})// tira o delay do texto
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })
    //v3
    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', ()=> {
        cy.get('#firstName').type('Marlon')
        cy.get('#lastName').type('Amorim')
        cy.get('#email').type('marlon@gmail,com')//email formatação invalida
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    //v4
    it('Campo telefonico continua vazio quando preenchido com valor não numérico', ()=>{
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')// o que aparece na tela ?
    })
    //v4
    it('exibe mensagem de erro quando o telefone se torna obrigatorio mas não é preenchido antes do envio do formulário', ()=>{

        cy.get('#firstName').type('Marlon')
        cy.get('#lastName').type('Amorim')
        cy.get('#email').type('marlon@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible')
    })
    //v5
    it('Preencha e limpa os campos nome, sobrenome, email e telefone', ()=> {
        cy.get('#firstName')
            .type('Marlon')
            .should('have.value', 'Marlon')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Amorim')
            .should('have.value', 'Amorim')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('marlon@gmail.com')
            .should('have.value', 'marlon@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('12345')
            .should('have.value', '12345')
            .clear()
            .should('have.value', '')
    })
    //v6
    it('Mensagem de erro ao submeter o formulário sem preencher os campos obrigatórioas', ()=> {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })
    //v7
    it('Envia o formulário com sucesso usando um comando customizado', ()=>{
        cy.filMandatoryFieldsAndSubmit()
        cy.get('.success').should('be.visible')
    })
    //v8
    it('Seleciona um produto (Youtube) por seu texto', ()=> {
        cy.get('#product')
            .select('YouTube')// seleciona pelo seu text
            .should('have.value', 'youtube')
    })
    //v9
    it('Seleciona um produto (Mentoria) por seu valor (value)', ()=> {
        cy.get('#product')
            .select('mentoria')// seleciona pelo valor
            .should('have.value', 'mentoria')
    })
    //v10
    it('Seleciona um produto (Blog) por seu índice', ()=> {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })
    //v11
    it('Marca o tipo de atendimento "Feedback"',()=> {
        cy.get('input[type="radio"][value="feedback"]')
            .check()//
            .should('have.value', 'feedback')
    })
    //v12
    it('Marca cada tipo de atendimento',()=> {
        cy.get('input[type="radio"]')
            .should('have.length', 3)// quantidade de itens
            .each(($radio)=> {
                cy.wrap($radio).check()// check em cada elemento
                cy.wrap($radio).should('be.checked') // elementos marcados ?   
            })
    })
    //v13
    it('Maca ambos checkboxes, depois desmarca o último', ()=> {
        cy.get('input[type="checkbox"]')
            .check()// marca o checkbosk
            .should('be.checked')
            .last()//sele o ultimo check marcado
            .uncheck()//desmarca
            .should('not.be.checked')//verifica se esta desmarcado
    })
    //14
    it('seleciona um arquivo da pasta fixtures', ()=> {
        cy.get('input[type="file"]')//pega input do tipo file
            .should('not.have.value')//verificar se ele não tem valor ainda ?
            .selectFile('./cypress/fixtures/example.json')//fazer upload de arquivos pelo caminho
            .should(($input)=> {
                expect($input[0].files[0].name).to.equal('example.json')//verifica se é o arquivo desejado
            })
    })
    //15
    it('seleciona um arquivo simulando um drag-and-drop',()=> {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop'})// simula arrastando um arquivo. 
            .should(($input)=> {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    //16
    it('seleciona um arquivo utilizando uma flexture para a qual foi dada um alias',()=>{
        cy.fixture('example.json').as('sampleFile')//pega uma fixture e da um "as" pra ela
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(($input)=> {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })
    //17
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um cliente',()=>{
        cy.get('#privacy a').should('have.attr', 'target', '_blank')// tem o atributo target com o valor blank ?
    })
    //18
    it.only('acessa a página da política de privacidade removendo o target e então clicando no link',()=>{
        cy.get('#privacy a')
            .should('have.attr', 'target', '_blank')
            .invoke('removeAttr', 'target')//remove o target fazendo com que abra o link na mesma pagina 
            .click()

        cy.contains('Talking About Testing').should('be.visible')   
    })
})










