import { IBaseType, ITypeKind } from '@codelab/shared/abstract/core'
import { idProp, Model, prop } from 'mobx-keystone'

export const createTypeBase = <T extends ITypeKind>(typeKind: T) => {
  return class
    extends Model({
      id: idProp,
      name: prop<string>(),
      kind: prop<T>(() => typeKind),
      ownerId: prop<string>().withSetter(),
    })
    implements IBaseType {}
}
