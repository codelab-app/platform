import {
  ElementTypeKind,
  IElementTypeVertexInput,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { InputType } from '@nestjs/graphql'
import { ImportTypeInput } from './import-type.input'

@InputType()
export class ImportElementTypeInput
  extends ImportTypeInput<TypeKind.ElementType>
  implements IElementTypeVertexInput
{
  declare kind: ElementTypeKind
}
