import type { ITypeKind, IUnionTypeDto } from '@codelab/shared/abstract/core'
import type {
  UnionTypeCreateInput,
  UpdateUnionTypesMutationVariables,
} from '@codelab/shared/infra/gql'
import type { Ref } from 'mobx-keystone'
import type { IBaseTypeModel, ITypeModel } from './base-type.model.interface'

export interface IUnionTypeModel
  extends IBaseTypeModel<
    IUnionTypeDto,
    UnionTypeCreateInput,
    UpdateUnionTypesMutationVariables
  > {
  kind: ITypeKind.UnionType
  typesOfUnionType: Array<Ref<ITypeModel>>
}
