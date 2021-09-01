import type { User } from '@codelab/shared/abstract/core'
import { CreatePageInput } from './create-page.input'

export class CreatePageRequest {
  declare input: CreatePageInput

  declare currentUser: User
}
