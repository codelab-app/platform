import { HttpException } from '@nestjs/common'

export class GraphException extends HttpException {
  constructor(
    objectOrError: object | string,
    description: string,
    statusCode: number,
  ) {
    super(
      HttpException.createBody(objectOrError, description, statusCode),
      statusCode,
    )
  }
}
