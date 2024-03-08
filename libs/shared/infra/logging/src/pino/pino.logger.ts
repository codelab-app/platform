import pino from 'pino'
import pretty from 'pino-pretty'
import { pinoPrettyStream } from './pino-transport'

export const pinoLogger = pino(pinoPrettyStream)
