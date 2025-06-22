import type { IJobOutput } from '@codelab/shared-abstract-infra'
import type { Socket } from 'socket.io-client'

import { getTimestamp } from '@codelab/shared-infra-logging'
import { io } from 'socket.io-client'

/**
 * Wait for job completion via socket connection
 * @param socketEndpoint - Socket endpoint
 * @param timeoutMs - Timeout in milliseconds
 * @returns Promise that resolves when job completes or times out
 */
export const jobSubscription = <T = void>(
  jobId: string,
  options: {
    socketEndpoint: string
    timeoutMs?: number
  },
): Promise<IJobOutput<T>> => {
  const { socketEndpoint, timeoutMs = 120_000 } = options

  return new Promise<IJobOutput<T>>((resolve, reject) => {
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
