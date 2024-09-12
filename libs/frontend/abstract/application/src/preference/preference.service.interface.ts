import type {
  IPreferenceModel,
  IUpdatePreferenceData,
} from '@codelab/frontend/abstract/domain'
import type { ICRUDService } from '../services'

export type IPreferenceService = Pick<
  ICRUDService<IPreferenceModel, undefined, IUpdatePreferenceData>,
  'update'
>
