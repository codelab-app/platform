import type { User } from '@codelab/shared/abstract/core'
import { GetPagesInput } from './get-pages.input'

export class GetPagesRequest {
  declare input: GetPagesInput

  declare currentUser: User
}
