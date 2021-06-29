const { config } = require('dotenv')
// const { get } = require('env-var')

// config({ path: '.env.test' })
config()

// console.log(get('NODE_ENV').asString())
// console.log(get('CODELAB_DGRAPH_ENDPOINT').asString())

// Set env vars here
const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

configure({ adapter: new Adapter() })

// if (global.window !== undefined) {
//   // eslint-disable-next-line global-require
//   const MutationObserver = require('mutation-observer')

//   Object.defineProperty(window, 'matchMedia', {
//     writable: true,
//     value: jest.fn().mockImplementation((query) => ({
//       matches: false,
//       media: query,
//       onchange: null,
//       addListener: jest.fn(), // deprecated
//       removeListener: jest.fn(), // deprecated
//       addEventListener: jest.fn(),
//       removeEventListener: jest.fn(),
//       dispatchEvent: jest.fn(),
//     })),
//   })

//   Object.defineProperty(window, 'MutationObserver', { value: MutationObserver })
// }
