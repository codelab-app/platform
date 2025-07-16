import path from 'path'

// Create a constant for logs directory
export const LOGS_DIR = path.join(process.cwd(), '../../tmp/logs')
export const LOG_FILE_PATH = path.join(LOGS_DIR, 'client.log')
