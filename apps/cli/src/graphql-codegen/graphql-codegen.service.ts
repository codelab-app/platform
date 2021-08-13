import {
  dgraphConfig,
  DgraphService,
  graphqlSchemaConfig,
  GraphqlSchemaService,
  serverConfig,
} from '@codelab/backend/infra'
import { generate } from '@graphql-codegen/cli'
import { Types } from '@graphql-codegen/plugin-helpers'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import chokidar from 'chokidar'
import { merge } from 'lodash'
import { Command, Console } from 'nestjs-console'
import path from 'path'
import shell from 'shelljs'
import waitOn from 'wait-on'
import { envOption } from '../env-helper'
import { Env } from '../environments/env'
import { ServerService } from '../server'

interface BaseCodegenConfig {
  watch?: boolean
  schema: Types.Config['schema']
  outputPath: string
}

interface DgraphCodegenConfig extends BaseCodegenConfig {
  outputSchemaPath: string
}

interface ApolloCodegenConfig extends BaseCodegenConfig {
  extension: 'api' | 'd'
}

export interface CodegenOptions {
  watch: boolean
  // env: Env
}

@Console()
@Injectable()
export class GraphqlCodegenService {
  constructor(
    private readonly serverService: ServerService,
    private readonly dgraphService: DgraphService,
    @Inject(dgraphConfig.KEY)
    private readonly _dgraphConfig: ConfigType<typeof dgraphConfig>,
    @Inject(serverConfig.KEY)
    private readonly _serverConfig: ConfigType<typeof serverConfig>,
    @Inject(graphqlSchemaConfig.KEY)
    private readonly _graphqlSchemaConfig: ConfigType<
      typeof graphqlSchemaConfig
    >,
  ) {}

  @Command({
    command: 'codegen',
    options: [envOption],
  })
  public async codegen({ watch }: CodegenOptions) {
    try {
      /**
       * (1) Start GraphQL server
       */
      await this.serverService.maybeStartApiServer()

      /**
       * (2) Wait for server
       */
      await waitOn({
        resources: [this._serverConfig.endpoint],
        timeout: 20000,
      })

      /**
       * (3) Generate merged schema & update Dgraph server
       */
      await this.dgraphService.updateDqlSchema()

      // if (watch) {
      //   chokidar
      //     .watch([this._graphqlSchemaConfig.apiGraphqlSchemaFile])
      //     .on('all', async (event, _path) => {
      //       await this.dgraphService.updateDqlSchema()
      //     })
      // }

      const promises: Array<Promise<any>> = []

      /**
       * (4) Graphql codegen for API
       */
      promises.push(
        this.generateApi({
          watch,
          schema: this._graphqlSchemaConfig.apiGraphqlSchemaFile,
          outputPath: this._graphqlSchemaConfig.apiCodegenOutputFile,
        }),
      )

      await Promise.all(promises)

      shell.echo('Codegen process completed! You may Ctrl + C the terminal.')

      if (!watch) {
        shell.exit(0)
      }
    } catch (e) {
      console.error(e)
    }
  }

  public async generateApi({
    schema,
    outputPath,
    watch = false,
  }: BaseCodegenConfig) {
    const config = merge(
      GraphqlCodegenService.baseGraphqlConfig(watch),
      GraphqlCodegenService.apolloGenerateConfig({
        schema,
        outputPath,
        extension: 'api',
      }),
    )

    return await generate(config, true)
  }

  private static apolloGenerateConfig({
    schema,
    outputPath,
    extension,
  }: ApolloCodegenConfig): Types.Config {
    const documents = [
      `libs/**/modules/**/*.${extension}.graphql`,
      `apps/web/**/*.${extension}.graphql`,
      `apps/web-e2e/**/*.${extension}.graphql`,
    ]

    return {
      generates: {
        [path.resolve(process.cwd(), outputPath)]: {
          schema,
          documents,
          plugins: [
            'typescript',
            'typescript-operations',
            'typescript-react-apollo',
            'typescript-document-nodes',
          ],
          config: {
            documentVariableSuffix: 'Gql',
            gqlImport: '@apollo/client#gql',
            skipTypename: true,
            strictScalars: true,
            defaultScalarType: 'unknown',
            withRefetchFn: true,
            scalars: {
              uuid: 'string',
              json: 'Record<string, any>',
              jsonb: 'Record<string, any>',
              DateTime: 'string',
              Int64: 'number',
              _Any: 'any',
              Void: 'void',
            },
          },
        },
      },
    }
  }

  private static baseGraphqlConfig(watch: boolean): Types.Config {
    return {
      watch,
      overwrite: true,
      hooks: {
        afterAllFileWrite: [
          'yarn prettier --write',
          'yarn eslint --ext ts --fix',
        ],
      },
      generates: {},
    }
  }
}
