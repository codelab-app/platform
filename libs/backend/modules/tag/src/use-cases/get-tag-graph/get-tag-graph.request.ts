import { JwtPayload } from '@codelab/backend/infra'
import { GetTagGraphInput } from './get-tag-graph.input'

export class GetTagGraphRequest {
  declare input: GetTagGraphInput

  declare owner: JwtPayload
}
