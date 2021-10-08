import { WithCurrentUserRequest } from '@codelab/backend/abstract/core'
import type { IUser } from '@codelab/shared/abstract/core'
import { CreateLambdaInput } from './create-lambda.input'

export class CreateLambdaRequest implements WithCurrentUserRequest {
  declare input: CreateLambdaInput

  declare currentUser: IUser
}
