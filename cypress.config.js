const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
<<<<<<< HEAD
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:5501",
=======
    // Use Vite's default dev server port
   
    
    // Update spec pattern
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.js",
    
    setupNodeEvents(on, config) {
      // implement node event listeners here
      return config;
    },
>>>>>>> 22f8967be4388edf50fc9759d0c7215ed9c1d1f9
  },
});