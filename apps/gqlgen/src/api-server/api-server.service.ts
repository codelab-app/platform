import {
  GraphqlSchemaConfig,
  GraphqlSchemaTokens,
  GraphqlServerConfig,
  GraphqlServerTokens,
} from '@codelab/backend'
import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import portfinder from 'portfinder'
import shell from 'shelljs'

@Injectable()
export class ApiServerService {
  constructor(
    @Inject(GraphqlServerTokens.GraphqlServerConfig)
    private readonly graphqlServerConfig: ConfigType<() => GraphqlServerConfig>,
  ) {}

  private START_SERVER_COMMAND = 'node dist/apps/api/main.js'

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

  private async startApiServer() {
    return shell.exec(this.START_SERVER_COMMAND, {
      async: true,
      cwd: process.cwd(),
    })
  }
}
