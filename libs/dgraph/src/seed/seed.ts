import { DgraphClient, DgraphClientStub } from 'dgraph-js-http'
import { config } from 'dotenv'
import { mutation } from './seedMutation'

config()

const clientStub = new DgraphClientStub(
  process.env.CODELAB_DGRAPH_GRAPHQL_ENDPOINT?.replace('/graphql', ''),
)

const dgraphClient = new DgraphClient(clientStub)

const seed = async () => {
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
