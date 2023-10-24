import type {
  ICreateTypeData,
  IInterfaceTypeModel,
  IInterfaceTypeRef,
  ITypeDomainService,
  ITypeModel,
  IUpdateTypeData,
} from '@codelab/frontend/abstract/domain'
import type {
  GetTypesQuery,
  IBaseType,
  IBaseTypeOptions,
  IBaseTypeWhere,
} from '@codelab/shared/abstract/codegen'
import type { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IPaginateable,
  IQueryService,
} from '../services'
import type { ITypeRepository } from './type.repo.interface'

export interface ITypeService
  extends ICRUDService<ITypeModel, ICreateTypeData, IUpdateTypeData>,
    Omit<IQueryService<ITypeModel, IBaseTypeWhere, IBaseTypeOptions>, 'getAll'>,
    ICRUDModalService<Ref<ITypeModel>, { type?: ITypeModel }>,
    ICRUDFormService<Ref<ITypeModel>, { type?: ITypeModel }>,
    IPaginateable<ITypeModel, { name?: string }> {
  typeDomainService: ITypeDomainService
  typeRepository: ITypeRepository

  getAll(ids?: Array<string>): Promise<Array<ITypeModel>>
  getInterface(id: IInterfaceTypeRef): Promise<IInterfaceTypeModel>
  getOptions(): Promise<Array<Pick<IBaseType, 'id' | 'kind' | 'name'>>>
  primitiveKind(id: string): Nullable<IPrimitiveTypeKind>
  type(id: string): Maybe<ITypeModel>
}
