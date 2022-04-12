import { Ref } from 'mobx-keystone'
import { IBaseType } from '../base-type/base-type.interface'
import { TypeKind } from '../base-type/type-kind.enum'
import { IAnyType } from '../type.interface'

export interface IUnionType extends IBaseType {
  typeKind: typeof TypeKind.UnionType
  typesOfUnionType: Array<Ref<IAnyType>>
}
