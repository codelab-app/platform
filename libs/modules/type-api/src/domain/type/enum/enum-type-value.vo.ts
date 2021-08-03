import { DgraphDomain, DgraphEnumTypeValue } from '@codelab/backend'
import { ValueObject } from '@codelab/ddd/core'

export interface EnumTypeValueProperties {
  name?: string
  stringValue: string
}

export class EnumTypeValueValueObject
  extends ValueObject<EnumTypeValueValueObject>
  implements EnumTypeValueProperties, DgraphDomain<DgraphEnumTypeValue>
{
  name?: string

  stringValue: string

  private constructor({ name, stringValue }: EnumTypeValueProperties) {
    super()
    this.name = name
    this.stringValue = stringValue
  }

  static create(props: EnumTypeValueProperties) {
    return new EnumTypeValueValueObject(props)
  }
}
