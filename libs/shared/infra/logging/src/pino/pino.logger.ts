import pino from 'pino'

import { pinoPrettyStream } from './pino-transport'

/**
 * Used for frontend
 */
export const pinoLogger = pino(pinoPrettyStream)
