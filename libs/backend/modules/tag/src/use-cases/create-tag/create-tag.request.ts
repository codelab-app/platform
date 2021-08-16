import { WithOwnerRequest } from '@codelab/backend/abstract/core'
import { JwtPayload } from '@codelab/backend/infra'
import { CreateTagInput } from './create-tag.input'

export class CreateTagRequest implements WithOwnerRequest {
  declare input: CreateTagInput

  declare owner: JwtPayload
}
