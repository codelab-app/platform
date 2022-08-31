if (typeof window === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { server } = require('./mocks/server')
  server.listen()
} else {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { server } = require('./mocks/server')
  server.listen()
}

export {}
