import type {
  UnionTypeCreateInput,
  UpdateUnionTypesMutationVariables,
} from '@codelab/shared/abstract/codegen'
import type { ITypeKind, IUnionTypeDTO } from '@codelab/shared/abstract/core'
import type { Ref } from 'mobx-keystone'
import type { IBaseTypeModel, ITypeModel } from './base-type.model.interface'

export interface IUnionTypeModel
  extends IBaseTypeModel<
    IUnionTypeDTO,
    UnionTypeCreateInput,
    UpdateUnionTypesMutationVariables
  > {
  kind: ITypeKind.UnionType
  typesOfUnionType: Array<Ref<ITypeModel>>
}
