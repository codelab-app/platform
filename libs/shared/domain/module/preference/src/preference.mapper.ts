import type { IMapper, IPreferenceDto } from '@codelab/shared-abstract-core'
import type {
  PreferenceCreateInput,
  PreferenceDeleteInput,
  PreferenceUpdateInput,
} from '@codelab/shared-infra-gqlgen'

export const preferenceMapper: IMapper<
  IPreferenceDto,
  PreferenceCreateInput,
  PreferenceUpdateInput,
  PreferenceDeleteInput
> = {
  toCreateInput: ({
    activeConfigPaneTab,
    builderBreakpointType,
    builderWidth,
    id,
  }: IPreferenceDto): PreferenceCreateInput => {
    return {
      activeConfigPaneTab,
      builderBreakpointType,
      builderWidth,
      id,
    }
  },

  toDeleteInput: (): PreferenceDeleteInput => {
    return {}
  },

  toUpdateInput: ({
    activeConfigPaneTab,
    builderBreakpointType,
    builderWidth,
  }: IPreferenceDto): PreferenceUpdateInput => {
    return {
      activeConfigPaneTab,
      builderBreakpointType,
      builderWidth,
    }
  },
}
