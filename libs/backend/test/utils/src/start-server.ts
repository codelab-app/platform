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

  app.setGlobalPrefix(baseApiPath)

  /**
   * Need this for the CQRS handler to be loaded
   *
   * https://github.com/nestjs/cqrs/issues/119#issuecomment-1181596376
   */
  await app.init()

  // Only listen if not already listening
  if (!app.getHttpServer().listening) {
    await app.listen(port)
  }

  // Wait for 20 seconds to allow server to fully start up
  // await new Promise((resolve) => setTimeout(resolve, 20000))

  // Test if port and playground are working by trying to connect
  try {
    const url = `http://127.0.0.1:${port}/api/v1/graphql`

    const response = await fetch(url, {
      headers: {
        Accept: 'text/html',
      },
    })

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
