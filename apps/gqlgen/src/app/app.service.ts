import {
  DgraphConfig,
  DgraphProvider,
  DgraphTokens,
  GraphqlSchemaConfig,
  GraphqlSchemaService,
  GraphqlSchemaTokens,
  ServerConfig,
  ServerTokens,
} from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import chokidar from 'chokidar'
import fs from 'fs'
import { ConsoleService } from 'nestjs-console'
import shell from 'shelljs'
import waitOn from 'wait-on'
import { GraphqlCodegenService } from '../graphql-codegen/graphql-codegen.service'
import { ServerService } from '../server/server.service'

export interface Options {
  watch?: boolean
  ci?: boolean
}

@Injectable()
export class AppService {
  constructor(
    private readonly consoleService: ConsoleService,
    private readonly serverService: ServerService,
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

    this.consoleService.createCommand(
      {
        command: 'e2e',
        options: [
          {
            flags: '-c, --ci',
            required: false,
            defaultValue: false,
          },
        ],
        description: 'Run Cypress e2e tests',
      },
      this.e2e.bind(this),
      cli,
    )
  }

  public async e2e({ ci }: Options) {
    /**
     * (1) Start Api & Web server
     */
    await this.serverService.maybeStartWebServer()
    await this.serverService.maybeStartApiServer()

    try {
      /**
       * (2) Wait for server
       */
      await waitOn({
        resources: [this.serverConfig.webEndpoint, this.serverConfig.endpoint],
        timeout: 60000,
      })

      /**
       * (3) Run Cypress
       */
      const cmd = 'yarn nx-env run web-e2e:e2e:ci'

      const code = shell.exec(cmd, {
        cwd: process.cwd(),
      }).code

      shell.exit(code)
    } catch (e) {
      console.error(e)
    }
  }

  public async codegen({ watch }: Options) {
    try {
      /**
       * (1) Start GraphQL server
       */
      await this.serverService.maybeStartApiServer()

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
      const apiPromise = this.graphqlCodegenService.generateApi({
        watch,
        schema: this.graphqlSchemaConfig.apiGraphqlSchemaFile,
        outputPath: this.graphqlSchemaConfig.apiCodegenOutputFile,
      })

      /**
       * (5) Graphql codegen for Dgraph
       */
      const dgraphPromise = this.graphqlCodegenService.generateDgraph({
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
}
