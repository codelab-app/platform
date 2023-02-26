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
import type { ICreateTypeDTO, IUpdateTypeDTO } from './type.dto.interface'
import type { IAnyType, IInterfaceType, IInterfaceTypeRef } from './types'

export interface BaseTypesOptions {
  offset?: number
  limit?: number
  where?: {
    name: string
  }
}

export interface ITypeService
  extends ICRUDService<IAnyType, ICreateTypeDTO, IUpdateTypeDTO>,
    IQueryService<IAnyType, BaseTypeWhere, BaseTypeOptions>,
    ICRUDModalService<Ref<IAnyType>, { type: Maybe<IAnyType> }> {
  getBaseTypes(options: BaseTypesOptions): Promise<Array<string>>
  getInterfaceAndDescendants(id: IInterfaceTypeRef): Promise<IInterfaceType>
  types: ObjectMap<IAnyType>
  type(id: string): Maybe<IAnyType>
  primitiveKind(id: string): Nullable<IPrimitiveTypeKind>
  typesList: Array<IAnyType>
  selectedIds: ArraySet<string>
  setSelectedIds(ids: ArraySet<string>): void
  getAllWithDescendants(ids: Array<string>): Promise<Array<IAnyType>>
  loadTypes(types: GetTypesQuery): Array<IAnyType>
  loadFields(types: GetTypesQuery['interfaceTypes']): void
  loadTypesByChunks(types: GetTypesQuery): void
  count: number
  // add(data: ICreateTypeDTO): IAnyType
  // create(data: ICreateTypeDTO): IAnyType
  addInterface(data: ICreateTypeDTO): IInterfaceType
}
