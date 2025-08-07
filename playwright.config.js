const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3000',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...require('@playwright/test').devices['Desktop Chrome'] },
    },
  ],
});
