/* eslint-disable perfectionist/sort-objects */
import { workspaceRoot } from '@nx/devkit'
import { nxE2EPreset } from '@nx/playwright/preset'
import { defineConfig, devices } from '@playwright/test'

import { apiUrl, ci, storageStateFile, webUrl } from './src/setup/config'
import { localStorageTestFile } from './src/tools/local-storage.fixture'

/**
 * https://www.checklyhq.com/blog/why-page-goto-is-slowing-down-your-playwright-test/
 */

enum Project {
  AuthSetup = 'AuthSetup',
  LocalStorage = 'LocalStorage',
}

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  globalSetup: require.resolve('./src/setup/global-setup'),
  projects: [
    {
      name: Project.AuthSetup,
      testMatch: /auth\.setup\.ts/,
      use: {},
    },
    {
      dependencies: [Project.AuthSetup],
      name: 'chromium',
      testIgnore: /home\.spec\.ts|local-storage\.spec\.ts/,
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        // channel: 'chrome',
        storageState: storageStateFile,
      },
    },
    {
      name: 'home',
      testMatch: /home\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: Project.LocalStorage,
      testMatch: /local-storage\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: localStorageTestFile,
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
  reporter: ci
    ? [
        ['list', { printSteps: true }],
        // Allows for separate report per machine
        ['html', { open: 'never', outputFolder: '../../tmp/reports/e2e' }],
        ['junit', { outputFile: '../../tmp/reports/e2e/junit/results.xml' }],
        // Allows for a unified report
        // ['blob', { outputDir: '../../tmp/reports/e2e/all-blob-reports' }],
      ]
    : [
        ['list', { printSteps: true }],
        ['html', { open: 'never', outputFolder: '../../tmp/reports/e2e' }],
        ['junit', { outputFile: '../../tmp/reports/e2e/results.xml' }],
      ],

  /**
   * Takes long to fail if retrying, and we shouldn't need to rely on retry
   */
  retries: ci ? 0 : 0,

  /**
   * Includes hooks
   *
   * Increase to high timeout locally if you need to view console in the popup browser, sometimes there isn't enough time for it to stay open
   *
   * On CI better to leave it lower, so it fails fast. Longer specs should be broken into smaller specs, or the timeout added in the spec.
   */
  timeout: ci ? 60_000 : 120_000,

  expect: {
    timeout: ci ? 30_000 : 120_000,
  },

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: webUrl,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    video: { mode: 'on' },
    // launchOptions: {
    //   logger: {
    //     isEnabled: (name: string) => {
    //       return true
    //       // return name === 'api'
    //     },
    //     log: (
    //       name: string,
    //       severity: 'error' | 'info' | 'verbose' | 'warning',
    //       message: string,
    //       args: Array<any>,
    //     ) => console.log(`${name} ${severity} ${message} ${args.join(' ')}`),
    //   },
    // },
  },

  /* Run your local dev server before starting the tests */
  webServer: [
    {
      command: `nx serve web -c ${process.env.CI ? 'ci' : 'test'}`,
      cwd: workspaceRoot,
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      timeout: 90 * 1000,
      url: webUrl,
    },
    {
      command: `nx serve api -c ${process.env.CI ? 'ci' : 'test'}`,
      cwd: workspaceRoot,
      reuseExistingServer: !process.env.CI,
      stdout: 'pipe',
      timeout: 90 * 1000,
      url: apiUrl,
    },
  ],
})
