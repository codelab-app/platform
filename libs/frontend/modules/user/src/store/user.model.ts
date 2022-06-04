import { App } from '@codelab/frontend/modules/app'
import { IApp, IRole, IUser, IUserDTO } from '@codelab/shared/abstract/core'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  objectMap,
  prop,
  rootRef,
} from 'mobx-keystone'

const hydrate = (user: IUserDTO) => {
  console.log('user', user)

  return new User({
    id: user.id,
    username: user.username,
    auth0Id: user.auth0Id,
    roles: user.roles,
    apps: objectMap(
      user.apps.map((app) => {
        console.log('app', app)

        return [app.id, App.hydrate(app)]
      }),
    ),
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
    apps: prop(() => objectMap<IApp>()),
  })
  implements IUser
{
  static hydrate = hydrate

  @modelAction
  updateCache(data: IUserDTO) {
    this.id = data.id
    this.auth0Id = data.auth0Id
    this.roles = data.roles ?? []
  }
}

export const userRef = rootRef<User>('@codelab/UserRef', {
  onResolvedValueChange(ref, newUser, oldUser) {
    if (oldUser && !newUser) {
      detach(ref)
    }
  },
})
