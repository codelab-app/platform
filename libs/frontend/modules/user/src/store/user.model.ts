import { IRole, IUser, IUserDTO } from '@codelab/shared/abstract/core'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

/**
 * Here we use JwtPayload to hydrate our user model, so we don't require an additional api call to our database
 *
 * auth0Id can be used as the unique key for our database lookup without issue
 */
@model('@codelab/User')
export class User
  extends Model({
    // We use auth0Id as the id here
    id: idProp,
    auth0Id: prop<string>(),
    roles: prop<Array<IRole>>(),
  })
  implements IUser
{
  @modelAction
  updateCache(data: IUserDTO) {
    this.id = data.id
    this.auth0Id = data.auth0Id
    this.roles = data.roles
  }

  static hydrate(user: IUserDTO) {
    return new User({
      id: user.id,
      auth0Id: user.auth0Id,
      roles: user.roles,
    })
  }
}

export const userRef = rootRef<User>('@codelab/UserRef', {
  onResolvedValueChange(ref, newUser, oldUser) {
    if (oldUser && !newUser) {
      detach(ref)
    }
  },
})
