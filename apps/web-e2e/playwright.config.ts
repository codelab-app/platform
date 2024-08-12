/* eslint-disable canonical/sort-keys */
import { workspaceRoot } from '@nx/devkit'
import { nxE2EPreset } from '@nx/playwright/preset'
import { defineConfig, devices } from '@playwright/test'
import * as env from 'env-var'

const apiHost = env.get('NEXT_PUBLIC_API_HOSTNAME').required().asString()
const apiPort = env.get('NEXT_PUBLIC_API_PORT').required().asString()
const apiBasePath = env.get('NEXT_PUBLIC_BASE_API_PATH').required().asString()
const apiUrl = new URL(apiBasePath, `${apiHost}:${apiPort}`).toString()
const webUrl = env.get('NEXT_PUBLIC_WEB_HOST').required().asString()

export const webBaseApiUrl = new URL(apiBasePath, webUrl).toString()

export const auth0Username = env.get('AUTH0_E2E_USERNAME').required().asString()
export const auth0Password = env.get('AUTH0_E2E_PASSWORD').required().asString()

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

export const authFile = 'apps/web-e2e/.auth/user.json'

console.log(webBaseApiUrl)

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  projects: [
    { name: 'auth setup', testMatch: /auth\.setup\.ts/ },
    {
      name: 'database setup',
      testMatch: /database\.setup\.ts/,
      dependencies: ['auth setup'],
      use: {
        storageState: authFile,
        // Requires trailing `/`
        baseURL: `${webBaseApiUrl}/`,
      },
    },
    {
      // dependencies: ['auth setup', 'database setup'],
      name: 'chromium',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: authFile,
      },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // Uncomment for mobile browsers support
    /* {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    }, */

    // Uncomment for branded browsers
    /* {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    },
    {
      name: 'Google Chrome',
      use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    } */
  ],

  timeout: 30000,

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: webUrl,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: { mode: 'on' },
  },

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: 'nx serve web -c test',
      cwd: workspaceRoot,
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      url: webUrl,
    },
    {
      command: 'nx serve api -c test',
      cwd: workspaceRoot,
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      url: apiUrl,
    },
  ],
})
