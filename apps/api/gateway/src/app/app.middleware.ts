import { Catch, Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch()
@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: Function) {
    next()
  }
}
