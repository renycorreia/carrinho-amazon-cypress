import { defineConfig } from 'cypress'

export default defineConfig({
  e2e: {
    setupNodeEvents (on, config) {
      require('@cypress/grep/src/plugin')(config)
      return config
    },
    env: {
      allureReuseAfterSpec: true,
      hideCredentials: true,
      requestMode: true
    },
    baseUrl: 'https://www.amazon.com.br/',
    redirectionLimit: 100,
    experimentalRunAllSpecs: true,
    viewportHeight: 768,
    viewportWidth: 1366
  }
})
