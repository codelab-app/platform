import {
  DgraphConfig,
  DgraphProvider,
  DgraphTokens,
  GraphqlSchemaConfig,
  GraphqlSchemaService,
  GraphqlSchemaTokens,
  GraphqlServerConfig,
  GraphqlServerTokens,
  ServerConfig,
  ServerTokens,
} from '@codelab/backend'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService, ConfigType } from '@nestjs/config'
import chokidar from 'chokidar'
import fs from 'fs'
import { ConsoleService } from 'nestjs-console'
import shell from 'shelljs'
import waitOn from 'wait-on'
import { ApiServerService } from '../api-server/api-server.service'
import { GraphqlCodegenService } from '../graphql-codegen/graphql-codegen.service'

export interface Options {
  watch?: boolean
  e2e?: boolean
}

@Injectable()
export class AppService {
  constructor(
    private readonly consoleService: ConsoleService,
    private readonly configService: ConfigService,
    private readonly apiServerService: ApiServerService,
    private readonly graphqlSchemaService: GraphqlSchemaService,
    @Inject(DgraphTokens.DgraphProvider)
    private readonly dgraphProvider: DgraphProvider,
    private readonly graphqlCodegenService: GraphqlCodegenService,
    @Inject(GraphqlSchemaTokens.GraphqlSchemaConfig)
    private readonly graphqlSchemaConfig: ConfigType<() => GraphqlSchemaConfig>,
    @Inject(ServerTokens.ServerConfig)
    private readonly serverConfig: ConfigType<() => ServerConfig>,
    @Inject(DgraphTokens.DgraphConfig)
    private readonly dgraphConfig: ConfigType<() => DgraphConfig>,
  ) {
    const cli = this.consoleService.getCli()

    if (!cli) {
      return
    }

    this.consoleService.createCommand(
      {
        command: 'codegen',
        options: [
          {
            flags: '-e, --e2e',
            required: false,
            defaultValue: false,
          },
          {
            flags: '-w, --watch',
            required: false,
            defaultValue: false,
          },
        ],
        description: 'Run codegen for GraphQL',
      },
      this.codegen.bind(this),
      cli,
    )
  }

  public async codegen({ watch }: Options) {
    console.log(this.dgraphConfig)

    /**
     * (1) Start GraphQL server
     */
    await this.apiServerService.maybeStartApiServer()

    try {
      /**
       * (2) Wait for server
       */
      await waitOn({
        resources: [this.serverConfig.endpoint],
        timeout: 10000,
      })

      /**
       * (3) Generate merged schema & update Dgraph server
       */

      const generateAndUpdateDgraphSchema = async () => {
        this.saveMergedSchema(this.dgraphConfig.schemaGeneratedFile)
        await this.dgraphProvider.updateDgraphSchema()
      }

      if (watch) {
        chokidar
          .watch([
            this.dgraphConfig.schemaFile,
            this.graphqlSchemaConfig.apiGraphqlSchemaFile,
          ])
          .on('all', async (event, _path) => {
            console.log(event, _path)
            await generateAndUpdateDgraphSchema()
          })
      } else {
        await generateAndUpdateDgraphSchema()
      }

      /**
       * (4) Graphql codegen for API
       */
      await this.graphqlCodegenService.generateApi({
        watch,
        schema: this.graphqlSchemaConfig.apiGraphqlSchemaFile,
        outputPath: this.graphqlSchemaConfig.apiCodegenOutputFile,
      })

      /**
       * (5) Graphql codegen for Dgraph
       */
      await this.graphqlCodegenService.generateDgraph({
        watch,
        schema: this.graphqlSchemaConfig.dgraphGraphqlSchemaFile,
        outputPath: this.graphqlSchemaConfig.dgraphCodegenOutputFile,
      })

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
}
