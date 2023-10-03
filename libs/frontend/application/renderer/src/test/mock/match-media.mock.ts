/**
 * Editorjs uses browser-specific APIS i.e. window.matchMedia, which are not available in JSDOM (the DOM implementation used by Jest).
 * This mock is to provide a matchMedia implementation for JSDOM.
 * Official docs: https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
 */

// eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
if (!window.matchMedia) {
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
}
