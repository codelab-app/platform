import { JwtPayload } from '@codelab/backend'
import { CreateComponentInput } from './create-component.input'

export class CreateComponentRequest {
  declare input: CreateComponentInput

  declare currentUser?: JwtPayload
}
