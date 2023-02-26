import type { IApp, IUser } from '@codelab/frontend/abstract/core'
import { IUserDTO } from '@codelab/frontend/abstract/core'
import { appRef } from '@codelab/frontend/domain/app'
import type { IRole } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

const hydrate = (user: IUserDTO) => {
  return new User({
    id: user.id,
    username: user.username,
    auth0Id: user.auth0Id,
    roles: user.roles,
    apps: user.apps.map((app) => appRef(app.id)),
  })
}

/**
 * Here we use JwtPayload to hydrate our user model, so we don't require an additional api call to our database
 *
 * auth0Id can be used as the unique key for our database lookup without issue
 */
@model('@codelab/User')
export class User
  extends Model({
    // We use auth0Id as the id here
    id: idProp.withSetter(),
    username: prop<string>(),
    auth0Id: prop<string>(),
    roles: prop<Array<IRole>>(() => []),
    apps: prop<Array<Ref<IApp>>>(() => []),
  })
  implements IUser
{
  static hydrate = hydrate

  @modelAction
  create(data: IUserDTO) {
    this.id = data.id
    this.auth0Id = data.auth0Id
    this.roles = data.roles

    return this
  }
}

export const userRef = rootRef<IUser>('@codelab/UserRef', {
  onResolvedValueChange: (ref, newUser, oldUser) => {
    if (oldUser && !newUser) {
      detach(ref)
    }
  },
})
