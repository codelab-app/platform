import { Provider } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DgraphClient, DgraphClientStub } from 'dgraph-js-http'
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
  useFactory: (configService: ConfigService) => {
    const config = configService.get<DgraphConfig>(
      DgraphTokens.DgraphConfig.toString(),
    )

    if (!config) {
      throw new Error('Missing DgraphConfig')
    }

    const clientStub = new DgraphClientStub(config?.endpoint)
    const dgraphClient = new DgraphClient(clientStub)

    return {
      client: dgraphClient,
      updateDgraphSchema: () =>
        updateSchema({
          endpoint: config?.endpoint,
          schemaFile: config?.schemaGeneratedFile,
        }),
      resetDb: () =>
        dgraphClient.alter({
          schema: '{"drop_op": "DATA"}',
        }),
    }
  },
  inject: [ConfigService],
}
