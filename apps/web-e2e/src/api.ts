import type {
  IJobOutput,
  IJobQueueResponse,
} from '@codelab/shared/abstract/infra'
import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { APIRequestContext } from '@playwright/test'
import type { Socket } from 'socket.io-client'

import { env } from '@codelab/shared/config/env'
import { io } from 'socket.io-client'
import { v4 } from 'uuid'

import { getTimestamp } from './commands'
/**
 * Extract the options type from Playwright's APIRequestContext.post method
 */
export type ApiRequestOptions = Parameters<APIRequestContext['post']>[1]

/**
 * Helper function to make API requests that automatically throws on non-OK responses
 */
export const requestOrThrow = async <T = void>(
  request: APIRequestContext,
  url: string,
  options: ApiRequestOptions,
): Promise<T> => {
  const response = await request.post(url, options)

  if (!response.ok()) {
    const text = await response.text()

    console.error('Server response:', text)
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json() as Promise<T>
}

const apiPort = env.get('NEXT_PUBLIC_API_PORT').required().asPortNumber()

/**
 * Wait for job completion via socket connection
 * @param port - API port to connect to
 * @param timeoutMs - Timeout in milliseconds
 * @returns Promise that resolves when job completes or times out
 */
export const jobSubscription = <T = void>(
  jobId: string,
  options: {
    port?: number
    timeoutMs?: number
  } = {
    port: apiPort,
    timeoutMs: 90000,
  },
): Promise<IJobOutput<T>> => {
  const { port, timeoutMs } = options

  return new Promise<IJobOutput<T>>((resolve, reject) => {
    const socketEndpoint = `http://127.0.0.1:${port}`

    console.log(`[${getTimestamp()}] Connecting to socket at ${socketEndpoint}`)

    const socket: Socket = io(socketEndpoint)

    // Set a timeout just in case the event is never received
    const timeout = setTimeout(() => {
      console.log(`[${getTimestamp()}] Socket timeout - no event received`)
      socket.disconnect()
      reject(new Error(`Job ${jobId} timed out after ${timeoutMs}ms`))
    }, timeoutMs)

    socket.on('connect', () => {
      console.log(`[${getTimestamp()}] Socket connected successfully`)
    })

    socket.on('job:complete', (output: IJobOutput<T>) => {
      console.log(`[${getTimestamp()}] Received job completion`, output)

      // Only resolve if the jobId matches the one we're waiting for
      if (output.jobId === jobId) {
        console.log(`[${getTimestamp()}] Job ${jobId} completed successfully`)
        clearTimeout(timeout)
        socket.disconnect()
        resolve(output)
      } else {
        console.log(
          `[${getTimestamp()}] Ignoring completion for different job: ${
            output.jobId
          }`,
        )
      }
    })

    socket.on('job:error', (data: { jobId: string; error: unknown }) => {
      if (data.jobId === jobId) {
        console.log(
          `[${getTimestamp()}] Job ${jobId} failed with error`,
          data.error,
        )
        clearTimeout(timeout)
        socket.disconnect()
        reject(new Error(`Job ${jobId} failed: ${data.error}`))
      }
    })

    socket.on('error', (err) => {
      console.log(`[${getTimestamp()}] Socket error`, err)
      clearTimeout(timeout)
      socket.disconnect()
      reject(new Error(`Socket error: ${err}`))
    })

    socket.on('connect_error', (error: Error) => {
      console.error(
        `[${getTimestamp()}] Socket connection error:`,
        error.message,
      )
      console.log(error)
      clearTimeout(timeout)
      socket.disconnect()
      reject(new Error(`Socket connection error: ${error.message}`))
    })
  })
}
