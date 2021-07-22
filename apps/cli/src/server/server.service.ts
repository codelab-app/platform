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
   * Port is controlled by env vars, so we don't need env in nrwl command like web server
   */
  private START_API_SERVER_COMMAND = 'node dist/apps/api/main.js'

  private startWebServerCommand(env: Environment) {
    return `nx run web:serve:${env.toLowerCase()}`
  }

  async isPortOpen(port: number | undefined) {
    const nextAvailablePort = await portfinder.getPortPromise({ port })

    return nextAvailablePort === port
  }

  public async maybeStartApiServer() {
    const apiServerPort = parseInt(
      new URL(this.graphqlServerConfig?.endpoint).port,
    )

    const isApiPortOpen = await this.isPortOpen(apiServerPort)

    if (isApiPortOpen) {
      Logger.log(`${apiServerPort} is open, starting server...`)

      return await this.startApiServer()
    } else {
      Logger.log(`${apiServerPort} is closed, skipping start server.`)
    }

    return
  }

  public async maybeStartWebServer(env: Environment) {
    const webServerPort = parseInt(
      new URL(get('NEXT_PUBLIC_API_ORIGIN').required().asUrlString()).port,
    )

    const isApiPortOpen = await this.isPortOpen(webServerPort)

    if (isApiPortOpen) {
      Logger.log(`${webServerPort} is open, starting server...`)

      return await this.startWebServer(env)
    } else {
      Logger.log(`${webServerPort} is closed, skipping start server.`)
    }

    return
  }

  private async startApiServer() {
    return shell.exec(this.START_API_SERVER_COMMAND, {
      async: true,
      cwd: process.cwd(),
    })
  }

  private async startWebServer(env: Environment) {
    return shell.exec(this.startWebServerCommand(env), {
      async: true,
      cwd: process.cwd(),
    })
  }
}
