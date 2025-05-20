/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { LogLevel } from '@nestjs/common'

import { pinoLogger } from '@codelab/shared-infra-logging/server'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

/**
 * Allows `pino/file` to work in server environment
 */
export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { message, options } = body
    const level: LogLevel = body['level']

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
