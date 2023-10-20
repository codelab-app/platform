import { getUserService } from '@codelab/frontend/abstract/application'
import {
  type IBaseTypeModel,
  type ICreateTypeInput,
  type IUpdateTypeVars,
} from '@codelab/frontend/abstract/domain'
import type { IBaseTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import { connectOwner } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

export const createBaseType = <T extends ITypeKind>(typeKind: T) => {
  @model(`@codelab/BaseType${typeKind}`)
  class BaseType
    extends Model({
      __typename: prop(`${typeKind}` as const),
      id: idProp,
      kind: prop<T>(() => typeKind),
      name: prop<string>(),
    })
    implements IBaseTypeModel<IBaseTypeDTO, ICreateTypeInput, IUpdateTypeVars>
  {
    @modelAction
    writeCache({ name }: Partial<IBaseTypeDTO>) {
      this.name = name ?? this.name

      return this
    }

    @computed
    get toJson() {
      return {
        __typename: this.__typename,
        id: this.id,
        kind: this.kind,
        name: this.name,
      }
    }

    toCreateInput() {
      return {
        id: this.id,
        kind: this.kind,
        name: this.name,
        owner: connectOwner(this.userService.user),
      }
    }

    toUpdateInput() {
      return {
        update: {
          name: this.name,
        },
        where: { id: this.id },
      }
    }

    @computed
    private get userService() {
      return getUserService(this)
    }
  }

  return BaseType
}
