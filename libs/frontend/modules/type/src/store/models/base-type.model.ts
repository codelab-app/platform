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
    implements IBaseType {
    // makeCreateInput(currentUserAuth0Id: string) {
    //   return createTypeInput(this as any as IAnyType, currentUserAuth0Id)
    // }
    //
    // makeUpdateInput() {
    //   return typeUpdateInputFactory(this as any as IAnyType)
    // }
    //
    // applyUpdateData({ name }: IUpdateTypeDTO) {
    //   this.name = name
    // }
    //
    // updateCache(fragment: any) {
    //   throw new Error('Need to implement!')
    // }
  }
}
