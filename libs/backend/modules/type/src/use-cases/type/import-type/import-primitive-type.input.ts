import {
  IPrimitiveTypeVertexInput,
  PrimitiveKind,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { InputType } from '@nestjs/graphql'
import { ImportTypeInput } from './import-type.input'

@InputType()
export class ImportPrimitiveTypeInput
  extends ImportTypeInput<TypeKind.PrimitiveType>
  implements IPrimitiveTypeVertexInput
{
  declare primitiveKind: PrimitiveKind
}
