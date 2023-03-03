import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap, Ref } from 'mobx-keystone'
import type {
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
} from '../../../service'
import type {
  ICreateFieldData,
  IFieldDTO,
  IUpdateFieldData,
} from '../field.dto.interface'
import type { FieldFragment } from '../fragments'
import type { IAnyType, IInterfaceType } from '../types'
import type { IField } from './field.interface'

export interface IFieldService
  extends Omit<
      ICRUDService<IField, ICreateFieldData, IUpdateFieldData>,
      'delete'
    >,
    Omit<
      ICRUDModalService<Ref<IField>, { field: Maybe<IField> }>,
      'createModal'
    > {
  delete(ids: Array<string>): Promise<number>
  createModal: IEntityModalService<
    Ref<IInterfaceType>,
    { interface: Maybe<IInterfaceType> }
  >
  getField(id: string): Maybe<IField<IAnyType>>
  load(fields: Array<FieldFragment>): void
  fields: ObjectMap<IField>
  add(fieldDTO: IFieldDTO): IField
}
