import { JwtPayload } from '@codelab/backend'
import { GetElementGraphInput } from './get-element-graph.input'

export class GetElementGraphRequest {
  declare input: GetElementGraphInput

  declare currentUser?: JwtPayload
}
