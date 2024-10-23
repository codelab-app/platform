// mock server modules that are not supposed to be used in client env
jest.mock('@codelab/shared/infra/fetch', () => ({
  fetchWithAuth: () => null,
}))
