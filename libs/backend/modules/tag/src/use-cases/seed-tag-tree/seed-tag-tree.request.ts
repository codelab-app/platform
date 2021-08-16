import { WithOwnerRequest } from '@codelab/backend/abstract/core'
import { JwtPayload } from '@codelab/backend/infra'

export class SeedTagTreeRequest implements WithOwnerRequest {
  declare owner: JwtPayload
}
