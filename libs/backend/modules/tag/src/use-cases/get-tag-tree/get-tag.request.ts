import { JwtPayload } from '@codelab/backend/infra'
import { GetTagInput } from './get-tag.input'

export class GetTagRequest {
  declare input: GetTagInput

  declare owner: JwtPayload
}
