import { WithOwnerRequest } from '@codelab/backend/abstract/core'
import { JwtPayload } from '@codelab/backend/infra'

export class GetTagGraphRequest implements WithOwnerRequest {
  // declare input: GetTagGraphInput

  declare owner: JwtPayload
}
