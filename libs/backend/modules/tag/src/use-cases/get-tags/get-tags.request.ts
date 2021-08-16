import { WithOwnerRequest } from '@codelab/backend/abstract/core'
import { JwtPayload } from '@codelab/backend/infra'

export class GetTagsRequest implements WithOwnerRequest {
  // declare input: GetTagsInput

  declare owner: JwtPayload
}
