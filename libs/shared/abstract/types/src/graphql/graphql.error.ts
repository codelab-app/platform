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
