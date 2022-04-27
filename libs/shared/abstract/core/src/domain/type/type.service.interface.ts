import { TypeBaseWhere } from '@codelab/shared/abstract/codegen'
import { Maybe } from '@codelab/shared/abstract/types'
import { ArraySet, Ref } from 'mobx-keystone'
import {
  ICRUDModalService,
  ICRUDService,
  IModalService,
  IQueryService,
} from '../../service'
import { IAuth0ID } from '../user'
import { IField, IFieldRef } from './field'
import { ICreateFieldDTO, IUpdateFieldDTO } from './field.dto.interface'
import { ICreateTypeDTO, IUpdateTypeDTO } from './type.dto.interface'
import { IAnyType, IInterfaceType, IInterfaceTypeRef, ITypeRef } from './types'

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
  type(id: string): Maybe<IAnyType>
  typesList: Array<IAnyType>
  fieldCreateModal: IModalService<
    Ref<IInterfaceType>,
    { interface: Maybe<IInterfaceType> }
  >
  fieldUpdateModal: IModalService<IFieldModalMetadata, IFieldModalProperties>
  fieldDeleteModal: IModalService<IFieldModalMetadata, IFieldModalProperties>
  addField(
    interfaceType: IInterfaceType,
    data: ICreateFieldDTO,
  ): Promise<IInterfaceType>
  deleteField(
    interfaceType: IInterfaceType,
    field: IFieldRef,
  ): Promise<Maybe<IField>>
  updateField(
    type: IInterfaceType,
    targetKey: IInterfaceTypeRef,
    data: IUpdateFieldDTO,
  ): Promise<IField>
  selectedIds: ArraySet<string>
  setSelectedIds(ids: ArraySet<string>): void
}

export interface IImportTypeService {
  importTypes(
    payloadString: string,
    currentUserAuth0Id: IAuth0ID,
  ): Promise<void>
  exportTypes(ids: Array<ITypeRef>): Promise<string>
}
