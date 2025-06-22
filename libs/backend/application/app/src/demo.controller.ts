import { PinoLoggerService } from '@codelab/backend-infra-adapter-logger'
import { WsGateway } from '@codelab/backend-infra-adapter-ws'
import { IJobOutput, IJobQueueResponse } from '@codelab/shared-abstract-infra'
import { Body, Controller, Post, Request, Res } from '@nestjs/common'
import { CommandBus } from '@nestjs/cqrs'
import { Request as ExpressRequest, Response } from 'express'
import 'multer'

@Controller('demo')
export class DemoController {
  constructor(
    private commandBus: CommandBus,
    private logger: PinoLoggerService,
    // @InjectQueue(SEED_QUEUE) private seedQueue: Queue,
    private readonly socketGateway: WsGateway,
  ) {}

  /**
   * Demonstrates how to use BullMQ queue for processing background jobs
   */
  @Post('demo-background')
  async demoBackground(
    @Body() { jobId }: { jobId: string },
  ): Promise<IJobQueueResponse> {
    this.logger.debug('Starting demo background job')

    // Create job data object
    const jobData: IJobOutput = {
      data: 'Demo background job data',
      jobId,
    }

    setTimeout(() => {
      this.logger.debug(`Demo background job ${jobId} completed`)
      // Emit with proper structure expected by the client
      this.socketGateway.emitJobComplete(jobData)
    }, 3000)

    // Return the job ID and other info
    return {
      jobId,
      message: 'Background job has been started',
      status: 'queued',
    }
  }

  /**
   * Demonstrates how to use BullMQ queue for processing background jobs
   */
  // @Post('demo-queue')
  // async demoQueue() {
  //   this.logger.debug('Adding demo job to queue')

  //   // Add a job to the queue
  //   const job = await this.seedQueue.add(DEMO_JOB, {
  //     data: 'Demo queue job data',
  //     timestamp: new Date().toISOString(),
  //   })

  //   // Return the job ID and other info
  //   return {
  //     jobId: job.id,
  //     message: 'Job has been added to the queue',
  //     status: 'queued',
  //   }
  // }

  /**
   * Fixes
   *
   * APIResponse: 500 Internal Server Error
   * Date: Fri, 28 Feb 2025 09:56:11 GMT
   * Connection: keep-alive
   * Keep-Alive: timeout=5
   * Transfer-Encoding: chunked
   */
  @Post('demo-stream')
  async demoStream(@Res() response: Response) {
    this.logger.debug('Demo start')

    // Send headers right away to establish connection
    response.writeHead(200, {
      Connection: 'keep-alive',
      'Content-Type': 'application/json',
      'Transfer-Encoding': 'chunked',
    })

    // Send progress updates every 5 seconds to keep connection alive
    const interval = setInterval(() => {
      response.write('{"progress":"processing"}\n')
    }, 5000)

    await new Promise((resolve) => {
      setTimeout(() => {
        clearInterval(interval)
        this.logger.debug('Demo complete')
        response.write('{"status":"complete"}\n')
        response.end('{}')
        resolve({})
      }, 35000)
    })
  }

  /**
   * Express's manual response mode) but also returning a Promise value, which creates a conflict in NestJS. When using @Res(), you must handle the response manually and not return a value.
   */
  @Post('demo-timeout')
  async demoTimeout(
    @Res() response: Response,
    @Request() request: ExpressRequest,
  ) {
    this.logger.debug('Demo timeout start')

    // Log existing request headers
    this.logger.debug('Existing request headers', {
      connection: request.headers['connection'],
      contentType: request.headers['content-type'],
      keepAlive: request.headers['keep-alive'],
    })

    // Log existing response headers before setting any
    this.logger.debug('Existing response headers', {
      connection: response.getHeader('Connection'),
      contentType: response.getHeader('Content-Type'),
      keepAlive: response.getHeader('Keep-Alive'),
    })

    // Increase the server's timeout for this specific request
    // request.socket.setTimeout(60000)

    // Set headers to help with timeout prevention
    /**
     * On CI, there could be some proxy in between setting those headers to lower values
     */
    // const connectionValue = 'keep-alive'
    // const keepAliveValue = 'timeout=61'
    // const contentTypeValue = 'application/json'

    // response.setHeader('Connection', connectionValue)
    // response.setHeader('Keep-Alive', keepAliveValue)
    // response.setHeader('Content-Type', contentTypeValue)

    try {
      // Manually send the response
      this.logger.debug('Final response headers', {
        connection: response.getHeader('Connection'),
        contentType: response.getHeader('Content-Type'),
        keepAlive: response.getHeader('Keep-Alive'),
      })

      // Simulate long operation
      await new Promise((resolve) => {
        setTimeout(() => {
          this.logger.debug('Demo complete')
          resolve({})
        }, 35000)
      })

      response.status(200).json({ status: 'complete' })
    } catch (error) {
      this.logger.error('Demo timeout error')
      console.error(error)
      response.status(500).json({ error: 'An error occurred' })
    }
  }
}
