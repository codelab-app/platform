import { WithOwnerRequest } from '@codelab/backend/abstract/core'
import { JwtPayload } from '@codelab/backend/infra'
import { GetAppInput } from './get-app.input'

export class GetAppRequest implements WithOwnerRequest {
  declare input: GetAppInput

  declare owner: JwtPayload
}
