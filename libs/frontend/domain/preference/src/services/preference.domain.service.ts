import {
  IPreferenceDomainService,
  IPreferenceModel,
} from '@codelab/frontend/abstract/domain'
import { IPreferenceDto } from '@codelab/shared/abstract/core'
import { computed } from 'mobx'
import type { ObjectMap } from 'mobx-keystone'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Preference } from '../store/preference.model'

@model('@codelab/PreferenceDomainService')
export class PreferenceDomainService
  extends Model({
    preferences: prop<ObjectMap<IPreferenceModel>>(() => objectMap()),
  })
  implements IPreferenceDomainService
{
  @computed
  get preferencesList() {
    return [...this.preferences.values()]
  }

  @modelAction
  hydrate(preferenceDto: IPreferenceDto) {
    const existingPreference = this.preferences.get(preferenceDto.id)

    if (existingPreference) {
      return existingPreference.writeCache(preferenceDto)
    } else {
      const preference: IPreferenceModel = Preference.create(preferenceDto)

      this.preferences.set(preference.id, preference)

      return preference
    }
  }
}
