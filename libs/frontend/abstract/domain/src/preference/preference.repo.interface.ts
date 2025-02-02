import type { IPreferenceDto } from '@codelab/shared/abstract/core'
import type {
  PreferenceFragment,
  PreferenceOptions,
  PreferenceWhere,
} from '@codelab/shared/infra/gqlgen'

import type { IRepository } from '../shared'

export type IPreferenceRepository = IRepository<
  IPreferenceDto,
  PreferenceFragment,
  PreferenceWhere,
  PreferenceOptions
>
