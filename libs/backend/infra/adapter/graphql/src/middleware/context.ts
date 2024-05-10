import type { IncomingMessage } from 'http'

export interface GqlContext {
  req: IncomingMessage
  res: Response
}
