import type {
  IUser,
  IUserDTO,
  IUserService,
} from '@codelab/frontend/abstract/core'
import { getAppService } from '@codelab/frontend/domain/app'
import { getPageService } from '@codelab/frontend/domain/page'
import { throwIfUndefined } from '@codelab/frontend/shared/utils'
import type { Nullable, UserWhere } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { userApi } from './user.api'
import { User } from './user.model'

const init = (data?: IUserDTO) => {
  // SSR makes it such that user may be undefined
  if (!data) {
    return new UserService({})
  }

  const user = User.create(data)

  const userService = new UserService({
    user,
  })

  // onChildAttachedTo(
  //   () => userService,
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //   (child: any) => {
  //     /**
  //      * Once the user model is attached, we want to replace the id with the db id.
  //      *
  //      * User.id is initially set with auth0Id, so needs to be replaced
  //      */
  //     if (modelTypeKey in child && child[modelTypeKey] === '@codelab/User') {
  //       void userService.getOne({ auth0Id: user.auth0Id }).then((userData) => {
  //         if (userData) {
  //           console.log('set user data id')
  //           userService.user?.setId(userData.id)
  //         }
  //       })
  //     }
  //   },
  // )

  return userService
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
  @transaction
  getOne = _async(function* (this: UserService, where: UserWhere) {
    const {
      users: [user],
    } = yield* _await(userApi.GetUsers({ where }))

    return user
  })

  static init = init
}
