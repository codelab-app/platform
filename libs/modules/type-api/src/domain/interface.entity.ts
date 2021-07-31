import { AggregateRoot } from '@codelab/ddd/core'
import { AggregateRootProperties } from '@codelab/ddd/types'
import { FieldEntity } from './field.entity'

export interface InterfaceProperties extends AggregateRootProperties {
  name: string
  fields: Array<FieldEntity>
}

export class InterfaceEntity
  extends AggregateRoot
  implements InterfaceProperties
{
  declare name: string

  declare fields: Array<FieldEntity>

  constructor({ id, name, fields }: InterfaceProperties) {
    super(id)
    this.name = name
    this.fields = fields
  }
}
