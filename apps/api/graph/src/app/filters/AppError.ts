import { ApolloError } from 'apollo-server-errors'

export enum AppErrorEnum {
  USER_NOT_FOUND,
  USER_EXISTS,
}

export class AppError extends ApolloError {
  declare code: number

  declare message

  constructor(
    message: string,
    code?: string,
    extensions?: Record<string, any>,
  ) {
    super(message, code, extensions)
    this.code = Number(code)
    this.message = message
    Object.setPrototypeOf(this, AppError.prototype)
  }
}
