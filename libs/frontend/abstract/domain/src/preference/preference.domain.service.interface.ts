import type { ObjectMap } from 'mobx-keystone'
import type { IPreferenceModel } from './preference.model.interface'

export interface IPreferenceDomainService {
  preferences: ObjectMap<IPreferenceModel>
  preferencesList: Array<IPreferenceModel>
}
