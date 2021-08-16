import { WithOwnerRequest } from '@codelab/backend/abstract/core'
import { JwtPayload } from '@codelab/backend/infra'

export class GetTagTreeRequest implements WithOwnerRequest {
  declare owner: JwtPayload
}
