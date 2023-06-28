// Must be imported first
// eslint-disable-next-line simple-import-sort/imports
import { otelSDK } from '@codelab/backend/infra/adapter/otel'
import type { INestApplicationContext } from '@nestjs/common'
import { Logger } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app/app.module'
import { CommandModule } from './commands/command.module'
import { CommandService } from './commands/command.service'
import { command } from 'yargs'
import type { MicroserviceOptions } from '@nestjs/microservices'
import { Transport } from '@nestjs/microservices'
import type { Callback, Context, Handler } from 'aws-lambda'

let app: INestApplicationContext | undefined

const bootstrap = async () => {
  await otelSDK.start()

  if (!app) {
    app = await NestFactory.createApplicationContext(AppModule, {})
  }

  await app.init()
}

/**
 * Since Lambda wraps our application function, the only args that come in are lambda specific ones, which is the `--data` flag that gets turned into an event. We parse this as raw string and forward it to our application as argv so it is compatible with yargs
 *
 * https://www.serverless.com/framework/docs/providers/aws/cli-reference/invoke-local
 *
 * @param event This is raw string since we use --raw flag
 */
export const handler: Handler = async (
  event: string,
  context: Context,
  callback: Callback,
) => {
  console.log({
    callback,
    context,
    event,
  })
  /**
   * process.argv at this point has been set by lambda to
   *
   * ['/var/lang/bin/node', '/var/runtime/index.mjs']
   *
   * to call our handler function
   */
  console.log('Handler:', process.argv)

  process.argv.push(...event.split(' '))

  console.log('Handler:', process.argv)

  await bootstrap()
}
