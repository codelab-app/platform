const { configure } = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

require('dotenv').config({ path: '.env' })

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
