import { Provider } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import {
  clientStubFromCloudEndpoint,
  DgraphClient,
  DgraphClientStub,
  Operation,
} from 'dgraph-js'
import { promises as fs } from 'fs'
import fetch from 'node-fetch'
import shell from 'shelljs'
import { DgraphConfig } from './config/dgraph.config'
import { DgraphTokens } from './config/dgraph.tokens'

export interface DgraphProvider {
  client: DgraphClient
  /** Drops just the data, without the schema */
  resetDb: () => Promise<any>
  updateDgraphSchema: () => void
}

type UpdateDgraphSchemaConfig = {
  endpoint: string
  schemaFile: string
  apiKey?: string
}

const updateSchema = async ({
  endpoint,
  schemaFile,
  apiKey,
}: UpdateDgraphSchemaConfig) => {
  if (apiKey) {
    const file = await fs.readFile(schemaFile)
    const schema = file.toString()

    const query = `
    mutation($sch: String!) {
      updateGQLSchema(input: { set: { schema: $sch } })
      {
        gqlSchema {
          schema
        }
      }
    }`

    await fetch(new URL('admin', endpoint).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': apiKey,
      },
      body: JSON.stringify({
        query,
        variables: {
          sch: schema,
        },
      }),
    })
  } else {
    const cmd = `curl -X POST ${new URL(
      'admin/schema',
      endpoint,
    ).toString()} --data-binary '@${schemaFile}'`

    if (!shell.exec(cmd)) {
      shell.echo('Codegen failed')
      shell.exit(1)
    }
  }
}

export const dgraphClientProvider: Provider<DgraphProvider> = {
  provide: DgraphTokens.DgraphProvider,
  useFactory: (dgraphConfig: ConfigType<() => DgraphConfig>) => {
    if (!dgraphConfig) {
      throw new Error('Missing DgraphConfig')
    }

    let clientStub: DgraphClientStub

    if (dgraphConfig.apiKey) {
      clientStub = clientStubFromCloudEndpoint(
        dgraphConfig.endpoint,
        dgraphConfig.apiKey,
      )
    } else {
      clientStub = new DgraphClientStub(dgraphConfig?.grpcEndpoint)
    }

    const dgraphClient = new DgraphClient(clientStub)

    return {
      client: dgraphClient,
      updateDgraphSchema: async () =>
        updateSchema({
          endpoint: dgraphConfig?.endpoint,
          schemaFile: dgraphConfig?.schemaGeneratedFile,
          apiKey: dgraphConfig?.apiKey,
        }),
      resetDb: async () => {
        const op = new Operation()

        op.setDropOp(Operation.DropOp.DATA) // <- deletes just the data
        // op.setDropAll(true) // <- deletes schema and data

        await dgraphClient.alter(op)

        return updateSchema({
          endpoint: dgraphConfig?.endpoint,
          schemaFile: dgraphConfig?.schemaGeneratedFile,
          apiKey: dgraphConfig?.apiKey,
        })
      },
    }
  },
  inject: [DgraphTokens.DgraphConfig],
}
