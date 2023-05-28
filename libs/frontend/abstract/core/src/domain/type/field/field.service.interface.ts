import type { IFieldDTO } from '@codelab/shared/abstract/core'
import type { IEntity, Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDFormService,
  ICRUDModalService,
  ICRUDService,
  IEntityFormService,
  IEntityModalService,
} from '../../../service'
import type {
  ICreateFieldData,
  IUpdateFieldData,
} from '../field.data.interface'
import type { FieldFragment } from '../fragments'
import type { IInterfaceType, IType } from '../types'
import type { IField } from './field.interface'

export interface IFieldService
  extends Omit<
      ICRUDService<IField, ICreateFieldData, IUpdateFieldData>,
      'delete'
    >,
    Omit<
      ICRUDModalService<Ref<IField>, { field: Maybe<IField> }>,
      'createModal'
    >,
    Omit<
      ICRUDFormService<Ref<IField>, { field: Maybe<IField> }>,
      'createForm'
    > {
  createForm: IEntityFormService<
    Ref<IInterfaceType>,
    { interface: Maybe<IInterfaceType> }
  >
  createModal: IEntityModalService<
    Ref<IInterfaceType>,
    { interface: Maybe<IInterfaceType> }
  >
  fields: ObjectMap<IField>
  add(fieldDTO: IFieldDTO): IField
  delete(fields: Array<IField>): Promise<number>
  getField(id: string): Maybe<IField<IType>>
  load(fields: Array<FieldFragment>): void
  moveFieldAsNextSibling(props: {
    field: IEntity
    targetField: IEntity
  }): Promise<void>
  moveFieldAsPrevSibling(props: {
    field: IEntity
    targetField: IEntity
  }): Promise<void>
}
