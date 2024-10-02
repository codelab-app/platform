import type { NestMiddleware } from '@nestjs/common'

import { Injectable } from '@nestjs/common'

import { RequestContext } from './request-context.model'

@Injectable()
export class RequestContextMiddleware<Request = unknown, Response = unknown>
  implements NestMiddleware<Request, Response>
{
  use(req: Request, res: Response, next: () => void) {
    RequestContext.cls.run(new RequestContext(req, res), next)
  }
}
