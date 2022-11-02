import {
  BaseTypeOptions,
  BaseTypeWhere,
  GetTypesQuery,
} from '@codelab/shared/abstract/codegen'
import { IPrimitiveTypeKind } from '@codelab/shared/abstract/core'
import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { ArraySet, ObjectMap, Ref } from 'mobx-keystone'
import {
  ICRUDModalService,
  ICRUDService,
  IPaginationService,
  IQueryService,
} from '../../service'
import { ICreateTypeDTO, IUpdateTypeDTO } from './type.dto.interface'
import { IAnyType, IInterfaceType, IInterfaceTypeRef } from './types'

export interface ITypeService
  extends Omit<IPaginationService<IAnyType>, 'getByPage'>,
    ICRUDService<IAnyType, ICreateTypeDTO, IUpdateTypeDTO>,
    IQueryService<IAnyType, BaseTypeWhere, BaseTypeOptions>,
    ICRUDModalService<Ref<IAnyType>, { type: Maybe<IAnyType> }> {
  getBaseTypesOfPage(page: number, pageSize: number): Promise<void>
  getInterfaceAndDescendants(id: IInterfaceTypeRef): Promise<IInterfaceType>
  types: ObjectMap<IAnyType>
  type(id: string): Maybe<IAnyType>
  primitiveKind(id: string): Nullable<IPrimitiveTypeKind>
  typesList: Array<IAnyType>
  selectedIds: ArraySet<string>
  setSelectedIds(ids: ArraySet<string>): void
  getAllWithDescendants(ids: Array<string>): Promise<Array<IAnyType>>
  load(types: GetTypesQuery): Array<IAnyType>
}
