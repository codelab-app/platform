import type {
  IPreferenceDomainService,
  IPreferenceModel,
} from '@codelab/frontend/abstract/domain'
import type { IPreferenceDto } from '@codelab/shared/abstract/core'

import { Model, model, prop } from 'mobx-keystone'

import { Preference } from '../store'

const fromDto = (preference: IPreferenceDto) => {
  return new PreferenceDomainService({
    preference: Preference.create(preference),
  })
}

@model('@codelab/PreferenceDomainService')
export class PreferenceDomainService
  extends Model({
    preference: prop<IPreferenceModel>(),
  })
  implements IPreferenceDomainService
{
  static fromDto = fromDto
}
