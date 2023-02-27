import type {
  IAuth0Owner,
  IBaseType,
  ITypeDTO,
} from '@codelab/frontend/abstract/core'
import type { ITypeKind } from '@codelab/shared/abstract/core'
import { idProp, Model, prop } from 'mobx-keystone'
import { updateBaseTypeCache } from '../base-type'

export const createBaseType = <T extends ITypeKind>(typeKind: T) => {
  return class
    extends Model({
      id: idProp,
      name: prop<string>(),
      kind: prop<T>(() => typeKind),
      owner: prop<IAuth0Owner>().withSetter(),
    })
    implements IBaseType
  {
    add(fragment: ITypeDTO) {
      updateBaseTypeCache(this, fragment)

      return this
    }

    // toString() {
    //   return `{ ${this.name}: ${this.kind} }`
    // }
  }
}
