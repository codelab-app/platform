import { WithOwnerRequest } from '@codelab/backend/abstract/core'
import { JwtPayload } from '@codelab/backend/infra'
import { InputType } from '@nestjs/graphql'

@InputType()
export class GetLambdasRequest implements WithOwnerRequest {
  declare owner: JwtPayload
}
