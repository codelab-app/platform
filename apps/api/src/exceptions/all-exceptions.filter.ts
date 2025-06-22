import type { ArgumentsHost } from '@nestjs/common'

import { Catch, HttpException, Injectable } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { ClientError } from 'graphql-request'
import { ValidationException } from 'typebox-validators'

@Injectable()
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    console.log('Exception class:', exception?.constructor?.name)

    // const request = host.switchToHttp().getRequest<Request>()

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


      // Create an HTTP exception with validation error details
      const httpException = new HttpException(
        {
          error: 'Validation Failed',
          message: exception.message,
          statusCode: 400,
        },
        400,
      )


      // Rethrow the exception to stop the application
      throw exception
    }

    if (exception instanceof ClientError) {
      const errorResponse = {
        details: exception.response.errors,
        error: 'GraphQL Error',
        message:
          exception.response.errors?.[0]?.message || 'Unknown GraphQL error',
        statusCode: 400,
      }

      const httpException = new HttpException(errorResponse, 400)

      throw httpException
    }

    return super.catch(exception, host)
  }
}
