import { ValueObject } from '@codelab/ddd/core'
import { TypeKind } from '@codelab/ddd/types'
import { TypePropertiesUnion, TypeValueProperties } from './type.interface'

export class TypeValueObject<P extends TypePropertiesUnion>
  extends ValueObject<P>
  implements TypeValueProperties<P>
{
  kind: `${TypeKind}`

  props: P

  protected constructor({ props, kind }: TypeValueProperties<P>) {
    super()
    this.props = props
    this.kind = kind
  }
}
