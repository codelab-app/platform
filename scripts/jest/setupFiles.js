const { TextDecoder, TextEncoder } = require('util')
const path = require('path')
const fs = require('fs')
const { config } = require('dotenv')

require('reflect-metadata')

/**
 * https://stackoverflow.com/questions/68468203/why-am-i-getting-textencoder-is-not-defined-in-jest
 */
Object.assign(global, { TextDecoder, TextEncoder })

// Only load if test env & file exists

if (process.env.NODE_ENV === 'test') {
  const envPath = path.resolve(__dirname, '../../.env.test')

  if (fs.existsSync(envPath)) {
    config({ path: envPath, override: true })
  }

  const apiEnvPath = path.resolve(__dirname, '../../apps/api/.env.test')

  if (fs.existsSync(apiEnvPath)) {
    config({ path: apiEnvPath, override: true })
  }
}

// https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
if (typeof window !== 'undefined') {
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

  // mock gqlFetch because it is a server action which isn't supported by jest
  jest.mock('@codelab/frontend/infra/graphql', () => null)
  jest.mock('@codelab/frontend/infra/graphql/client', () => null)

}
