import { LogLevel } from '@nestjs/common'
import { registerAs } from '@nestjs/config'
import { get } from 'env-var'
import { LoggerTokens } from './logger.tokens'

export interface LoggerConfig {
  level: LogLevel
}

export const loggerConfig = registerAs<LoggerConfig>(
  LoggerTokens.LoggerConfig.toString(),
  () => ({
    level: get('LOG_LEVEL')
      .default('log')
      .asEnum<LogLevel>(['log', 'error', 'warn', 'debug', 'verbose']),
  }),
)
