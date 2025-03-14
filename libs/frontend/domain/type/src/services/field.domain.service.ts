import type { IFieldDto } from '@codelab/shared/abstract/core'

import {
  getTypeDomainService,
  type IFieldDomainService,
  type IFieldModel,
  type IInterfaceTypeModel,
} from '@codelab/frontend/abstract/domain'
import { computed } from 'mobx'
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone'

import { Field } from '../store'

@model('@codelab/FieldDomainService')
export class FieldDomainService
  extends Model({
    fields: prop(() => objectMap<IFieldModel>()),
  })
  implements IFieldDomainService
{
  getField(id: string) {
    return this.fields.get(id)
  }

  /**
   * Field api type must be hydrated before field is hydrated
   */
  @modelAction
  hydrate(fieldDto: IFieldDto) {
    const existingField = this.fields.get(fieldDto.id)

    if (existingField) {
      return existingField
    }

    const field = Field.create(fieldDto)

    this.fields.set(field.id, field)

    // Need to add field to interfaceTypeModel as well
    const interfaceTypeModel = this.typeDomainService.type<IInterfaceTypeModel>(
      fieldDto.api.id,
    )

    interfaceTypeModel.writeFieldCache([field])

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

  @computed
  private get typeDomainService() {
    return getTypeDomainService(this)
  }
}
