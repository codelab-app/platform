import { ApolloError } from 'apollo-server-errors'

export enum AppErrorEnum {
  USER_NOT_FOUND = 'USER_NOT_FOUND',
  USER_EXIST = 'USER_EXISTS',
  WRONG_PASSWORD = 'WRONG_PASSWORD',
  WRONG_CREDENTIALS = 'WRONG_CREDENTIALS',
}

export class ApolloCodelabError extends ApolloError {
  declare code: number

  declare message

  declare errorCode: AppErrorEnum

  constructor(
    message: string,
    errorCode: AppErrorEnum,
    code?: string,
    extensions?: Record<string, any>,
  ) {
    super(message, code, extensions)
    this.code = Number(code)
    this.errorCode = errorCode
    this.message = message
    this.extensions.code = this.errorCode
    Object.setPrototypeOf(this, ApolloCodelabError.prototype)
  }
}
