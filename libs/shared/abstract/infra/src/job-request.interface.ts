/**
 * This is the initial response after the server adds the job to the queue
 */
export interface IJobQueueResponse {
  jobId: string
  message: string
  status: 'completed' | 'failed' | 'queued'
}

/**
 * This is the response after the job is completed
 */
export interface IJobOutput<T = unknown> {
  data: T
  jobId: string
}
