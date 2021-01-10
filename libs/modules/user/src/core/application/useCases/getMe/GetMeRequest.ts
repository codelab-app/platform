import { UUID } from '@codelab/backend'
import { User } from '@codelab/modules/user'

export class GetMeRequest {
  declare user: User<UUID>
}
