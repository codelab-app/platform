import {
  IPreferenceModel,
  IUserModel,
  userRef,
} from '@codelab/frontend/abstract/domain'
import { breakpoints } from '@codelab/frontend/shared/config'
import {
  IBreakpoint,
  IBreakpointType,
  IPreferenceDto,
} from '@codelab/shared/abstract/core'
import { PreferenceDeleteInput } from '@codelab/shared/infra/gql'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop, Ref } from 'mobx-keystone'

const create = ({
  builderBreakpointType,
  builderWidth,
  id,
  owner,
}: IPreferenceDto) => {
  return new Preference({
    builderBreakpointType,
    builderWidth,
    id,
    owner: userRef(owner.id),
  })
}

@model('@codelab/Preference')
export class Preference
  extends Model({
    builderBreakpointType: prop<IBreakpointType>(),
    builderWidth: prop<number>(),
    id: idProp,
    owner: prop<Ref<IUserModel>>(),
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
      owner: this.owner.current.toJson,
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
