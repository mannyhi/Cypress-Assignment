const { defineConfig } = require("cypress");
const cucumber = require("cypress-cucumber-preprocessor").default;
const allureWriter = require("@shelex/cypress-allure-plugin/writer");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.saucedemo.com/",
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: false,
    setupNodeEvents(on, config) {
      on("file:preprocessor", cucumber()); // Set up Cucumber preprocessor
      allureWriter(on, config); // Set up Allure reporting
      return config;
    },
    screenshotOnRunFailure: true, // Enable screenshot capture on failure
    video: false, // Disable video recording if not needed
  },
});
