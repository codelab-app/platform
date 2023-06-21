import { Logger } from '@nestjs/common'
import type { ConfigType } from '@nestjs/config'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import { CommandFactory } from 'nest-commander'
import { AppModule } from './app/app.module'
import type { graphqlConfig } from './graphql.config'
import { GRAPHQL_CONFIG_KEY } from './graphql.config'

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule)
  const configService = app.get(ConfigService)

  const graphqlApiPort =
    configService.get<ConfigType<typeof graphqlConfig>>(
      GRAPHQL_CONFIG_KEY,
    )?.graphqlApiPort

  if (!graphqlApiPort) {
    throw new Error('Missing GRAPHQL_API_HOST')
  }

  await app.listen(graphqlApiPort)
  Logger.log(`🚀 Application is running on: http://127.0.0.1:${graphqlApiPort}`)

  // Listen for the process termination signals
  process.on('SIGTERM', async () => {
    Logger.log('SIGTERM signal received. Closing http server.')
    await app.close()
    process.exit(0)
  })

  process.on('SIGINT', async () => {
    Logger.log('SIGINT signal received. Closing http server.')
    await app.close()
    process.exit(0)
  })
}

void bootstrap()
