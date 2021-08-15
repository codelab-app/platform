import {
  dgraphConfig,
  DgraphService,
  graphqlSchemaConfig,
  serverConfig,
} from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Command, Console } from 'nestjs-console'
import shell from 'shelljs'
import waitOn from 'wait-on'
import { envOption } from '../env-helper'
import { ServerService } from '../server'

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

      /**
       * (4) Graphql codegen for API
       */
      if (shell.exec('yarn codegen').code !== 0) {
        shell.exit(1)
      }

      shell.echo('Codegen process completed! You may Ctrl + C the terminal.')
    } catch (e) {
      console.error(e)
    }
  }
}
