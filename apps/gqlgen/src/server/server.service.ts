import { GraphqlServerConfig, GraphqlServerTokens } from '@codelab/backend'
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

  private START_API_SERVER_COMMAND = 'node dist/apps/api/main.js'

  private START_WEB_SERVER_COMMAND = 'nx serve web'

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

  public async maybeStartWebServer() {
    const webServerPort = parseInt(
      new URL(get('NEXT_PUBLIC_API_ORIGIN').required().asUrlString()).port,
    )

    const isApiPortOpen = await this.isPortOpen(webServerPort)

    if (isApiPortOpen) {
      Logger.log(`${webServerPort} is open, starting server...`)

      return await this.startWebServer()
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

  private async startWebServer() {
    return shell.exec(this.START_WEB_SERVER_COMMAND, {
      async: true,
      cwd: process.cwd(),
    })
  }
}
