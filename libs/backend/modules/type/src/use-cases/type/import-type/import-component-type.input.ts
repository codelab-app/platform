import {
  IComponentTypeVertexInput,
  TypeKind,
} from '@codelab/shared/abstract/core'
import { InputType } from '@nestjs/graphql'
import { ImportTypeInput } from './import-type.input'

@InputType()
export class ImportComponentTypeInput
  extends ImportTypeInput<TypeKind.ComponentType>
  implements IComponentTypeVertexInput {}
