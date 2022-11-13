import { IUser, IUserDTO, IUserService } from '@codelab/frontend/abstract/core'
import { App, getAppService } from '@codelab/frontend/domain/app'
import { getPageService, Page } from '@codelab/frontend/domain/page'
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

const init = (data?: IUserDTO) => {
  // SSR makes it such that user may be undefined
  if (!data) {
    return new UserService({})
  }

  const user = User.hydrate(data)

  return new UserService({
    user,
  })
}

@model('@codelab/UserService')
export class UserService
  extends Model({
    // Authenticated user
    user: prop<Nullable<IUser>>(null).withSetter(),
    /**
     * Used by getStaticPaths for custom domain routing
     */
    users: prop(() => objectMap<IUser>()),
  })
  implements IUserService
{
  @computed
  get auth0Id() {
    return throwIfUndefined(this.user?.auth0Id)
  }

  @computed
  private get appService() {
    return getAppService(this)
  }

  @computed
  private get pageService() {
    return getPageService(this)
  }

  @modelFlow
  loadUsers = _async(function* (this: UserService) {
    const { users } = yield* _await(userApi.GetUsers())

    users.forEach((user) => {
      user.apps.forEach((app) => {
        this.appService.apps.set(app.id, App.hydrate(app))

        app.pages.forEach((page) => {
          this.pageService.pages.set(page.id, Page.hydrate(page))
        })
      })

      // TODO: temporarily cast user.roles to role[], because types generated in api is string[] because using roles[] makes the insertUser broken
      this.users.set(user.id, User.hydrate(user as IUserDTO))
    })

    return
  })

  static init = init
}
