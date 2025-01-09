// const pinoCaller = require('pino-caller')(pino, { relativeTo: __dirname, stackAdjustment: 1 })

import type { LoggerOptions } from 'pino'

import path from 'path'

// Create a constant for logs directory
export const LOGS_DIR = path.join(process.cwd(), '../../tmp/logs')
export const LOG_FILE_PATH = path.join(LOGS_DIR, 'client.log')
