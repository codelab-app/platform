import path from 'path'
import pino from 'pino'

console.log('process.cwd()', process.cwd())

// Create a constant for logs directory
const LOGS_DIR = path.join(process.cwd(), '../../tmp/logs')
const LOG_FILE_PATH = path.join(LOGS_DIR, 'client.log')

// Ensure logs directory exists
const ensureLogsDir = async () => {
  if (typeof window === 'undefined') {
    // Only import fs on server-side
    const fs = await import('fs')

    try {
      fs.mkdirSync(LOGS_DIR, { recursive: true })
    } catch (error) {
      console.error('Failed to create logs directory:', error)
    }
  }
}

// Call this when initializing
if (typeof window === 'undefined') {
  void ensureLogsDir()
}

const clientConfig = {
  browser: {
    asObject: true,
  },
  level: 'debug',
  sync: true,
  transport: {
    options: {
      colorize: true,
      sync: true,
    },
    targets: [
      {
        options: {
          colorize: true,
          sync: true,
        },
        target: 'pino-pretty',
      },
      {
        options: {
          destination: LOG_FILE_PATH,
          sync: true,
        },
        target: 'pino/file',
      },
    ],
  },
}

const serverConfig = {
  level: 'debug',
  sync: true,
  /**
   * Has issues with server side logging
   */
  // stream: pretty({
  //   colorize: true,
  // }),
  transport: {
    targets: [
      {
        options: {
          colorize: true,
          sync: true,
        },
        target: 'pino-pretty',
      },
      {
        options: {
          destination: LOG_FILE_PATH,
          sync: true,
        },
        target: 'pino/file',
      },
    ],
  },
}

/**
 * Clear the log files that pino creates
 */
export const clearFileLogs = async () => {
  if (typeof window === 'undefined') {
    console.log('Clearing logs')

    const fs = await import('fs')

    try {
      // Ensure the directory exists first
      await ensureLogsDir()

      // Open file with 'w' flag to truncate it
      fs.writeFileSync(LOG_FILE_PATH, '', { flag: 'w' })
    } catch (error) {
      console.error('Failed to clear log file:', error)
    }
  }
}

/**
 * Used for both frontend and backend logging
 */
export const logger =
  typeof window !== 'undefined' ? pino(clientConfig) : pino(serverConfig)
