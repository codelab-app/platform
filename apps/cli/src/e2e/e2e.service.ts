import { ServerConfig, serverConfig } from '@codelab/backend/infra'
import { Inject, Injectable } from '@nestjs/common'
import { Command, Console } from 'nestjs-console'
import shell from 'shelljs'
import waitOn from 'wait-on'
import { envOption } from '../env-helper'
import { Env } from '../environments/env'
import { ServerService } from '../server'

export interface E2eOptions {
  env: Env
}

@Console()
@Injectable()
export class E2eService {
  constructor(
    private readonly serverService: ServerService,
    @Inject(serverConfig.KEY)
    private readonly _serverConfig: ServerConfig,
  ) {}

  @Command({
    command: 'e2e',
    options: [envOption],
  })
  public async e2e({ env }: E2eOptions) {
    /**
     * (1) Start Api & Web server
     */
    await this.serverService.maybeStartWebServer(env)
    await this.serverService.maybeStartApiServer()

    try {
      /**
       * (2) Wait for server
       */
      await waitOn({
        resources: [
          this._serverConfig.webEndpoint,
          this._serverConfig.endpoint,
        ],
        timeout: 60000,
      })

      /**
       * (3) Run Cypress
       */
      const cmd = `nx affected --target=e2e --configuration=${env.toLowerCase()}`

      const code = shell.exec(cmd, {
        cwd: process.cwd(),
      }).code

      shell.exit(code)
    } catch (e) {
      console.error(e)
    }
  }
}
