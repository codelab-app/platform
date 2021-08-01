import { ValueObject } from '@codelab/ddd/core'

enum PrimitiveKind {
  String,
  Integer,
  Float,
  Boolean,
}
export interface PrimitiveTypeProperties {
  name: string
  kind: PrimitiveKind
}

export class PrimitiveTypeValueObject
  extends ValueObject<PrimitiveTypeValueObject>
  implements PrimitiveTypeProperties
{
  name: string

  kind: PrimitiveKind

  constructor({ name, kind }: PrimitiveTypeProperties) {
    super()
    this.name = name
    this.kind = kind
  }
}
