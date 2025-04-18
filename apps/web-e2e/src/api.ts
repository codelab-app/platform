import type { IJobOutput } from '@codelab/shared-abstract-infra'
import type { APIRequestContext } from '@playwright/test'
import type { Socket } from 'socket.io-client'

import { env } from '@codelab/shared-config-env'
import { getTimestamp } from '@codelab/shared-infra-logging'
import { io } from 'socket.io-client'

/**
 * Extract the options type from Playwright's APIRequestContext methods
 */
export type ApiRequestPostOptions = Parameters<APIRequestContext['post']>[1]
export type ApiRequestGetOptions = Parameters<APIRequestContext['get']>[1]

/**
 * Helper function to make API requests that automatically throws on non-OK responses
 */
export const requestOrThrow = async <T = void>(
  request: APIRequestContext,
  url: string,
  options:
    | (ApiRequestGetOptions & { method: 'GET' })
    | (ApiRequestPostOptions & { method: 'POST' }) = {
    method: 'POST',
  },
): Promise<T> => {
  const { method, ...rest } = options

  console.log(`[${getTimestamp()}] Requesting ${url} [${method}]`)

  const response =
    method === 'GET'
      ? await request.get(`/api/v1/${url}`, rest)
      : await request.post(`/api/v1/${url}`, rest)

  if (!response.ok()) {
    const text = await response.text()

    console.error('Server response:', text)
    throw new Error(`HTTP error! status: ${response.status()}`)
  }

  const contentType = response.headers()['content-type']

  if (contentType && contentType.includes('application/json')) {
    return response.json() as Promise<T>
  } else {
    console.log('Content-Type not found', contentType)
  }

  // Return empty response or null for non-JSON responses
  return Promise.resolve<T>(null as T)
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
    timeoutMs: 120000,
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
