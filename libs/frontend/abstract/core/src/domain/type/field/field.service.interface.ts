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
    > {
  createModal: IEntityModalService<
    Ref<IInterfaceType>,
    { interface: Maybe<IInterfaceType> }
  >
  fields: ObjectMap<IField>

  add(fieldDTO: IFieldDTO): IField
  delete(fields: Array<IField>): Promise<number>
  getField(id: string): Maybe<IField<IType>>
  load(fields: Array<FieldFragment>): void
}
