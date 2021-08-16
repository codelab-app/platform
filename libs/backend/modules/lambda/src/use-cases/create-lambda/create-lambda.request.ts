import { WithOwnerRequest } from '@codelab/backend/abstract/core'
import { JwtPayload } from '@codelab/backend/infra'
import { CreateLambdaInput } from './create-lambda.input'

export class CreateLambdaRequest implements WithOwnerRequest {
  declare input: CreateLambdaInput

  declare owner: JwtPayload
}
