import type {
  BaseTypeOptions,
  BaseTypeWhere,
  GetTypesQuery,
} from '@codelab/shared/abstract/codegen'
import type { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { ArraySet, ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IPaginationService,
  IQueryService,
} from '../../service'
import type {
  ICreateTypeData,
  ITypeDTO,
  IUpdateTypeData,
} from './type.dto.interface'
import type { ITypeRepository } from './type.repo.interface'
import type { IInterfaceType, IInterfaceTypeRef, IType } from './types'

export interface ITypeService
  extends ICRUDService<IType, ICreateTypeData, IUpdateTypeData>,
    Omit<IQueryService<IType, BaseTypeWhere, BaseTypeOptions>, 'getAll'>,
    ICRUDModalService<Ref<IType>, { type: Maybe<IType> }> {
  paginationService: IPaginationService<IType, { name?: string }>
  selectedIds: ArraySet<string>
  typeRepository: ITypeRepository
  types: ObjectMap<IType>
  typesList: Array<IType>

  add(type: ITypeDTO): IType
  addInterface(data: ICreateTypeData): IInterfaceType
  getAll(ids?: Array<string>): Promise<Array<IType>>
  getInterface(id: IInterfaceTypeRef): Promise<IInterfaceType>
  loadTypes(types: Partial<GetTypesQuery>): Array<IType>
  primitiveKind(id: string): Nullable<IPrimitiveTypeKind>
  setSelectedIds(ids: ArraySet<string>): void
  type(id: string): Maybe<IType>
}
