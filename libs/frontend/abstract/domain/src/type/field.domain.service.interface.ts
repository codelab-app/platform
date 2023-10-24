import type { IFieldDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { IFieldModel } from './field/field.model.interface'
import type { FieldFragment } from './fragments'
import type { ITypeModel } from './types'

export interface IFieldDomainService {
  fields: ObjectMap<IFieldModel>

  getField(id: string): Maybe<IFieldModel<ITypeModel>>
  hydrate(fieldDTO: IFieldDTO): IFieldModel
  // load(fields: Array<FieldFragment>): void
}
