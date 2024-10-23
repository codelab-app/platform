import type {
  IPreferenceModel,
  IUpdatePreferenceData,
} from '@codelab/frontend/abstract/domain'
import type { IRef } from '@codelab/shared/abstract/core'

import type { ICrudService } from '../services'

export type IPreferenceService = Pick<
  ICrudService<IRef, undefined, IUpdatePreferenceData>,
  'update'
>
