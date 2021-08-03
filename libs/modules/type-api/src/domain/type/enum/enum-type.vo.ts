import { DgraphDomain, DgraphEnumType } from '@codelab/backend'
import { TypeValueProperties } from '../type.interface'
import { TypeValueObject } from '../type.vo'
import {
  EnumTypeValueProperties,
  EnumTypeValueValueObject,
} from './enum-type-value.vo'

export interface EnumTypeProperties {
  name: string
  allowedValues: Array<EnumTypeValueProperties>
}

export class EnumTypeValueObject
  extends TypeValueObject<EnumTypeProperties>
  implements EnumTypeProperties, DgraphDomain<DgraphEnumType>
{
  name: string

  allowedValues: Array<EnumTypeValueProperties>

  constructor({ kind, props }: TypeValueProperties<EnumTypeProperties>) {
    super({ kind, props })
    this.name = props.name
    this.allowedValues = props.allowedValues.map((allowedValue) =>
      EnumTypeValueValueObject.create(allowedValue),
    )
  }

  toString() {
    return `${this.allowedValues
      .map(({ name, stringValue }) => `'${stringValue}'`)
      .join(' | ')
      .trim()}`

    // return `enum ${this.name} { ${this.allowedValues
    //   .map(({ name, stringValue }) => `${name}='${stringValue}'`)
    //   .join(', ')} }`
  }
}
