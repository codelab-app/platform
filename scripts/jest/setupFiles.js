import { TextDecoder, TextEncoder } from 'util'

require('reflect-metadata')

/**
 * https://stackoverflow.com/questions/68468203/why-am-i-getting-textencoder-is-not-defined-in-jest
 */
Object.assign(global, { TextDecoder, TextEncoder })

const { config } = require('dotenv')
const fs = require('fs')
const path = require('path')

// Only load if test env & file exists
if (process.env.NODE_ENV === 'test') {
  const envPath = path.resolve(__dirname, '../../.env.test')

  if (fs.existsSync(envPath)) {
    config({ path: envPath })
  }

  const platformApiEnvPath = path.resolve(
    __dirname,
    '../../apps/platform-api/.env.test',
  )

  if (fs.existsSync(platformApiEnvPath)) {
    config({ path: platformApiEnvPath })
  }
}

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation((query) => ({
    addEventListener: jest.fn(),
    addListener: jest.fn(),
    dispatchEvent: jest.fn(),
    matches: false,
    media: query,
    onchange: null,
    removeEventListener: jest.fn(),
    removeListener: jest.fn(),
  })),
  writable: true,
})

