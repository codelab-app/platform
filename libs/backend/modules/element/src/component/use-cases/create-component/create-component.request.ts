import { JwtPayload } from '@codelab/backend/infra'
import { CreateComponentInput } from './create-component.input'

export class CreateComponentRequest {
  declare input: CreateComponentInput

  declare currentUser?: JwtPayload
}
