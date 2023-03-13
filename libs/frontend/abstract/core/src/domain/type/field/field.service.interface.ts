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
  fields: ObjectMap<IField>
  createModal: IEntityModalService<
    Ref<IInterfaceType>,
    { interface: Maybe<IInterfaceType> }
  >
  delete(ids: Array<string>): Promise<number>
  getField(id: string): Maybe<IField<IAnyType>>
  load(fields: Array<FieldFragment>): void
  add(fieldDTO: IFieldDTO): IField
}
