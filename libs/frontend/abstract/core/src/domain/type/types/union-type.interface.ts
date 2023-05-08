import type {
  UnionTypeCreateInput,
  UpdateUnionTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { ITypeKind, IUnionTypeDTO } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IBaseType, IType } from './base-type.interface'

export interface IUnionType
  extends IBaseType<
    IUnionTypeDTO,
    UnionTypeCreateInput,
    UpdateUnionTypesMutationVariables
  > {
  kind: ITypeKind.UnionType
  typesOfUnionType: Array<Ref<IType>>
}
