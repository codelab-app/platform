import type { Maybe } from '@codelab/shared/abstract/types'
import type { Ref } from 'mobx-keystone'
import type {
  ICacheService,
  ICRUDModalService,
  ICRUDService,
  IEntityModalService,
} from '../../../service'
import type {
  ICreateFieldDTO,
  IFieldDTO,
  IUpdateFieldDTO,
} from '../field.dto.interface'
import type { FieldFragment } from '../fragments'
import type { IAnyType, IInterfaceType } from '../types'
import type { IField } from './field.interface'

export interface IFieldService
  extends ICRUDService<IField, ICreateFieldDTO, IUpdateFieldDTO>,
    Omit<
      ICRUDModalService<Ref<IField>, { field: Maybe<IField> }>,
      'createModal'
    >,
    ICacheService<IFieldDTO, IField> {
  createModal: IEntityModalService<
    Ref<IInterfaceType>,
    { interface: Maybe<IInterfaceType> }
  >
  getField(id: string): Maybe<IField<IAnyType>>
  load(fields: Array<FieldFragment>): void
}
