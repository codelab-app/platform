import type {
  IUserPreference,
  IUserService,
} from '@codelab/frontend/abstract/application'
import {
  BuilderWidth,
  BuilderWidthBreakPoint,
} from '@codelab/frontend/abstract/application'
import type { IUserDomainService } from '@codelab/frontend/abstract/domain'
import { restWebClient } from '@codelab/frontend/application/axios'
import { User, UserDomainService } from '@codelab/frontend/domain/user'
import type { Auth0IdToken, IUserDto } from '@codelab/shared/abstract/core'
import type { UserWhere } from '@codelab/shared/abstract/types'
import { computed } from 'mobx'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
  transaction,
} from 'mobx-keystone'
import { userApi } from './user.api'

const CODELAB_STORAGE_KEY = 'codelab-preferences'
const DEFAULT_PREFERENCES = { apps: {}, explorerExpandedNodes: {} }

const init = (data: Auth0IdToken) => {
  const user = User.fromSession(data)

  return fromDto(user)
}

const fromDto = (user: IUserDto) => {
  const userDomainService = UserDomainService.fromDto(user)

  return new UserService({ userDomainService })
}

@model('@codelab/UserService')
export class UserService
  extends Model({
    preferences: prop<IUserPreference>(() => DEFAULT_PREFERENCES),
    userDomainService: prop<IUserDomainService>(),
  })
  implements IUserService
{
  static fromDto = fromDto

  static init = init

  @computed
  get user() {
    return this.userDomainService.user
  }

  @modelFlow
  fetchPreferences = _async(function* (this: UserService) {
    if (typeof window === 'undefined') {
      // SSR not supported for client preferences service
      return
    }

    const preferences = localStorage.getItem(CODELAB_STORAGE_KEY)

    this.preferences = preferences ? JSON.parse(preferences) : this.preferences

    const user = yield* _await(this.getOne({ id: this.user.id }))

    this.preferences = user?.preferences
      ? JSON.parse(user.preferences)
      : this.preferences
  })

  @modelFlow
  @transaction
  getOne = _async(function* (this: UserService, where: UserWhere) {
    const {
      users: [user],
    } = yield* _await(userApi.GetUsers({ where }))

    return user
  })

  @modelFlow
  saveUser = _async(function* (this: UserService, data: Auth0IdToken) {
    return yield* _await(restWebClient.post('/user/save', data))
  })

  @modelAction
  setElementTreeExpandedKeys(
    this: UserService,
    containerId: string,
    expandedKeys: Array<string>,
  ) {
    this.preferences.explorerExpandedNodes[containerId] = expandedKeys

    void this.savePreferences()
  }

  @modelAction
  setSelectedBuilderBreakpoint(
    this: UserService,
    containerId: string,
    breakpoint: BuilderWidthBreakPoint,
  ) {
    this.preferences.apps[containerId] ??= {}
    this.preferences.apps[containerId]!.selectedBuilderBreakpoint = breakpoint

    void this.savePreferences()
  }

  @modelAction
  setSelectedBuilderWidth(
    this: UserService,
    containerId: string,
    width: BuilderWidth,
  ) {
    this.preferences.apps[containerId] ??= {}
    this.preferences.apps[containerId]!.selectedBuilderWidth = { ...width }

    void this.savePreferences()
  }

  onAttachedToRootStore() {
    void this.fetchPreferences()
  }

  savePreferences() {
    const preferences = JSON.stringify(this.preferences)

    localStorage.setItem(CODELAB_STORAGE_KEY, JSON.stringify(preferences))

    return userApi.UpdateUser({
      update: { preferences },
      where: { id: this.user.id },
    })
  }
}
