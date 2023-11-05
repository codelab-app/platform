import type { IFieldDTO } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { ObjectMap } from 'mobx-keystone'
import type { IHydrateable } from '../shared'
import type { IFieldModel } from './field/field.model.interface'
import type { ITypeModel } from './types'

export interface IFieldDomainService
  extends IHydrateable<IFieldDTO, IFieldModel> {
  fields: ObjectMap<IFieldModel>

  getField(id: string): Maybe<IFieldModel<ITypeModel>>
  // load(fields: Array<FieldFragment>): void
}
