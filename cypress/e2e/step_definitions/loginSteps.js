const { Given, When, Then } = require("cypress-cucumber-preprocessor/steps")
const { expect } = require("chai")
const { readCSV } = require('../../support/dataUtils')

// Given the user is on the login page
Given('the user is on the login page', () => {
  cy.visit('https://www.saucedemo.com/')
})

// When the user logs in with username and password
When('the user logs in with username {string} and password {string}', (username, password) => {
  cy.get('#user-name').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})

// When the user adds items to the cart
When('the user adds {string}, {string}, {string}, {string} to the cart', (item1, item2, item3, item4) => {
  cy.get(`[data-test="add-to-cart-${item1.toLowerCase().replace(/\s+/g, '-')}"`).click()
  cy.get(`[data-test="add-to-cart-${item2.toLowerCase().replace(/\s+/g, '-')}"`).click()
  cy.get(`[data-test="add-to-cart-${item3.toLowerCase().replace(/\s+/g, '-')}"`).click()
  // cy.get(`[data-test="add-to-cart-${item4.toLowerCase().replace(/\s+/g, '-')}"`).click()

  cy.get('.shopping_cart_link').click() // Go to the cart
})

// And the items are present in the CSV file
When('the items are present in the CSV file {string}', (csvFileName) => {
  // readCSV(csvFileName, (items) => {
  //   items.forEach(item => {
  //     cy.contains(item).should('exist') // Check if each item is present on the page
  //   })
  // })
})

// Then the items should be present in the cart
Then('the items should be present in the cart', () => {
  cy.get('.cart_item').should('contain', 'Sauce Labs Backpack')
  cy.get('.cart_item').should('contain', 'Sauce Labs Bike Light')
  cy.get('.cart_item').should('contain', 'Sauce Labs Bolt T-Shirt')
  // cy.get('.cart_item').should('contain', 'MRF Bat')
})

// When the user removes an item from the cart
When('the user removes {string} from the cart', (item) => {
  cy.get('.cart_item').contains(item).parent().find('button').click() // Remove item
})

// When the user proceeds to checkout and enters personal details
When('the user proceeds to checkout and enters {string}, {string}, {string}', (firstName, lastName, zipCode) => {
  cy.get('#checkout').click()
  cy.get('#first-name').type(firstName)
  cy.get('#last-name').type(lastName)
  cy.get('#postal-code').type(zipCode)
  cy.get('#continue').click()
})

// And the user removes an item during checkout
When('the user removes {string} during checkout', (item) => {
  cy.contains('.inventory_item_name', item).click()
  cy.get('#remove').click()
})

// When the user proceeds to the final checkout
When('the user proceeds to the final checkout', () => {
  cy.go('back')
  cy.get('.summary_total_label').invoke('text').then((text) => {
    const total = parseFloat(text.replace('Total: $', ''))
    Cypress.env('totalPrice', total) // Store total price in a global variable
  })
})

// Then if the total price is less than $40, the user clicks "Finish"
Then('if the total price is less than $40, the user clicks "Finish"', () => {
  const total = Cypress.env('totalPrice') // Retrieve total price from the global variable
  if (total < 40) {
    cy.get('#finish').click()
  }
})

// And the user should see "Thank you for your order!"
Then('the user should see "Thank you for your order!"', () => {
  cy.get('.complete-header').should('contain.text', 'Thank you for your order!')
})

// And if the total price is greater than $40, the user clicks "Cancel"
Then('if the total price is greater than $40, the user clicks "Cancel"', () => {
  const total = Cypress.env('totalPrice') // Retrieve total price from the global variable
  if (total >= 40) {
    cy.get('#cancel').click()
  }
})

// When the user navigates back to the home page
When('the user navigates back to the home page', () => {
  cy.get('#back-to-products').click()
})

// And the user logs out
When('the user logs out', () => {
  cy.get('#react-burger-menu-btn').click()
  cy.get('#logout_sidebar_link').click()
})
