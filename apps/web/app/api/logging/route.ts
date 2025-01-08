import type { LogLevel } from '@nestjs/common'

import { type LogOptions, serverLogger } from '@codelab/shared/infra/logging'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import pino from 'pino'

export const dynamic = 'force-dynamic'

/**
 * Allows `pino/file` to work in server environment
 */
export const POST = async (request: Request) => {
  try {
    const body = await request.json()
    const { data, message } = body
    const level: LogLevel = body.level

    const options: LogOptions = {
      context: 'server',
      data,
    }

    // Call the appropriate log level method
    switch (level) {
      case 'debug':
        serverLogger.debug(message, options)
        break
      case 'error':
        serverLogger.error(message, options)
        break
      case 'log':
        serverLogger.log(message, options)
        break
      case 'verbose':
        serverLogger.verbose(message, options)
        break
      case 'warn':
        serverLogger.warn(message, options)
        break
      default:
        throw new Error(`Invalid log level: ${level}`)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error, success: false }, { status: 500 })
  }
}
