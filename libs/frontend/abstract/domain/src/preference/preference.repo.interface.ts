import type { IPreferenceDto } from '@codelab/shared/abstract/core'
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
  IPreferenceDto,
  PreferenceFragment,
  PreferenceWhere,
  PreferenceOptions
>
