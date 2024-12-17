import type { IMapper, IPreferenceDto } from '@codelab/shared/abstract/core'
import type {
  PreferenceCreateInput,
  PreferenceDeleteInput,
  PreferenceUpdateInput,
} from '@codelab/shared/infra/gql'

import { connectOwner } from '@codelab/shared/domain/orm'

export const preferenceMapper: IMapper<
  IPreferenceDto,
  PreferenceCreateInput,
  PreferenceUpdateInput,
  PreferenceDeleteInput
> = {
  toCreateInput: ({
    builderBreakpointType,
    builderWidth,
    id,
    owner,
  }: IPreferenceDto): PreferenceCreateInput => {
    return {
      builderBreakpointType,
      builderWidth,
      id,
      owner: connectOwner(owner),
    }
  },

  toDeleteInput: (): PreferenceDeleteInput => {
    return {}
  },

  toUpdateInput: ({
    builderBreakpointType,
    builderWidth,
    owner,
  }: IPreferenceDto): PreferenceUpdateInput => {
    return {
      builderBreakpointType,
      builderWidth,
    }
  },
}
