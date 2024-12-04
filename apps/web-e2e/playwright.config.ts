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

enum Project {
  AuthSetup = 'AuthSetup',
  DatabaseSetup = 'DatabaseSetup',
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  projects: [
    {
      name: Project.AuthSetup,
      testMatch: /auth\.setup\.ts/,
      use: {},
    },
    {
      dependencies: [Project.AuthSetup],
      name: Project.DatabaseSetup,
      testMatch: /database\.setup\.ts/,
      use: {
        // Requires trailing `/`
        baseURL: `${webBaseApiUrl}/`,
        storageState: authFile,
      },
    },
    {
      dependencies: [Project.AuthSetup, Project.DatabaseSetup],
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

  // reporter: [['list'], ['html']],

  retries: process.env.CI ? 1 : 0,

  timeout: process.env.CI ? 60000 : 60000,

  expect: {
    timeout: process.env.CI ? 60000 : 60000,
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
      timeout: 90 * 1000,
      url: webUrl,
    },
    {
      command: `nx serve api -c ${process.env.CI ? 'ci' : 'test'} --verbose`,
      cwd: workspaceRoot,
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      timeout: 90 * 1000,
      url: apiUrl,
    },
  ],
})
