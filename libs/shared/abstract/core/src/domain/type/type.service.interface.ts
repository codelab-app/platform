import { GetTypesQuery, TypeBaseWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ArraySet, ObjectMap, Ref } from 'mobx-keystone'
import {
  ICRUDModalService,
  ICRUDService,
  IModalService,
  IQueryService,
} from '../../service'
import { IField, IFieldRef } from './field'
import { ICreateFieldDTO, IUpdateFieldDTO } from './field.dto.interface'
import { ICreateTypeDTO, IUpdateTypeDTO } from './type.dto.interface'
import { IAnyType, IInterfaceType, IInterfaceTypeRef } from './types'

export interface IFieldModalMetadata {
  field: Ref<IField>
  interface: Ref<IInterfaceType>
}

export interface IFieldModalProperties {
  field: Maybe<IField>
  interface: Maybe<IInterfaceType>
}

export interface ITypeService
  extends ICRUDService<IAnyType, ICreateTypeDTO, IUpdateTypeDTO>,
    IQueryService<IAnyType, TypeBaseWhere>,
    ICRUDModalService<Ref<IAnyType>, { type: Maybe<IAnyType> }> {
  getInterfaceAndDescendants(id: IInterfaceTypeRef): Promise<IInterfaceType>
  types: ObjectMap<IAnyType>
  type(id: string): Maybe<IAnyType>
  typesList: Array<IAnyType>
  fieldCreateModal: IModalService<
    Ref<IInterfaceType>,
    { interface: Maybe<IInterfaceType> }
  >
  defaultValueModal: IModalService<
    Ref<IInterfaceType>,
    { interface: Maybe<IInterfaceType> }
  >
  fieldUpdateModal: IModalService<IFieldModalMetadata, IFieldModalProperties>
  fieldDeleteModal: IModalService<IFieldModalMetadata, IFieldModalProperties>
  addField(
    interfaceTypeId: IInterfaceTypeRef,
    data: ICreateFieldDTO,
  ): Promise<IInterfaceType>
  deleteField(
    interfaceTypeId: IInterfaceTypeRef,
    field: IFieldRef,
  ): Promise<Maybe<IField>>
  updateField(
    interfaceTypeId: IInterfaceTypeRef,
    targetKey: IInterfaceTypeRef,
    data: IUpdateFieldDTO,
  ): Promise<IField>
  selectedIds: ArraySet<string>
  setSelectedIds(ids: ArraySet<string>): void
  getAllWithDescendants(ids: Array<string>): Promise<Array<IAnyType>>
  load(types: GetTypesQuery): Array<IAnyType>
}
