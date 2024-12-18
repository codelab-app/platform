import type { endpointConfig } from '@codelab/backend/infra/core'
import type { INestApplication } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'

import { ENDPOINT_CONFIG_KEY } from '@codelab/backend/infra/core'
import { ConfigService } from '@nestjs/config'

export const startServer = async (app: INestApplication) => {
  const configService = app.get(ConfigService)

  const config: ConfigType<typeof endpointConfig> =
    configService.getOrThrow(ENDPOINT_CONFIG_KEY)

  const baseApiPath = config.baseApiPath
  const port = config.apiPort

  console.log('baseApiPath', baseApiPath)
  console.log('port', port)

  app.setGlobalPrefix(baseApiPath)

  /**
   * Need this for the CQRS handler to be loaded
   *
   * https://github.com/nestjs/cqrs/issues/119#issuecomment-1181596376
   */

  await app.init()

  /**
   * Need to start server
   */

  await app.listen(port)

  // Test if port is working by trying to connect
  try {
    const url = `http://127.0.0.1:${port}/api/v1/healthcheck`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`Failed to connect to ${url}`)
    }
  } catch (error) {
    console.log(error)
    throw new Error(
      `Could not connect to port ${port}: ${(error as Error).message}`,
    )
  }
}
