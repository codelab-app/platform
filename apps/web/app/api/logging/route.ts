import type { LogLevel } from '@nestjs/common'

import { pinoLogger } from '@codelab/backend/infra/adapter/logger'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export const GET = async (request: Request) => {
  pinoLogger.info('User logged in', {
    metadata: {
      browser: 'Chrome',
      ip: '127.0.0.1',
    },
    timestamp: new Date(),
    userId: 123,
  })

  return NextResponse.json({ success: true })
}

/**
 * Allows `pino/file` to work in server environment
 */
export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { message, options } = body
    const level: LogLevel = body.level

    console.log('Route', { message, ...options })

    // Call the appropriate log level method
    switch (level) {
      case 'debug':
        pinoLogger.debug({ message, ...options })
        break
      case 'error':
        pinoLogger.error({ message, ...options })
        break
      case 'log':
        pinoLogger.info({ message, ...options })
        break
      case 'verbose':
        pinoLogger.trace({ message, ...options })
        break
      case 'warn':
        pinoLogger.warn({ message, ...options })
        break
      default:
        throw new Error(`Invalid log level: ${level}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error, success: false }, { status: 500 })
  }
}
