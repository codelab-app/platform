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
import type { IAnyType, IInterfaceType, IInterfaceTypeRef } from './types'

export interface BaseTypesOptions {
  offset?: number
  limit?: number
  where?: {
    name: string
  }
}

export interface ITypeService
  extends ICRUDService<IAnyType, ICreateTypeData, IUpdateTypeData>,
    IQueryService<IAnyType, BaseTypeWhere, BaseTypeOptions>,
    ICRUDModalService<Ref<IAnyType>, { type: Maybe<IAnyType> }> {
  types: ObjectMap<IAnyType>
  typesList: Array<IAnyType>
  selectedIds: ArraySet<string>
  count: number

  getBaseTypes(options: BaseTypesOptions): Promise<Array<string>>
  getInterfaceAndDescendants(id: IInterfaceTypeRef): Promise<IInterfaceType>
  type(id: string): Maybe<IAnyType>
  primitiveKind(id: string): Nullable<IPrimitiveTypeKind>
  setSelectedIds(ids: ArraySet<string>): void
  getAllWithDescendants(ids: Array<string>): Promise<Array<IAnyType>>
  loadTypes(types: GetTypesQuery): Array<IAnyType>
  loadFields(types: GetTypesQuery['interfaceTypes']): void
  loadTypesByChunks(types: GetTypesQuery): void
  // add(data: ICreateTypeDTO): IAnyType
  // create(data: ICreateTypeDTO): IAnyType
  addInterface(data: ICreateTypeData): IInterfaceType
  add(type: ITypeDTO): IAnyType
}
