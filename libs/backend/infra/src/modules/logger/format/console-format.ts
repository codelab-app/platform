import clc from 'cli-color'
import bare from 'cli-color/bare'
import highlight from 'cli-highlight'
import { Format } from 'logform'
import { format } from 'winston'

const nestLikeColorScheme: Record<string, bare.Format> = {
  info: clc.greenBright,
  error: clc.red,
  warn: clc.yellow,
  debug: clc.magentaBright,
  verbose: clc.cyanBright,
}

const prettyPrint = (obj: any) => {
  return highlight(JSON.stringify(obj, null, 2), {
    language: 'json',
    ignoreIllegals: true,
  })
}

/**
 * Copied from import { utilities } from 'nest-winston'
 * @param appName
 */
export const consoleFormat = (appName = 'NestWinston'): Format =>
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

    const color = nestLikeColorScheme[level] || ((text: string): string => text)

    return (
      `${color(`[${appName}]`)} ` +
      `${clc.yellow(level.charAt(0).toUpperCase() + level.slice(1))}\t` +
      ('undefined' !== typeof timestamp ? `${timestamp} ` : '') +
      ('undefined' !== typeof context
        ? `${clc.yellow('[' + context + ']')} `
        : '') +
      `${color(message)} - ` +
      `${prettyPrint(meta)}` +
      ('undefined' !== typeof ms ? ` ${clc.yellow(ms)}` : '')
    )
  })
