import { DgraphClient, DgraphClientStub } from 'dgraph-js-http'

console.log(DgraphClientStub)

const clientStub = new DgraphClientStub('http://127.0.0.1:8081', {
  legacyApi: false,
})

export const dgraphClient = new DgraphClient(clientStub)
