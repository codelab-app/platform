import {
  Environment,
  GraphqlServerConfig,
  GraphqlServerTokens,
} from '@codelab/backend'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { get } from 'env-var'
import portfinder from 'portfinder'
import shell from 'shelljs'

@Injectable()
export class ServerService {
  constructor(
    @Inject(GraphqlServerTokens.GraphqlServerConfig)
    private readonly graphqlServerConfig: ConfigType<() => GraphqlServerConfig>,
  ) {}

  /**
   * We load `.env.test` locally, if on CI, that file gets ignored
   */
  private START_API_SERVER_COMMAND =
    // 'npx env-cmd -f .env.test node dist/apps/api/main.js'
    'node dist/apps/api/main.js'

  private START_WEB_SERVER_COMMAND =
    // 'yarn nx-env run web:serve:ci'
    'yarn nx-env run web:serve:ci'

  async isPortOpen(port: number | undefined) {
    const nextAvailablePort = await portfinder.getPortPromise({ port })

    return nextAvailablePort === port
  }

  public async maybeStartApiServer(environment: Environment) {
    const apiServerPort = parseInt(
      new URL(this.graphqlServerConfig?.endpoint).port,
    )

    const isApiPortOpen = await this.isPortOpen(apiServerPort)

    if (isApiPortOpen) {
      Logger.log(`${apiServerPort} is open, starting server...`)

      return await this.startApiServer(environment)
    } else {
      Logger.log(`${apiServerPort} is closed, skipping start server.`)
    }

    return
  }

  public async maybeStartWebServer(environment: Environment) {
    const webServerPort = parseInt(
      new URL(get('NEXT_PUBLIC_API_ORIGIN').required().asUrlString()).port,
    )

    const isApiPortOpen = await this.isPortOpen(webServerPort)

    if (isApiPortOpen) {
      Logger.log(`${webServerPort} is open, starting server...`)

      return await this.startWebServer(environment)
    } else {
      Logger.log(`${webServerPort} is closed, skipping start server.`)
    }

    return
  }

  private async startApiServer(environment: Environment) {
    const command =
      environment === Environment.Ci
        ? `npx env-cmd -f .env.test ${this.START_API_SERVER_COMMAND}`
        : `${this.START_API_SERVER_COMMAND}`

    return shell.exec(command, {
      async: true,
      cwd: process.cwd(),
    })
  }

  private async startWebServer(environment: Environment) {
    return shell.exec(this.START_WEB_SERVER_COMMAND, {
      async: true,
      cwd: process.cwd(),
    })
  }
}
