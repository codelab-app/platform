import {
  IEnumTypeValueInput,
  IEnumTypeVertexInput,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { InputType } from '@nestjs/graphql'
import { ImportTypeInput } from './import-type.input'

@InputType()
export class ImportEnumTypeInput
  extends ImportTypeInput<TypeKind.EnumType>
  implements IEnumTypeVertexInput
{
  declare allowedValues: Array<IEnumTypeValueInput>

  declare id: string

  constructor() {
    super(TypeKind.EnumType)
  }
}
