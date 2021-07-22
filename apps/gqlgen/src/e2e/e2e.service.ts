import { Environment, ServerConfig, ServerTokens } from '@codelab/backend'
import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { Command, Console } from 'nestjs-console'
import shell from 'shelljs'
import waitOn from 'wait-on'
import { envOption } from '../env-helper'
import { ServerService } from '../server'

export interface E2eOptions {
  env: Environment
}

@Console()
@Injectable()
export class E2eService {
  constructor(
    private readonly serverService: ServerService,
    @Inject(ServerTokens.ServerConfig)
    private readonly serverConfig: ConfigType<() => ServerConfig>,
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
    await this.serverService.maybeStartApiServer(env)

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
      const cmd =
        env === Environment.Ci
          ? `yarn nx-env affected --target=e2e --configuration=local`
          : `yarn nx-env affected --target=e2e --configuration=local`

      const code = shell.exec(cmd, {
        cwd: process.cwd(),
      }).code

      shell.exit(code)
    } catch (e) {
      console.error(e)
    }
  }
}
