import { Maybe } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDService,
  IEntityModalService,
} from '../../../service'
import {
  ICreateFieldDTO,
  IFieldDTO,
  IUpdateFieldDTO,
} from '../field.dto.interface'
import { IInterfaceType } from '../types'
import { IField } from './field.interface'

export interface IFieldModalMetadata {
  field?: Ref<IField>
  interface?: Ref<IInterfaceType>
}

export interface IFieldModalProperties {
  field: Maybe<IField>
  interface: Maybe<IInterfaceType>
}

export interface IFieldService
  extends ICRUDService<IField, ICreateFieldDTO, IUpdateFieldDTO>,
    ICacheService<IFieldDTO, IField> {
  createModal: IEntityModalService<
    Ref<IInterfaceType>,
    { interface: Maybe<IInterfaceType> }
  >
  updateModal: IEntityModalService<IFieldModalMetadata, IFieldModalProperties>
  deleteModal: IEntityModalService<IFieldModalMetadata, IFieldModalProperties>
}
