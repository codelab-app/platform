import type { ObjectLike } from '@codelab/shared/abstract/types'

import chalk from 'chalk'
import pino from 'pino'
import pretty from 'pino-pretty'
import { omit } from 'remeda'

import { colorize, formatNestLikeDate } from './utils'

const levelsLabels = pino.levels.labels

export interface PinoMessage {
  context?: string
  object: ObjectLike
}

export const pinoPrettyStream = pretty({
  colorize: true,
  // errorLikeObjectKeys: ['err', 'error'],
  /**
   * We hide them here, since can't control these order. Instead move them to the message
   */
  ignore: 'time,pid,hostname,context,req,res,responseTime,level',
  // levelFirst: false,
  // NestJS-like timestamp
  /**
   * This time appears in front of message, cannot find a way to move it.
   */
  // translateTime: 'SYS:mm/dd/yyyy hh:mm:ss TT',
  messageFormat: (log, messageKey, levelLabel) => {
    // console.log(log, messageKey, levelLabel)

    const message = JSON.parse(log[messageKey] as string) as PinoMessage
    const level = log['level'] as number
    const hostname = log['hostname']
    const time = log['time']
    const pid = log['pid']
    /**
     * Be careful of `context` and `message`, since `LoggerService.info` has method override
     */
    // const context = log['context']
    const context = message.context
    const object = message.object
    /**
     * Pino combines all data into a single object, need to extract user data
     */
    const data = omit(log, ['level', 'time', 'hostname', 'pid', 'req', 'msg'])

    return `${chalk.green('[Pino]')} ${chalk.green(pid)}  ${chalk.green(
      '-',
    )} ${chalk.whiteBright(formatNestLikeDate(time))}     ${chalk.green(
      levelsLabels[level]?.toUpperCase(),
    )} ${chalk.yellow(`[${context}]`)}\n${colorize(object)}`
  },
  // singleLine: false,
  sync: true,
})
