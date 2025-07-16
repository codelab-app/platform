// mock server modules that are not supposed to be used in client env
jest.mock('@codelab/shared-infra-fetch', () => ({
  fetchWithAuth: () => null,
  gqlRequest: () => null,
}))

jest.mock('@codelab/shared-infra-fetch-server', () => ({
  fetchWithAuth: () => null,
  gqlServerRequest: () => null,
}))

jest.mock('next/cache', () => ({
  revalidateTag: () => null,
}))

// mock hooks that are not supported in jsdom env
jest.mock('next/navigation', () => ({
  useParams: jest.fn().mockReturnValue({}),
  useSearchParams: jest.fn().mockReturnValue({}),
}))
