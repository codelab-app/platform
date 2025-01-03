import { registerAs } from '@nestjs/config'
import * as env from 'env-var'

export const loggerConfig = registerAs('LOGGER_CONFIG', () => {
  return {
    get level() {
      return env.get('API_LOG_LEVEL').default('debug').asString()
    },
    get sentryDsn() {
      return env.get('SENTRY_DSN').required().asString()
    },
    get context() {
      return env
        .get('API_LOG_CONTEXT')
        .default('')
        .asString()
        .split(',')
        .filter(Boolean)
    },
  }
})
