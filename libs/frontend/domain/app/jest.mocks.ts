jest.mock('@codelab/shared/infra/fetch-server', () => ({
  gqlServerRequest: () => null,
}))
