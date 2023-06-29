import type { LoggerService } from '@nestjs/common'
import { ConsoleLogger } from '@nestjs/common'

// export const loggerOptions: LoggerOptions = {
//   formatters: {
//     level: (label) => {
//       return { level: label }
//     },
//     // Workaround for PinoInstrumentation (does not support latest version yet)
//     log: (object) => {
//       const span = trace.getSpan(context.active())

//       if (!span) {
//         return { ...object }
//       }

//       const spanContext = trace.getSpan(context.active())?.spanContext()

//       if (!spanContext) {
//         return { ...object }
//       }

//       const { spanId, traceId } = spanContext

//       return { ...object, spanId, traceId }
//     },
//   },
//   level: 'info',
//   // prettifier: process.env.NODE_ENV === 'local' ? require('pino-pretty') : false,
// }

export class CodelabLogger extends ConsoleLogger implements LoggerService {}
// export class CodelabLogger extends Logger implements LoggerService {}
