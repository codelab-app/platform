import type {
  PreferenceFragment,
  PreferenceOptions,
  PreferenceWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IPreferenceModel } from './preference.model.interface'

export type IPreferenceRepository = IRepository<
  IPreferenceModel,
  PreferenceFragment,
  PreferenceWhere,
  PreferenceOptions
>
