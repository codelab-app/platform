import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import { User } from '@codelab/shared/abstract/core'
import { InputType } from '@nestjs/graphql'

@InputType()
export class GetLambdasRequest implements WithCurrentUserRequest {
  declare currentUser: User
}
