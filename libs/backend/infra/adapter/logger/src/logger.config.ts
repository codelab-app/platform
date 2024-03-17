import { registerAs } from '@nestjs/config'
import * as env from 'env-var'

export const LOGGER_CONFIG_KEY = 'logger'

export const loggerConfig = registerAs(LOGGER_CONFIG_KEY, () => {
  return {
    get level() {
      return env.get('PLATFORM_API_LOG_LEVEL').default('debug').asString()
    },
  }
})
