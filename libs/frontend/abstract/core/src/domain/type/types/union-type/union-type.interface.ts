import { ITypeKind } from '@codelab/shared/abstract/core'
import { Ref } from 'mobx-keystone'
import { IBaseType } from '../base-type'
import { IAnyType } from '../type.interface'

export interface IUnionType extends IBaseType {
  kind: ITypeKind.UnionType
  typesOfUnionType: Array<Ref<IAnyType>>
}
