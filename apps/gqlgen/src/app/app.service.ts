import {
  DgraphConfig,
  DgraphProvider,
  DgraphTokens,
  GraphqlConfig,
  GraphqlService,
  GraphqlTokens,
  ServerConfig,
  ServerTokens,
} from '@codelab/backend'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ChildProcess } from 'child_process'
import fs from 'fs'
import { ConsoleService } from 'nestjs-console'
import path from 'path'
import shell, { ShellString } from 'shelljs'
import waitOn from 'wait-on'
import { ApiServerService } from '../api-server/api-server.service'
import { GraphqlCodegenService } from '../graphql-codegen/graphql-codegen.service'

interface Options {
  watch?: boolean
}

@Injectable()
export class AppService {
  private readonly graphqlConfig: GraphqlConfig

  private readonly serverConfig: ServerConfig

  private readonly dgraphConfig: DgraphConfig

  constructor(
    private readonly consoleService: ConsoleService,
    private readonly configService: ConfigService,
    private readonly apiServerService: ApiServerService,
    private readonly graphqlService: GraphqlService,
    @Inject(DgraphTokens.DgraphProvider)
    private readonly dgraphProvider: DgraphProvider,
    private readonly graphqlCodegenService: GraphqlCodegenService,
  ) {
    const graphqlConfig = this.configService.get<GraphqlConfig>(
      GraphqlTokens.GraphqlConfig.toString(),
    )

    const serverConfig = this.configService.get<ServerConfig>(
      ServerTokens.ServerConfig.toString(),
    )

    const dgraphConfig = this.configService.get<DgraphConfig>(
      DgraphTokens.DgraphConfig.toString(),
    )

    if (!graphqlConfig) {
      throw new Error('Missing GraphqlConfig')
    }

    if (!serverConfig) {
      throw new Error('Missing ServerConfig')
    }

    if (!dgraphConfig) {
      throw new Error('Missing DgraphConfig')
    }

    this.graphqlConfig = graphqlConfig
    this.serverConfig = serverConfig
    this.dgraphConfig = dgraphConfig

    const cli = this.consoleService.getCli()

    if (!cli) {
      return
    }

    // create a single command (See [npm commander arguments/options for more details])
    this.consoleService.createCommand(
      {
        command: 'codegen',
        options: [
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
    /**
     * (1) Start GraphQL server
     */
    await this.startServer()

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
      this.saveMergedSchema(this.dgraphConfig.schemaGeneratedFile)
      await this.dgraphProvider.updateDgraphSchema()

      /**
       * (4) Graphql codegen for API
       */
      await this.graphqlCodegenService.generateApi({
        watch,
        schema: this.graphqlConfig.apiGraphqlSchemaFile,
        outputPath: this.graphqlConfig.apiCodegenOutputFile,
      })

      /**
       * (5) Graphql codegen for Dgraph
       */
      await this.graphqlCodegenService.generateDgraph({
        watch,
        schema: this.graphqlConfig.dgraphGraphqlSchemaFile,
        outputPath: this.graphqlConfig.dgraphCodegenOutputFile,
      })

      if (!watch) {
        shell.exit(0)
      }
    } catch (e) {
      console.error(e)
    }
  }

  private saveMergedSchema(outputPath: string) {
    const mergedSchema = this.graphqlService.getMergedSchema()

    fs.writeFileSync(outputPath, mergedSchema)
  }

  /**
   * Start GraphQL server if not already running.
   */
  private async startServer() {
    const apiServerPort = parseInt(new URL(this.graphqlConfig?.endpoint).port)
    const isApiPortOpen = await this.apiServerService.isPortOpen(apiServerPort)

    if (isApiPortOpen) {
      Logger.log(`${apiServerPort} is open, starting server...`)

      return await this.apiServerService.startApiServer()
    } else {
      Logger.log(`${apiServerPort} is closed, skipping start server.`)
    }

    return
  }
}
