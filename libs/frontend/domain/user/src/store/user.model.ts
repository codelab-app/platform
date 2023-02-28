import type { IApp, IUser, IUserDTO } from '@codelab/frontend/abstract/core'
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
  static create({ id, username, auth0Id, roles, apps }: IUserDTO) {
    return new User({
      id,
      username,
      auth0Id,
      roles,
      apps: apps.map((app) => appRef(app.id)),
    })
  }
}

export const userRef = rootRef<IUser>('@codelab/UserRef', {
  onResolvedValueChange: (ref, newUser, oldUser) => {
    if (oldUser && !newUser) {
      detach(ref)
    }
  },
})
