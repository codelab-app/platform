import type {
  IFieldDomainService,
  IFieldModel,
} from '@codelab/frontend/abstract/domain'
import { IFieldDto } from '@codelab/shared/abstract/core'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'
import { Field } from '../store'

@model('@codelab/FieldDomainService')
export class FieldDomainService
  extends Model({
    fields: prop(() => objectMap<IFieldModel>()),
  })
  implements IFieldDomainService
{
  @modelAction
  hydrate(fieldDto: IFieldDto) {
    const existingField = this.fields.get(fieldDto.id)

    if (existingField) {
      return existingField
    }

    const field = Field.create(fieldDto)

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
