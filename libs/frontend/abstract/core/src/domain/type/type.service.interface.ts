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
  IQueryService,
} from '../../service'
import type {
  ICreateTypeData,
  ITypeDTO,
  IUpdateTypeData,
} from './type.dto.interface'
import type { IType, IInterfaceType, IInterfaceTypeRef } from './types'

export interface BaseTypesOptions {
  limit?: number
  offset?: number
  where?: {
    name: string
  }
}

export interface ITypeService
  extends ICRUDService<IType, ICreateTypeData, IUpdateTypeData>,
    IQueryService<IType, BaseTypeWhere, BaseTypeOptions>,
    ICRUDModalService<Ref<IType>, { type: Maybe<IType> }> {
  count: number
  selectedIds: ArraySet<string>
  types: ObjectMap<IType>
  typesList: Array<IType>

  add(type: ITypeDTO): IType
  addInterface(data: ICreateTypeData): IInterfaceType
  getAllWithDescendants(ids: Array<string>): Promise<Array<IType>>
  getBaseTypes(options: BaseTypesOptions): Promise<Array<string>>
  getInterfaceAndDescendants(id: IInterfaceTypeRef): Promise<IInterfaceType>
  loadFields(types: GetTypesQuery['interfaceTypes']): void
  loadTypes(types: GetTypesQuery): Array<IType>
  loadTypesByChunks(types: GetTypesQuery): void
  primitiveKind(id: string): Nullable<IPrimitiveTypeKind>
  setSelectedIds(ids: ArraySet<string>): void
  type(id: string): Maybe<IType>
}
