import { GraphQLError as _GraphQLError } from 'graphql'

export interface GraphQLErrorExtensions {
  extensions: {
    code: string
    response: {
      error: string
      message: string
      statusCode: number
    }
  }
}

export interface GraphQLError extends _GraphQLError {
  extensions: {
    code: string
    response: {
      error: string
      message: string
      statusCode: number
    }
  }
  message: string
}
