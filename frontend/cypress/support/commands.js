// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add("login", ({ username, password }) => {
  cy.get("#username").type(`${username}`);
  cy.get("#password").type(`${password}`);
  cy.contains("LOG IN").click();
});

Cypress.Commands.add("createBlog", ({title, author, url}) => {
  cy.contains("POST A NEW BLOG").click();
  cy.get("#title").type(`${title}`);
  cy.get("#author").type(`${author}`);
  cy.get("#url").type(`${url}`);
  cy.contains("POST BLOG").click();
});
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
