import {
  IAnyType,
  IBaseType,
  IUpdateTypeDTO,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { idProp, Model, prop } from 'mobx-keystone'
import {
  typeCreateInputFactory,
  typeUpdateInputFactory,
} from '../../shared/type-input.factory'

export const createTypeBase = <T extends TypeKind>(typeKind: T) => {
  return class
    extends Model({
      id: idProp,
      name: prop<string>(),
      typeKind: prop<T>(() => typeKind),
      ownerAuth0Id: prop<string>().withSetter(),
    })
    implements IBaseType
  {
    makeCreateInput(currentUserAuth0Id: string) {
      return typeCreateInputFactory(this as any as IAnyType, currentUserAuth0Id)
    }

    makeUpdateInput() {
      return typeUpdateInputFactory(this as any as IAnyType)
    }

    applyUpdateData({ name }: IUpdateTypeDTO) {
      this.name = name
    }

    updateCache(fragment: any) {
      throw new Error('Need to implement!')
    }
  }
}
