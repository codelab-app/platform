import {
  DgraphConfig,
  DgraphProvider,
  DgraphTokens,
  Environment,
  GraphqlSchemaConfig,
  GraphqlSchemaService,
  GraphqlSchemaTokens,
  ServerConfig,
  ServerTokens,
} from '@codelab/backend'
import { generate } from '@graphql-codegen/cli'
import { Types } from '@graphql-codegen/plugin-helpers'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import chokidar from 'chokidar'
import fs from 'fs'
import { merge } from 'lodash'
import { Command, Console } from 'nestjs-console'
import path from 'path'
import shell from 'shelljs'
import waitOn from 'wait-on'
import { envOption } from '../env-helper'
import { ServerService } from '../server/server.service'

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
  env: Environment
}

@Console()
@Injectable()
export class GraphqlCodegenService {
  constructor(
    private readonly serverService: ServerService,
    @Inject(DgraphTokens.DgraphProvider)
    private readonly dgraphProvider: DgraphProvider,
    @Inject(DgraphTokens.DgraphConfig)
    private readonly dgraphConfig: ConfigType<() => DgraphConfig>,
    @Inject(ServerTokens.ServerConfig)
    private readonly serverConfig: ConfigType<() => ServerConfig>,
    @Inject(GraphqlSchemaTokens.GraphqlSchemaConfig)
    private readonly graphqlSchemaConfig: ConfigType<() => GraphqlSchemaConfig>,
    private readonly graphqlSchemaService: GraphqlSchemaService,
  ) {}

  @Command({
    command: 'codegen',
    options: [envOption],
  })
  public async codegen({ watch, env }: CodegenOptions) {
    try {
      /**
       * (1) Start GraphQL server
       */
      await this.serverService.maybeStartApiServer(env)

      /**
       * (2) Wait for server
       */
      await waitOn({
        resources: [this.serverConfig.endpoint],
        timeout: 20000,
      })

      /**
       * (3) Generate merged schema & update Dgraph server
       */

      const generateAndUpdateDgraphSchema = () => {
        this.saveMergedSchema(this.dgraphConfig.schemaGeneratedFile)
        this.dgraphProvider.updateDgraphSchema()
      }

      generateAndUpdateDgraphSchema()

      if (watch) {
        chokidar
          .watch([
            this.dgraphConfig.schemaFile,
            this.graphqlSchemaConfig.apiGraphqlSchemaFile,
          ])
          .on('all', async (event, _path) => {
            console.log(event, _path)
            generateAndUpdateDgraphSchema()
          })
      }

      /**
       * (4) Graphql codegen for API
       */
      const apiPromise = this.generateApi({
        watch,
        schema: this.graphqlSchemaConfig.apiGraphqlSchemaFile,
        outputPath: this.graphqlSchemaConfig.apiCodegenOutputFile,
      })

      /**
       * (5) Graphql codegen for Dgraph
       */
      const dgraphPromise = this.generateDgraph({
        watch,
        schema: {
          [this.dgraphConfig.graphqlEndpoint]: {},
        },
        outputPath: this.graphqlSchemaConfig.dgraphCodegenOutputFile,
        outputSchemaPath: this.graphqlSchemaConfig.dgraphGraphqlSchemaFile,
      })

      await Promise.all([apiPromise, dgraphPromise])

      shell.echo('Codegen process completed! You may Ctrl + C the terminal.')

      if (!watch) {
        shell.exit(0)
      }
    } catch (e) {
      console.error(e)
    }
  }

  private saveMergedSchema(outputPath: string) {
    const mergedSchema = this.graphqlSchemaService.getMergedSchema()

    fs.writeFileSync(outputPath, mergedSchema)
  }

  public async generateApi({
    schema,
    outputPath,
    watch = false,
  }: BaseCodegenConfig) {
    const config = merge(
      this.baseGraphqlConfig(watch),
      this.apolloGenerateConfig({
        schema,
        outputPath,
        extension: 'api',
      }),
    )

    return await generate(config, true)
  }

  public async generateDgraph({
    schema,
    outputPath,
    outputSchemaPath,
    watch = false,
  }: DgraphCodegenConfig) {
    return await generate(
      merge(
        this.baseGraphqlConfig(watch),
        this.apolloGenerateConfig({
          schema,
          outputPath,
          extension: 'd',
        }),
        this.schemaGenerateConfig({
          outputSchemaPath,
          outputPath,
          schema,
        }),
      ),
      true,
    )
  }

  private apolloGenerateConfig({
    schema,
    outputPath,
    extension,
  }: ApolloCodegenConfig): Types.Config {
    const documents = [
      `libs/modules/**/*.${extension}.graphql`,
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
            },
          },
        },
      },
    }
  }

  private baseGraphqlConfig(watch: boolean): Types.Config {
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

  private schemaGenerateConfig({
    outputSchemaPath,
    schema,
  }: DgraphCodegenConfig): Types.Config {
    return {
      generates: {
        [path.resolve(process.cwd(), outputSchemaPath)]: {
          schema,
          plugins: ['schema-ast'],
        },
      },
    }
  }
}
