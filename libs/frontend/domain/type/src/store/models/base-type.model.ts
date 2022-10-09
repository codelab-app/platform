import { IBaseType, ITypeDTO } from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { idProp, Model, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'

export const createBaseType = <T extends ITypeKind>(typeKind: T) => {
  return class
    extends Model({
      id: idProp,
      name: prop<string>(),
      kind: prop<T>(() => typeKind),
      ownerId: prop<string>().withSetter(),
    })
    implements IBaseType
  {
    writeCache(fragment: ITypeDTO) {
      updateBaseTypeCache(this, fragment)

      return this
    }

    toString() {
      return `{ ${this.name}: ${this.kind} }`
    }
  }
}
