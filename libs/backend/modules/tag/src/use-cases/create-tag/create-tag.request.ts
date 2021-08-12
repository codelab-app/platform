import { JwtPayload } from '@codelab/backend/infra'
import { CreateTagInput } from './create-tag.input'

export class CreateTagRequest {
  declare input: CreateTagInput

  declare owner: JwtPayload
}
