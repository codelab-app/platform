import type {
  IAuth0Owner,
  IBaseType,
  IBaseTypeDTO,
} from '@codelab/frontend/abstract/core'
import { ITypeDTO } from '@codelab/frontend/abstract/core'
import type { ITypeKind } from '@codelab/shared/abstract/core'
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
    implements IBaseType<IBaseTypeDTO>
  {
    @modelAction
    add(fragment: ITypeDTO) {
      updateBaseTypeCache(this, fragment)

      return this
    }

    @modelAction
    writeCache(baseTypeDTO: Partial<IBaseTypeDTO>) {
      updateBaseTypeCache(this, baseTypeDTO)

      return this
    }

    // toString() {
    //   return `{ ${this.name}: ${this.kind} }`
    // }
  }

  return BaseType
}
