import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common'
import { Response } from 'express'
import { ApolloCodelabError } from './ApolloCodelabError'

@Catch(ApolloCodelabError)
export class RestErrorHandler implements ExceptionFilter {
  catch(exception: ApolloCodelabError, host: ArgumentsHost): any {
    const ctx = host.switchToHttp()
    const res: Response = ctx.getResponse()

    return res.status(exception.code).json({
      error: 'error msg',
      message: exception.message,
    })
  }
}
