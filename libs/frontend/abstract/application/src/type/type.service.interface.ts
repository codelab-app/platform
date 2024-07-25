import type {
  IInterfaceTypeModel,
  ITypeDomainService,
  ITypeModel,
  IUpdateTypeDto,
} from '@codelab/frontend/abstract/domain'
import type {
  IBaseType,
  IBaseTypeOptions,
  IBaseTypeWhere,
} from '@codelab/shared/abstract/codegen'
import type {
  ICreateTypeDto,
  IPrimitiveTypeKind,
} from '@codelab/shared/abstract/core'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IPaginateable,
  IQueryService,
} from '../services'

export interface ITypeService
  extends ICRUDService<ITypeModel, ICreateTypeDto, IUpdateTypeDto>,
    Omit<IQueryService<ITypeModel, IBaseTypeWhere, IBaseTypeOptions>, 'getAll'>,
    ICRUDModalService<Ref<ITypeModel>, { type?: ITypeModel }>,
    ICRUDFormService<Ref<ITypeModel>, { type?: ITypeModel }>,
    IPaginateable<ITypeModel, { name?: string }> {
  typeDomainService: ITypeDomainService

  getAll(ids?: Array<string>): Promise<Array<ITypeModel>>
  getInterface(id: string): Promise<IInterfaceTypeModel>
  getOptions(): Promise<Array<Pick<IBaseType, 'id' | 'kind' | 'name'>>>
  getType(id: string): Maybe<ITypeModel>
  primitiveKind(id: string): Nullable<IPrimitiveTypeKind>
}
