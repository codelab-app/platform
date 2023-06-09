// Must be imported first
// eslint-disable-next-line simple-import-sort/imports
import { otelSDK } from '@codelab/backend/infra/adapter/otel'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { CodelabLogger } from '@codelab/backend/infra/adapter/logger'

const bootstrap = async () => {
  await otelSDK.start()

  const app = await NestFactory.create(AppModule, { bufferLogs: true })
  /**
   * https://docs.nestjs.com/techniques/logger
   */
  app.useLogger(app.get(CodelabLogger))

  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  const port = 4000
  await app.listen(port)

  /**
   * Logs
   */

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  )

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
