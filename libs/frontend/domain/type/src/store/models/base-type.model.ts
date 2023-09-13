import {
  getUserService,
  type IBaseType,
  type ICreateTypeInput,
  type IUpdateTypeVars,
} from '@codelab/frontend/abstract/core'
import type { IBaseTypeDTO, ITypeKind } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import { computed } from 'mobx'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'

export const createBaseType = <T extends ITypeKind>(typeKind: T) => {
  @model(`@codelab/BaseType${typeKind}`)
  class BaseType
    extends Model({
      id: idProp,
      kind: prop<T>(() => typeKind),
      name: prop<string>(),
    })
    implements IBaseType<IBaseTypeDTO, ICreateTypeInput, IUpdateTypeVars>
  {
    @modelAction
    writeCache({ name }: Partial<IBaseTypeDTO>) {
      this.name = name ?? this.name

      return this
    }

    @computed
    private get userService() {
      return getUserService(this)
    }

    toCreateInput() {
      return {
        id: this.id,
        kind: this.kind,
        name: this.name,
        owner: connectAuth0Owner(this.userService.user),
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

    // toString() {
    //   return `{ ${this.name}: ${this.kind} }`
    // }
  }

  return BaseType
}
