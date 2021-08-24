import {
  IInterfaceTypeVertexInput,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { InputType } from '@nestjs/graphql'
import { ImportTypeInput } from './import-type.input'

@InputType()
export class ImportInterfaceTypeInput
  extends ImportTypeInput<TypeKind.InterfaceType>
  implements IInterfaceTypeVertexInput {}
