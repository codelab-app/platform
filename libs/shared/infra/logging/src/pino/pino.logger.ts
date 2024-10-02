import pino from 'pino'

import { pinoPrettyStream } from './pino-transport'

export const pinoLogger = pino(pinoPrettyStream)
