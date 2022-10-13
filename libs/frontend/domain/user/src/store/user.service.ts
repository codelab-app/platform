import {
  IAppService,
  ITypeService,
  IUser,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { App } from '@codelab/frontend/domain/app'
import { Page } from '@codelab/frontend/domain/page'
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import { Nullable } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
} from 'mobx-keystone'
import { userApi } from './user.api'
import { User } from './user.model'

// const init = (data?: IUserDTO) => {
//   // SSR makes it such that user may be undefined
//   if (!data) {
//     return new UserService({})
//   }
//
//   const user = User.hydrate(data)
//
//   return new UserService({
//     user,
//   })
// }

@model('@codelab/UserService')
export class UserService
  extends Model({
    // Authenticated user
    user: prop<Nullable<IUser>>(null).withSetter(),
    /**
     * Used by getStaticPaths for custom domain routing
     */
    users: prop(() => objectMap<IUser>()),
    appService: prop<IAppService>(),
    typeService: prop<ITypeService>(),
  })
  implements IUserService
{
  @computed
  get auth0Id() {
    return throwIfUndefined(this.user?.auth0Id)
  }

  @modelFlow
  loadUsers = _async(function* (this: UserService) {
    const { users } = yield* _await(userApi.GetUsers())

    users.forEach((user) => {
      user.apps.forEach((app) => {
        this.appService.apps.set(app.id, App.hydrate(app))

        app.pages.forEach((page) => {
          this.appService.pageService.pages.set(page.id, Page.hydrate(page))
        })
      })

      this.users.set(user.id, User.hydrate(user))
    })

    return
  })
}
