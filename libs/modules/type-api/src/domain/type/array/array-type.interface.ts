import { TypePropertiesUnion, TypeValueProperties } from '../type.interface'

export interface ArrayTypeProperties {
  name: string
  itemType: TypeValueProperties<TypePropertiesUnion>
}
