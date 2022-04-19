import { IRole, IUserDTO } from '@codelab/shared/abstract/core'
import {
  detach,
  idProp,
  Model,
  model,
  modelAction,
  prop,
  rootRef,
} from 'mobx-keystone'

@model('@codelab/User')
export class User extends Model({
  id: idProp,
  auth0Id: prop<string>(),
  roles: prop<Array<IRole>>(),
}) {
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
