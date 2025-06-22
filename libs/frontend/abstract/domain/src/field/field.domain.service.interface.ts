import type { IFieldDto } from '@codelab/shared-abstract-core'
import type { Maybe } from '@codelab/shared-abstract-types'
import type { ObjectMap } from 'mobx-keystone'

import type { IHydrateable } from '../shared'
import type { ITypeModel } from '../type'
import type { IFieldModel } from './field.model.interface'

export interface IFieldDomainService
  extends IHydrateable<IFieldDto, IFieldModel> {
  fields: ObjectMap<IFieldModel>

  getField(id: string): Maybe<IFieldModel<ITypeModel>>
  // load(fields: Array<FieldFragment>): void
}
