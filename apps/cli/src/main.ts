import { NestFactory } from '@nestjs/core'

import { CliModule } from './cli.module'

// Handle uncaught errors immediately
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught exception:')
  console.error(error.message || error)
  if (process.env.DEBUG) {
    console.error(error.stack)
  }
  process.exit(1)
})

process.on(
  'unhandledRejection',
  (reason: unknown, promise: Promise<unknown>) => {
    console.error('❌ Unhandled promise rejection:')
    const error = reason as Error
    console.error(error?.message || reason)
    if (process.env.DEBUG) {
      console.error('Promise:', promise)
      if (error?.stack) {
        console.error(error.stack)
      }
    }
    process.exit(1)
  },
)

const bootstrap = async () => {
  try {
    const app = await NestFactory.createApplicationContext(CliModule, {
      logger: process.env.DEBUG ? ['error', 'warn'] : false,
    })

    await app.init()
  } catch (error) {
    // Ensure errors are properly displayed
    console.error('❌ CLI initialization failed:')
    const err = error as Error
    console.error(err.message || error)
    if (process.env.DEBUG) {
      console.error(err.stack)
    }
    process.exit(1)
  }
}

void bootstrap().catch((error) => {
  console.error('❌ Bootstrap failed:')
  console.error(error.message || error)
  process.exit(1)
})
