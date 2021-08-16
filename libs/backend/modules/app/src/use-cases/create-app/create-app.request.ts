import { WithOwnerRequest } from '@codelab/backend/abstract/core'
import { JwtPayload } from '@codelab/backend/infra'
import { CreateAppInput } from './create-app.input'

export class CreateAppRequest implements WithOwnerRequest {
  declare input: CreateAppInput

  declare owner: JwtPayload
}
