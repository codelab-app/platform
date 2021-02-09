import { Inject } from '@nestjs/common'

export const prefixesForLoggers: Array<string> = new Array<string>()

export const CodelabLogger = (prefix = '') => {
  if (!prefixesForLoggers.includes(prefix)) {
    prefixesForLoggers.push(prefix)
  }

  return Inject(`LoggerService${prefix}`)
}
