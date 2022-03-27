import { IAnyType, TypeKind } from '@codelab/shared/abstract/core'
import { idProp, Model, model, modelAction, prop } from 'mobx-keystone'
import { TypeFragment } from '../../graphql/fragments'

export const createTypeBase = <T extends TypeKind>(typeKind: T) => {
  @model('codelab/TypeBase')
  class TypeBase extends Model({
    id: idProp,
    name: prop<string>(),
    typeKind: prop<T>(() => typeKind),
  }) {}

  return TypeBase
}
