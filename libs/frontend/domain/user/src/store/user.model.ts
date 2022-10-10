import type { IApp, IUser, IUserDTO } from '@codelab/frontend/abstract/core'
import { appRef } from '@codelab/frontend/domain/app'
import { IRole } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  Ref,
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
    id: idProp,
    username: prop<string>(),
    auth0Id: prop<string>(),
    roles: prop<Array<IRole>>(() => []),
    apps: prop<Array<Ref<IApp>>>(() => []),
    curAppId: prop<Nullable<string>>(null).withSetter(),
    curPageId: prop<Nullable<string>>(null).withSetter(),
  })
  implements IUser
{
  static hydrate = hydrate

  @modelAction
  writeCache(data: IUserDTO) {
    this.id = data.id
    this.auth0Id = data.auth0Id
    this.roles = data.roles

    return this
  }
}

export const userRef = rootRef<IUser>('@codelab/UserRef', {
  onResolvedValueChange(ref, newUser, oldUser) {
    if (oldUser && !newUser) {
      detach(ref)
    }
  },
})
