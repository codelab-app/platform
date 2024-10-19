import type {
  PreferenceCreateInput,
  PreferenceDeleteInput,
  PreferenceFragment,
  PreferenceOptions,
  PreferenceUpdateInput,
  PreferenceWhere,
} from '@codelab/shared/infra/gql'

import type { IRepository } from '../shared'
import type { IPreferenceModel } from './preference.model.interface'

export type IPreferenceRepository = IRepository<
  PreferenceCreateInput,
  PreferenceUpdateInput,
  PreferenceDeleteInput,
  PreferenceFragment,
  PreferenceWhere,
  PreferenceOptions
>
