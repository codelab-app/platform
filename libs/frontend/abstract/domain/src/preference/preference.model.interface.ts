import type {
  IBreakpoint,
  IBreakpointType,
  IPreference,
  IPreferenceDto,
} from '@codelab/shared/abstract/core'
import type {
  PreferenceCreateInput,
  PreferenceDeleteInput,
  PreferenceUpdateInput,
} from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'

import type { ICacheService, IModel } from '../shared'
import type { IUserModel } from '../user'

export interface IPreferenceModel
  extends IModel<
      PreferenceCreateInput,
      PreferenceUpdateInput,
      PreferenceDeleteInput,
      IPreference
    >,
    ICacheService<IPreferenceDto, IPreferenceModel> {
  builderBreakpoint: IBreakpoint
  builderBreakpointType: IBreakpointType
  builderWidth: number
  id: string
  owner: Ref<IUserModel>
}
