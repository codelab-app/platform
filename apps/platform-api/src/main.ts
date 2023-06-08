import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { CommandFactory } from 'nest-commander'
import { AppModule } from './app/app.module'

const bootstrap = async () => {
  await CommandFactory.run(AppModule, ['warn', 'error', 'log'])

  const app = await NestFactory.create(AppModule)
  const globalPrefix = 'api'
  app.setGlobalPrefix(globalPrefix)

  const port = 4000
  await app.listen(port)
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
