import type {
  IFieldDomainService,
  IFieldModel,
} from '@codelab/frontend/abstract/domain'
import type { FieldFragment } from '@codelab/shared/abstract/codegen'
import { IFieldDTO } from '@codelab/shared/abstract/core'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  objectMap,
  prop,
  transaction,
} from 'mobx-keystone'
import { Field } from './models'

@model('@codelab/FieldDomainService')
export class FieldDomainService
  extends Model({
    fields: prop(() => objectMap<IFieldModel>()),
  })
  implements IFieldDomainService
{
  @modelAction
  hydrate(fieldDTO: IFieldDTO) {
    const existingField = this.fields.get(fieldDTO.id)

    if (existingField) {
      return existingField
    }

    const field = Field.create(fieldDTO)

    this.fields.set(field.id, field)

    return field
  }

  // @modelAction
  // load(fields: Array<FieldFragment>) {
  //   const loadedFields = fields.map((fragment) => Field.create(fragment))

  //   for (const field of loadedFields) {
  //     this.fields.set(field.id, field)
  //   }

  //   return loadedFields
  // }

  getField(id: string) {
    return this.fields.get(id)
  }
}
