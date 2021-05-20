require('dotenv').config()

const { DgraphClientStub, DgraphClient } = require('dgraph-js-http')
const mutation = require('./seedMutation.js')

const clientStub = new DgraphClientStub(
  process.env.CODELAB_DGRAPH_GRAPHQL_ENDPOINT.replace('/graphql', ''),
)

const dgraphClient = new DgraphClient(clientStub)

async function seed() {
  const txn = dgraphClient.newTxn()
  try {
    await txn.mutate({ setNquads: mutation })

    // Commit transaction.
    await txn.commit()
  } finally {
    await txn.discard()
  }

  console.log('Dgraph seeded successfully')
}

seed()
