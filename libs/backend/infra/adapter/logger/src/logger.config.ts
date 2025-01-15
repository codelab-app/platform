import { registerAs } from '@nestjs/config'
import * as env from 'env-var'
import path from 'path'

// Create a constant for logs directory
export const LOGS_DIR = path.join(process.cwd(), '../../tmp/logs')
export const LOG_FILE_PATH = path.join(LOGS_DIR, 'client.log')

export const loggerConfig = registerAs('LOGGER_CONFIG', () => {
  return {
    get level() {
      /**
       * https://github.com/iamolegga/nestjs-pino
       */
      return env
        .get('API_LOG_LEVEL')
        .default('info')
        .asEnum(['trace', 'debug', 'info', 'warn', 'error', 'fatal'])
    },
    get sentryDsn() {
      return env.get('SENTRY_DSN').required().asString()
    },
    get context() {
      const contexts = env
        .get('API_LOG_CONTEXT')
        .default('')
        .asString()
        .split(',')
        .filter(Boolean)

      return contexts
    },
  }
})
