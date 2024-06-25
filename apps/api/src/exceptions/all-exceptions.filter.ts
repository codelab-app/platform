import type { ArgumentsHost } from '@nestjs/common'
import { Catch } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import type { Request } from 'express'
import { TypeboxValidationException } from 'nestjs-typebox'

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof TypeboxValidationException) {
      // console.error(exception, host)

      const request = host.switchToHttp().getRequest<Request>()

      // console.log(params, body)
    } else {
      console.error('AllExceptionsFilter', exception)
    }

    super.catch(exception, host)
  }
}
