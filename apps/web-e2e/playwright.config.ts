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
export const apiBaseUrl = new URL(apiBasePath, apiUrl).toString()

export const auth0Username = env.get('AUTH0_E2E_USERNAME').required().asString()
export const auth0Password = env.get('AUTH0_E2E_PASSWORD').required().asString()

/**
 * https://www.checklyhq.com/blog/why-page-goto-is-slowing-down-your-playwright-test/
 */

export const authFile = 'apps/web-e2e/.auth/user.json'

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  projects: [
    {
      name: 'auth setup',
      testMatch: /auth\.setup\.ts/,
      use: {},
    },
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
      dependencies: ['auth setup', 'database setup'],
      name: 'chromium',
      testIgnore: /home\.spec\.ts/,
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        // channel: 'chrome',
        storageState: authFile,
      },
    },
    {
      name: 'home',
      testMatch: /home\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
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

  timeout: 60000,

  retries: process.env.CI ? 0 : 1,

  expect: {
    timeout: process.env.CI ? 10000 : 5000,
  },

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
      command: `nx serve web -c ${process.env.CI ? 'ci' : 'test'} --verbose`,
      cwd: workspaceRoot,
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      url: webUrl,
      timeout: 90 * 1000,
    },
    {
      command: `nx serve api -c ${process.env.CI ? 'ci' : 'test'} --verbose`,
      cwd: workspaceRoot,
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      url: apiUrl,
      timeout: 90 * 1000,
    },
  ],
})
