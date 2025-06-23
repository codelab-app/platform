// mock server modules that are not supposed to be used in client env
jest.mock('@codelab/shared-infra-fetch', () => ({
  fetchWithAuth: () => null,
  gqlRequest: () => null,
}))

jest.mock('@codelab/shared-infra-fetch-server', () => ({
  gqlServerRequest: () => null,
  serverFetchWithAuth: () => null,
}))

jest.mock('next/cache', () => ({
  revalidateTag: () => null,
}))
