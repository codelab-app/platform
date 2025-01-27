/* eslint-disable canonical/sort-keys */
import type { PrettyOptions } from 'pino-pretty'

import pino from 'pino'
import pretty from 'pino-pretty'

export const prettyOptions: PrettyOptions = {
  colorize: true,

  // Make this nest.js compatible
  customLevels: {
    verbose: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
  },

  // errorLikeObjectKeys: ['err', 'error'],
  /**
   * Yes, Pino automatically adds req and res objects to the logs when used with nestjs-pino because it's designed to work as HTTP middleware by default.
   *
   * These keys are added by `this.logger.assign()`
   */
  // ignore: 'time,pid,hostname,context,req,res,responseTime,level',
  ignore: 'pid,hostname,req,res',

  // levelFirst: false,
  // NestJS-like timestamp
  /**
   * This time appears in front of message, cannot find a way to move it.
   *
   * Pino emphasizes machine readability, so it uses single json line
   */
  // translateTime: 'SYS:mm/dd/yyyy hh:mm:ss TT',
  // messageFormat: (log, messageKey, levelLabel) => {
  //   // console.log(log, messageKey, levelLabel)
  //   const message = JSON.parse(log[messageKey] as string) as LogOptions
  //   const level = log['level'] as number
  //   const hostname = log['hostname']
  //   const time = log['time']
  //   const pid = log['pid']
  //   /**
  //    * Be careful of `context` and `message`, since `LoggerService.info` has method override
  //    */
  //   // const context = log['context']
  //   const context = message.context
  //   const object = message.object ?? {}
  //   /**
  //    * Pino combines all data into a single object, need to extract user data
  //    */
  //   const data = omit(log, ['level', 'time', 'hostname', 'pid', 'req', 'msg'])
  //   return `${chalk.green('[Pino]')} ${chalk.green(pid)}  ${chalk.green(
  //     '-',
  //   )} ${chalk.whiteBright(formatNestLikeDate(time))}     ${chalk.green(
  //     levelsLabels[level]?.toUpperCase(),
  //   )} ${chalk.yellow(`[${context}]`)}\n${colorize(object)}`
  // },
  // singleLine: true,
  sync: true,
}

export const pinoPrettyStream = pretty(prettyOptions)
