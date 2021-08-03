import { DgraphDomain, DgraphField } from '@codelab/backend'
import { TypeFactory } from '../type/type.factory'
import {
  TypePropertiesUnion,
  TypeValueProperties,
} from '../type/type.interface'

export interface FieldProperties {
  name?: string
  key: string
  type: TypeValueProperties<TypePropertiesUnion>
}

export class FieldEntity implements FieldProperties, DgraphDomain<DgraphField> {
  type: TypeValueProperties<TypePropertiesUnion>

  key: string

  name?: string

  private constructor({ key, name, type }: FieldProperties) {
    this.key = key
    this.name = name
    this.type = TypeFactory.create(type)
  }

  static create(props: FieldProperties) {
    return new FieldEntity(props)
  }
}
