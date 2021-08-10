import { DgraphDomain, DgraphInterfaceType } from '@codelab/backend'
import { FieldEntity, FieldProperties } from '../../field'
import { TypeValueProperties } from '../type.interface'
import { TypeValueObject } from '../type.vo'

export interface InterfaceTypeProperties {
  name: string
  fields: Array<FieldProperties>
}

export class InterfaceTypeValueObject
  extends TypeValueObject<InterfaceTypeProperties>
  implements InterfaceTypeProperties, DgraphDomain<DgraphInterfaceType>
{
  fields: Array<FieldProperties>

  name: string

  constructor({ kind, props }: TypeValueProperties<InterfaceTypeProperties>) {
    super({ kind, props })
    this.fields = props.fields.map((field) => FieldEntity.create(field))
    this.name = props.name
  }

  toString() {
    return `interface ${this.name} { ${this.fields
      .map((field) => `${field.key}: ${field.type.toString()}; `)
      .join('')
      .trim()} }`
  }
}
