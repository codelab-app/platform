import type { ArgumentsHost } from '@nestjs/common'
import type { HttpServer } from '@nestjs/common/interfaces'
import type { Request } from 'express'

import { PinoLoggerService } from '@codelab/backend/infra/adapter/logger'
import { Catch, HttpException, Injectable } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import * as Sentry from '@sentry/nestjs'
import { SentryExceptionCaptured } from '@sentry/nestjs'
import { ValidationException } from 'typebox-validators'

@Injectable()
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  // constructor(
  //   applicationRef: HttpServer,
  //   private readonly logger: PinoLoggerService,
  // ) {
  //   super(applicationRef)
  // }

  /**
   * Adding this decorator will capture all exceptions and log them to Sentry, by default only uncaught are captured
   *
   * We capture manually below
   */
  // @SentryExceptionCaptured()
  /**
   * This will catch all uncaught exceptions and log them to Sentry
   */
  catch(exception: unknown, host: ArgumentsHost) {
    const request = host.switchToHttp().getRequest<Request>()

    console.log('Exception class:', exception?.constructor?.name)

    if (exception instanceof ValidationException) {
      // const logData = {
      //   error: 'ValidationException',
      //   path: request.url,
      //   timestamp: new Date().toISOString(),
      //   validationErrors: exception.details.map((detail) => ({
      //     message: detail.message,
      //     path: detail.path,
      //     type: detail.type,
      //     value: detail.value,
      //   })),
      // }

      console.log(exception.toString())

      // Log to both Sentry and file
      // this.logger.logToSentry(logData)
      // this.logger.logToFile(exception, 'tmp/logs/validation-errors.log')

      // Create an HTTP exception with validation error details
      const httpException = new HttpException(
        {
          error: 'Validation Failed',
          message: exception.message,
          statusCode: 400,
        },
        400,
      )

      // console.log(JSON.stringify(exception, null, 2))
      // console.log(JSON.stringify(logData, null, 2))

      Sentry.captureException(exception.toString(), {
        // Not working, move to breadcrumb
        // extra: logData,
      })

      // Rethrow the exception to stop the application
      throw exception
    }

    return super.catch(exception, host)
  }
}
