import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
     watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
     "baseUrl": "https://free-5288352.webadorsite.com/",
  },
});
