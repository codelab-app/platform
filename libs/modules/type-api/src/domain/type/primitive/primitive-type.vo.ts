import {
  DgraphDomain,
  DgraphPrimitiveType,
  PrimitiveKind,
} from '@codelab/backend'
import { TypeValueProperties } from '../type.interface'
import { TypeValueObject } from '../type.vo'

export interface PrimitiveTypeProperties {
  name: string
  primitiveKind: `${PrimitiveKind}`
}

export class PrimitiveTypeValueObject
  extends TypeValueObject<PrimitiveTypeProperties>
  implements PrimitiveTypeProperties, DgraphDomain<DgraphPrimitiveType>
{
  name: string

  primitiveKind: `${PrimitiveKind}`

  constructor({ kind, props }: TypeValueProperties<PrimitiveTypeProperties>) {
    super({ kind, props })
    this.primitiveKind = props.primitiveKind
    this.name = props.name
  }

  // static create<P extends PrimitiveTypeProperties>(
  //   data: TypeValueProperties<P>,
  // ) {
  //   return new PrimitiveTypeValueObject(data)
  // }

  toString() {
    return `${this.name}`
  }
}
