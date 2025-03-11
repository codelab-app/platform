import type { IMapper, IPreferenceDto } from '@codelab/shared/abstract/core'
import type {
  PreferenceCreateInput,
  PreferenceDeleteInput,
  PreferenceUpdateInput,
} from '@codelab/shared/infra/gqlgen'

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
  }: IPreferenceDto): PreferenceCreateInput => {
    return {
      builderBreakpointType,
      builderWidth,
      id,
    }
  },

  toDeleteInput: (): PreferenceDeleteInput => {
    return {}
  },

  toUpdateInput: ({
    builderBreakpointType,
    builderWidth,
  }: IPreferenceDto): PreferenceUpdateInput => {
    return {
      builderBreakpointType,
      builderWidth,
    }
  },
}
