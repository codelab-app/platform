import type { IBaseType, ITypeDTO } from '@codelab/frontend/abstract/core'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import { idProp, Model, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'

export const createBaseType = <T extends ITypeKind>(typeKind: T) => {
  return class BaseType
    extends Model({
      id: idProp,
      name: prop<string>(),
      ownerId: prop<string>().withSetter(),
      kind: prop<T>(() => typeKind),
    })
    implements IBaseType
  {
    writeCache(fragment: ITypeDTO) {
      updateBaseTypeCache(this, fragment)

      return this
    }

    // toString() {
    //   return `{ ${this.name}: ${this.kind} }`
    // }
  }
}
