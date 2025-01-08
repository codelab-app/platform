import type { ObjectLike } from '@codelab/shared/abstract/types'
/* eslint-disable @typescript-eslint/member-ordering */
import type { LoggerService } from '@nestjs/common'

import type { LogOptions } from './pino'

/**
 * Considered using overloading instead of putting data in options, but would be hard to distinguish between objects without a discriminated key, something like `__context`.
 */
export interface ILoggerService extends LoggerService {
  log(message: string, options: LogOptions): void
  debug(message: string, options: LogOptions): void
  error(message: string, options: LogOptions): void
  warn(message: string, options: LogOptions): void
  verbose(message: string, options: LogOptions): void
}
