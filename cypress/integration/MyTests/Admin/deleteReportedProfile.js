import selectors from 'E:/UNI/Year 2/SPRING 2022/CMPN203, Software Engineering/CypressTesting/cypress/support/selectors.js';


/// <reference types="cypress-xpath" />

describe('Admin reports', () => {


    it('delete reported tweet', () => {

        //log in
        cy.visit('/', {failOnStatusCode: false});
        cy.xpath(selectors.username).type('admintag1').should('have.value', 'admintag1')
        cy.xpath(selectors.password).type('qwertyuiop123456').should('have.value', 'qwertyuiop123456')
        cy.xpath(selectors.login).click()

       //open reports
        cy.xpath(selectors.reportsIcon).click()
        cy.location('pathname').should('eq', '/ReportsPage')
        
        //open reported profiles
        cy.xpath(selectors.reportedProfiles).click()
        cy.xpath(selectors.reportedProfile).should('be.empty')

        //delete tweet
        cy.xpath(selectors.deleteReportTweet).click()

        //check if deleted
        cy.xpath(selectors.reportedProfileDeleteCheck).should('have.text', 'Aron1')

    })
})

