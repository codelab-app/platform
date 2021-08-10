import { JwtPayload } from '@codelab/backend'
import { GetTagInput } from './get-tag.input'

export class GetTagRequest {
  declare input: GetTagInput

  declare owner: JwtPayload
}
