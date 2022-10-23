import { Maybe } from '@codelab/shared/abstract/types'
import { Ref } from 'mobx-keystone'
import {
  ICacheService,
  ICRUDModalService,
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
}
