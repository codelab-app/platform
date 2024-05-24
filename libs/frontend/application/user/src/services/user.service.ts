import type {
  IUserPreference,
  IUserService,
} from '@codelab/frontend/abstract/application'
import {
  BuilderWidth,
  BuilderWidthBreakPoint,
} from '@codelab/frontend/abstract/application'
import type { IUserDomainService } from '@codelab/frontend/abstract/domain'
import { restWebClient } from '@codelab/frontend-application-axios/axios/rest-client'
import { UserDomainService } from '@codelab/frontend-domain-user/services/user.domain.service'
import { User } from '@codelab/frontend-domain-user/store'
import type { Auth0IdToken, IUserDto } from '@codelab/shared/abstract/core'
import type { UserWhere } from '@codelab/shared/abstract/types'
import set from 'lodash/set'
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
  return new UserService({
    userDomainService: UserDomainService.fromDto(user),
  })
}

@model('@codelab/UserService')
export class UserService
  extends Model({
    userDomainService: prop<IUserDomainService>(),
  })
  implements IUserService
{
  static fromDto = fromDto

  static init = init

  get preferences(): IUserPreference {
    return this.user.preferences as IUserPreference
  }

  set preferences(value: IUserPreference) {
    this.user.preferences = value
  }

  @computed
  get user() {
    return this.userDomainService.user
  }

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
    set(this.preferences, `explorerExpandedNodes.${containerId}`, expandedKeys)

    void this.savePreferences()
  }

  @modelAction
  setSelectedBuilderBreakpoint(
    this: UserService,
    containerId: string,
    breakpoint: BuilderWidthBreakPoint,
  ) {
    set(
      this.preferences,
      `apps.${containerId}.selectedBuilderBreakpoint`,
      breakpoint,
    )

    void this.savePreferences()
  }

  @modelAction
  setSelectedBuilderWidth(
    this: UserService,
    containerId: string,
    width: BuilderWidth,
  ) {
    set(this.preferences, `apps.${containerId}.selectedBuilderWidth`, width)

    void this.savePreferences()
  }

  fetchPreferences() {
    if (typeof window === 'undefined') {
      // SSR not supported for client preferences service
      return
    }

    const preferences = localStorage.getItem(CODELAB_STORAGE_KEY)

    this.preferences = preferences
      ? JSON.parse(preferences)
      : DEFAULT_PREFERENCES
  }

  onAttachedToRootStore() {
    void this.fetchPreferences()
  }

  savePreferences() {
    localStorage.setItem(CODELAB_STORAGE_KEY, JSON.stringify(this.preferences))
  }
}
