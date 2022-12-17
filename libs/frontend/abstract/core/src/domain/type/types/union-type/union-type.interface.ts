import type { ITypeKind } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IBaseType } from '../base-type'
import type { IAnyType } from '../type.interface'

export interface IUnionType extends IBaseType {
  kind: ITypeKind.UnionType
  typesOfUnionType: Array<Ref<IAnyType>>
}
