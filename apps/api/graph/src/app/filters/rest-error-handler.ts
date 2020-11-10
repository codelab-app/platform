import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'
import { AppError } from './AppError'

@Catch(AppError)
export class RestErrorHandler implements ExceptionFilter {
  catch(exception: AppError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const res: Response = ctx.getResponse()

    return res.status(exception.code).json({
      error: 'error msg',
      message: exception.message,
    })
  }
}
