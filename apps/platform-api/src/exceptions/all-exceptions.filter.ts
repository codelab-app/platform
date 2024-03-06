import type { ArgumentsHost } from '@nestjs/common'
import { Catch } from '@nestjs/common'
import { BaseExceptionFilter } from '@nestjs/core'
import { TypeboxValidationException } from 'nestjs-typebox'

@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    if (exception instanceof TypeboxValidationException) {
      // console.error(exception, host)

      // params, body
      const request = host.switchToHttp().getRequest()
      const { body, params } = request

      console.log(params, body)
    } else {
      console.error(exception)
    }

    super.catch(exception, host)
  }
}
