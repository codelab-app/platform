import type {
  IBuilderPreferences,
  IUserPreferenceModel,
} from '@codelab/frontend/abstract/domain'
import { reaction } from 'mobx'
import {
  fromSnapshot,
  getSnapshot,
  Model,
  model,
  modelAction,
  ObjectMap,
  objectMap,
  prop,
} from 'mobx-keystone'

const CODELAB_STORAGE_KEY = 'codelab-preferences'

const init = () => {
  const storedPreferences = localStorage.getItem(CODELAB_STORAGE_KEY)
  const snapshot = storedPreferences ? JSON.parse(storedPreferences) : undefined

  return snapshot
    ? fromSnapshot<UserPreference>(snapshot)
    : new UserPreference({})
}

@model('@codelab/UserPreference')
export class UserPreference
  extends Model({
    builder: prop<ObjectMap<IBuilderPreferences>>(() => objectMap([])),
  })
  implements IUserPreferenceModel
{
  static init = init

  /**
   * @param compositeKey of page or component
   */
  @modelAction
  getBuilderPreference(compositeKey: string) {
    return this.builder.get(compositeKey)
  }

  /**
   * @param compositeKey of page or component
   */
  @modelAction
  setBuilderPreference(
    compositeKey: string,
    preferences: Partial<IBuilderPreferences>,
  ) {
    const oldPreferences = this.builder.get(compositeKey) ?? {}

    this.builder.set(compositeKey, {
      ...oldPreferences,
      ...preferences,
    })
  }

  onAttachedToRootStore() {
    // every time the snapshot of the configuration changes
    const reactionDisposer = reaction(
      () => getSnapshot(this),
      (sn) => {
        // save the config to local storage
        localStorage.setItem(CODELAB_STORAGE_KEY, JSON.stringify(sn))
      },
      {
        // also run the reaction the first time
        fireImmediately: true,
      },
    )

    // when the model is no longer part of the root store stop saving
    return () => {
      reactionDisposer()
    }
  }
}
