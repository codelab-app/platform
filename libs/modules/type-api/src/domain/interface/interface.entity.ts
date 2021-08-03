import { DgraphDomain, DgraphInterfaceType } from '@codelab/backend'
import { AggregateRootProperties } from '@codelab/ddd/types'
import { FieldEntity } from '../field/field.entity'

export interface InterfaceProperties extends AggregateRootProperties {
  name: string
  fields: Array<FieldEntity>
}

export class InterfaceEntity
  implements InterfaceProperties, DgraphDomain<DgraphInterfaceType>
{
  declare id: string

  declare name: string

  fields: Array<FieldEntity> = []

  private constructor({ name, fields = [] }: InterfaceProperties) {
    this.name = name
    this.fields = fields
  }

  static create(props: InterfaceProperties) {
    return new InterfaceEntity(props)
  }

  addField(field: FieldEntity) {
    this.fields = [...this.fields, field]
  }
}
