import { Provider } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { DgraphClient, DgraphClientStub, Operation } from 'dgraph-js'
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
}

const updateSchema = ({ endpoint, schemaFile }: UpdateDgraphSchemaConfig) => {
  if (
    !shell.exec(
      `curl -X POST ${new URL(
        'admin/schema',
        endpoint,
      ).toString()} --data-binary '@${schemaFile}'`,
    )
  ) {
    shell.echo('Codegen failed')
    shell.exit(1)
  }
}

export const dgraphClientProvider: Provider<DgraphProvider> = {
  provide: DgraphTokens.DgraphProvider,
  useFactory: (dgraphConfig: ConfigType<() => DgraphConfig>) => {
    if (!dgraphConfig) {
      throw new Error('Missing DgraphConfig')
    }

    const clientStub = new DgraphClientStub(dgraphConfig?.grpcEndpoint)
    const dgraphClient = new DgraphClient(clientStub)

    return {
      client: dgraphClient,
      updateDgraphSchema: () =>
        updateSchema({
          endpoint: dgraphConfig?.endpoint,
          schemaFile: dgraphConfig?.schemaGeneratedFile,
        }),
      //
      resetDb: async () => {
        const op = new Operation()
        // op.setDropOp(Operation.DropOp.DATA) <- deletes just the data
        op.setDropOp(Operation.DropOp.ALL) // <- deletes schema and data

        await dgraphClient.alter(op)

        return updateSchema({
          endpoint: dgraphConfig?.endpoint,
          schemaFile: dgraphConfig?.schemaGeneratedFile,
        })
      },
    }
  },
  inject: [DgraphTokens.DgraphConfig],
}
