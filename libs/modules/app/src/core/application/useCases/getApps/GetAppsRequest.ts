import { UUID } from '@codelab/backend'
import { User } from '@codelab/modules/user'

export class GetAppsRequest {
  declare user: User<UUID>
}
