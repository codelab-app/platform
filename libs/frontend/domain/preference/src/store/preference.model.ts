import type { IPreferenceModel } from '@codelab/frontend/abstract/domain'
import type {
  IBreakpoint,
  IBreakpointType,
  IConfigPaneTab,
  IPreferenceDto,
} from '@codelab/shared/abstract/core'
import type { PreferenceDeleteInput } from '@codelab/shared/infra/gqlgen'

import { breakpoints } from '@codelab/shared/config/builder'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({
  activeConfigPaneTab,
  builderBreakpointType,
  builderWidth,
  id,
}: IPreferenceDto) => {
  return new Preference({
    activeConfigPaneTab,
    builderBreakpointType,
    builderWidth,
    id,
  })
}

@model('@codelab/Preference')
export class Preference
  extends Model({
    activeConfigPaneTab: prop<IConfigPaneTab>(),
    builderBreakpointType: prop<IBreakpointType>(),
    builderWidth: prop<number>(),
    id: idProp,
  })
  implements IPreferenceModel
{
  static create = create

  static toDeleteInput(): PreferenceDeleteInput {
    return {}
  }

  @computed
  get builderBreakpoint(): IBreakpoint {
    return breakpoints[this.builderBreakpointType]
  }

  @computed
  get toJson() {
    return {
      $modelType: 'serialized' as const,
      activeConfigPaneTab: this.activeConfigPaneTab,
      builderBreakpointType: this.builderBreakpointType,
      builderWidth: this.builderWidth,
      id: this.id,
    }
  }

  @modelAction
  writeCache({
    activeConfigPaneTab,
    builderBreakpointType,
    builderWidth,
  }: Partial<IPreferenceDto>) {
    this.builderBreakpointType =
      builderBreakpointType ?? this.builderBreakpointType

    // when breakpoint changes set width to default
    this.builderWidth =
      !builderWidth && builderBreakpointType
        ? this.builderBreakpoint.default
        : builderWidth ?? this.builderWidth

    this.activeConfigPaneTab = activeConfigPaneTab ?? this.activeConfigPaneTab

    return this
  }
}
