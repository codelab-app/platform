import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { QueryFailedError } from 'typeorm'
import { ApolloCodelabError, AppErrorEnum } from './ApolloCodelabError'

export enum PSQLErrorCode {
  DUPLICATE_KEY_VIOLATION = '23505',
}

@Catch()
export class GeneralExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    if (exception instanceof QueryFailedError) {
      const e = exception as any

      if (e.code === PSQLErrorCode.DUPLICATE_KEY_VIOLATION) {
        throw new ApolloCodelabError(
          e.detail,
          AppErrorEnum.DUPLICATE_RECORD,
          HttpStatus.CONFLICT.toString(),
        )
      } else {
        throw new ApolloCodelabError(
          e.detail,
          AppErrorEnum.OTHER,
          HttpStatus.INTERNAL_SERVER_ERROR.toString(),
        )
      }
    }

    throw new HttpException(exception.message, HttpStatus.INTERNAL_SERVER_ERROR)
  }
}
