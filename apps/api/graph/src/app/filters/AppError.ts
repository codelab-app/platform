import { ApolloError } from 'apollo-server-errors'

export enum AppErrorEnum {
  USER_NOT_FOUND,
}

export class AppError extends ApolloError {
  constructor(
    message: string,
    code?: string,
    extensions?: Record<string, any>,
  ) {
    super(message, code, extensions)
  }
}
