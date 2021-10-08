import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'
import { InputType } from '@nestjs/graphql'

@InputType()
export class GetLambdasRequest implements WithCurrentUserRequest {
  declare currentUser: IUser
}
