import {
  type IUserPreference,
  type IUserPreferenceService,
} from '@codelab/frontend/abstract/application'
import { restWebClient } from '@codelab/frontend/application/axios'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
} from 'mobx-keystone'

const CODELAB_STORAGE_KEY = 'codelab-preferences'
const DEFAULT_PREFERENCES = { explorerExpandedNodes: {} }

@model('@codelab/UserPreferenceService')
export class UserPreferenceService
  extends Model({
    preferences: prop<IUserPreference>(() => DEFAULT_PREFERENCES),
  })
  implements IUserPreferenceService
{
  @modelFlow
  init = _async(function* (this: UserPreferenceService) {
    if (typeof window === 'undefined') {
      // SSR not supported for client preferences service
      return
    }

    const preferences = localStorage.getItem(CODELAB_STORAGE_KEY)

    this.preferences = preferences ? JSON.parse(preferences) : this.preferences
    this.preferences =
      (yield* _await(restWebClient.get('/user/preferences'))).data ||
      this.preferences
  })

  @modelAction
  setElementTreeExpandedKeys(
    this: UserPreferenceService,
    containerId: string,
    expandedKeys: Array<string>,
  ) {
    this.preferences.explorerExpandedNodes[containerId] = expandedKeys

    void this.savePreferences()
  }

  onAttachedToRootStore() {
    void this.init()
  }

  savePreferences() {
    localStorage.setItem(CODELAB_STORAGE_KEY, JSON.stringify(this.preferences))

    return restWebClient.post('/user/preferences', {
      preferences: JSON.stringify(this.preferences),
    })
  }
}
