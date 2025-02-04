import type {
  IPreferenceModel,
  IUserModel,
} from '@codelab/frontend/abstract/domain'
import type {
  IBreakpoint,
  IBreakpointType,
  IPreferenceDto,
} from '@codelab/shared/abstract/core'
import type { PreferenceDeleteInput } from '@codelab/shared/infra/gqlgen'
import type { Ref } from 'mobx-keystone'

import { userRef } from '@codelab/frontend/abstract/domain'
import { breakpoints } from '@codelab/shared/config/builder'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

const create = ({
  builderBreakpointType,
  builderWidth,
  id,
}: IPreferenceDto) => {
  return new Preference({
    builderBreakpointType,
    builderWidth,
    id,
  })
}

@model('@codelab/Preference')
export class Preference
  extends Model({
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
      builderBreakpointType: this.builderBreakpointType,
      builderWidth: this.builderWidth,
      id: this.id,
    }
  }

  @modelAction
  writeCache({ builderBreakpointType, builderWidth }: Partial<IPreferenceDto>) {
    this.builderBreakpointType =
      builderBreakpointType ?? this.builderBreakpointType

    // when breakpoint changes set width to default
    this.builderWidth =
      !builderWidth && builderBreakpointType
        ? this.builderBreakpoint.default
        : builderWidth ?? this.builderWidth

    return this
  }
}
