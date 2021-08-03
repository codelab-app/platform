import { DgraphArrayType, DgraphDomain } from '@codelab/backend'
import { TypePropertiesUnion, TypeValueProperties } from '../type.interface'
import { TypeValueObject } from '../type.vo'
import { ArrayTypeProperties } from './array-type.interface'

export class ArrayTypeValueObject
  extends TypeValueObject<ArrayTypeProperties>
  implements ArrayTypeProperties, DgraphDomain<DgraphArrayType>
{
  name: string

  itemType: TypeValueProperties<TypePropertiesUnion>

  constructor({ kind, props }: TypeValueProperties<ArrayTypeProperties>) {
    super({ kind, props })
    this.itemType = props.itemType
    this.name = props.name
  }
}
