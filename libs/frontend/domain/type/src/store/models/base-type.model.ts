import type {
  IAuth0Owner,
  IBaseType,
  IBaseTypeDTO,
  ICreateTypeInput,
  IUpdateTypeVars,
} from '@codelab/frontend/abstract/core'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import { connectAuth0Owner } from '@codelab/shared/domain/mapper'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'

export const createBaseType = <T extends ITypeKind>(typeKind: T) => {
  @model(`@codelab/BaseType/${typeKind}`)
  class BaseType
    extends Model({
      id: idProp,
      kind: prop<T>(() => typeKind),
      name: prop<string>(),
      owner: prop<IAuth0Owner>().withSetter(),
    })
    implements IBaseType<IBaseTypeDTO, ICreateTypeInput, IUpdateTypeVars>
  {
    @modelAction
    writeCache(baseTypeDTO: Partial<IBaseTypeDTO>) {
      updateBaseTypeCache(this, baseTypeDTO)

      return this
    }

    toCreateInput() {
      return {
        id: this.id,
        kind: this.kind,
        name: this.name,
        owner: connectAuth0Owner(this.owner),
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
