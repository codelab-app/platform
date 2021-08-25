import { TypeKind } from '@codelab/shared/abstract/core'
import { InputType } from '@nestjs/graphql'
import { ImportTypeInput } from './import-type.input'

@InputType()
export class ImportArrayTypeInput extends ImportTypeInput<TypeKind.ArrayType> {}
