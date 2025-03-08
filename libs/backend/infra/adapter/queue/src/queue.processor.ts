import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { WsGateway } from '@codelab/backend/infra/adapter/ws'
import { Processor, WorkerHost } from '@nestjs/bullmq'
import { Injectable } from '@nestjs/common'
import { Job } from 'bullmq'

import { DEMO_JOB, SEED_QUEUE } from './queue.constant'

/**
 * Minimal processor for the 'seed' queue
 */
@Injectable()
@Processor(SEED_QUEUE)
export class SeedQueueProcessor extends WorkerHost {
  constructor(
    private readonly logger: PinoLoggerService,
    private readonly socketGateway: WsGateway,
  ) {
    super()
  }

  /**
   * Process jobs from the 'seed' queue
   */
  async process(
    job: Job,
  ): Promise<{ processed: boolean; completedAt?: string }> {
    this.logger.debug(`Processing job ${job.id} of type ${job.name}`, {
      data: job.data,
    })

    // Simple processing logic based on job name
    if (job.name === DEMO_JOB) {
      // Simulate some processing time
      await new Promise((resolve) => setTimeout(resolve, 35000))

      this.logger.debug(`Demo job ${job.id} completed`)

      this.socketGateway.emitJobComplete({
        data: 'Demo job data',
        jobId: job.id!,
      })

      return {
        completedAt: new Date().toLocaleTimeString(),
        processed: true,
      }
    }

    return { processed: false }
  }
}
