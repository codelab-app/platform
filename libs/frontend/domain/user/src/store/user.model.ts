import type { IUser } from '@codelab/frontend/abstract/core'
// import { appRef } from '@codelab/frontend/domain/app'
import type { IRole, IUserDTO } from '@codelab/shared/abstract/core'
// import type { Ref } from 'mobx-keystone'
import { idProp, Model, model, prop } from 'mobx-keystone'

const create = ({ apps, auth0Id, id, roles, username }: IUserDTO) => {
  return new User({
    // apps: apps?.map((app) => appRef(app.id)),
    auth0Id,
    id,
    roles,
    username,
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
    // apps: prop<Array<Ref<IApp>>>(() => []),
    auth0Id: prop<string>(),
    // We use auth0Id as the id here
    id: idProp.withSetter(),
    roles: prop<Array<IRole>>(() => []),
    username: prop<string>(),
  })
  implements IUser
{
  static create = create
}
