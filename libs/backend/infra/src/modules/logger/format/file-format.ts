import { Format } from 'logform'
import { format } from 'winston'

const prettyPrint = (obj: any) => {
  return JSON.stringify(obj, null, 2)
}

/**
 * Copied from import { utilities } from 'nest-winston'
 * @param appName
 */
export const fileFormat = (appName = 'NestWinston'): Format =>
  format.printf(({ context, level, timestamp, message, ms, ...meta }) => {
    if ('undefined' !== typeof timestamp) {
      // Only format the timestamp to a locale representation if it's ISO 8601 format. Any format
      // that is not a valid date string will throw, just ignore it (it will be printed as-is).
      try {
        if (timestamp === new Date(timestamp).toISOString()) {
          timestamp = new Date(timestamp).toLocaleString()
        }
      } catch (error) {
        //
      }
    }

    return (
      `[${appName}]` +
      `${level.charAt(0).toUpperCase() + level.slice(1)}\t` +
      (typeof timestamp !== 'undefined' ? `${timestamp} ` : '') +
      (typeof context !== 'undefined' ? `${'[' + context + ']'} ` : '') +
      (typeof message !== 'undefined' ? `${message} - ` : ' - ') +
      `${prettyPrint(meta)}` +
      (typeof ms !== 'undefined' ? ` ms` : '')
    )
  })
