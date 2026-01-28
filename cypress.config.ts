import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    retries: {
      // Re-run failed tests in 'cypress run' (CI/CD) a specified number of times.
      runMode: 1,
      // No retries for 'cypress open' (Local development).
      openMode: 0,
    },
     watchForFileChanges: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
     "baseUrl": "https://free-5288352.webadorsite.com/",
  },
});
