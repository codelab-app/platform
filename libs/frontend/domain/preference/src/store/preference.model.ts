import {
  type IPreferenceModel,
  IUserModel,
  userRef,
} from '@codelab/frontend/abstract/domain'
import { IBreakpoint, type IPreferenceDto } from '@codelab/shared/abstract/core'
import type {
  PreferenceCreateInput,
  PreferenceDeleteInput,
  PreferenceUpdateInput,
} from '@codelab/shared/infra/gql'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop, Ref } from 'mobx-keystone'

const create = ({
  builderBreakpoint,
  builderWidth,
  id,
  owner,
}: IPreferenceDto) => {
  return new Preference({
    builderBreakpoint,
    builderWidth,
    id,
    owner: userRef(owner.id),
  })
}

@model('@codelab/Preference')
export class Preference
  extends Model({
    builderBreakpoint: prop<IBreakpoint>(),
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
  get toJson() {
    return {
      $modelType: 'serialized' as const,
      builderBreakpoint: this.builderBreakpoint,
      builderWidth: this.builderWidth,
      id: this.id,
      owner: this.owner.current.toJson,
    }
  }

  @modelAction
  writeCache({ builderBreakpoint, builderWidth }: Partial<IPreferenceDto>) {
    this.builderBreakpoint = builderBreakpoint ?? this.builderBreakpoint
    this.builderWidth = builderWidth ?? this.builderWidth

    return this
  }

  toCreateInput(): PreferenceCreateInput {
    return {
      builderBreakpoint: this.builderBreakpoint,
      builderWidth: this.builderWidth,
      id: this.id,
    }
  }

  toUpdateInput(): PreferenceUpdateInput {
    return {
      builderBreakpoint: this.builderBreakpoint,
      builderWidth: this.builderWidth,
    }
  }
}
