import { Option } from 'fp-ts/Option'
import { User } from '@codelab/modules/user'

export class GetMeRequest {
  declare user: Option<User>
}
