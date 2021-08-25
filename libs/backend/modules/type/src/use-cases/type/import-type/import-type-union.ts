import { createUnionType } from '@nestjs/graphql'
import { ImportArrayTypeInput } from './import-array-type.input'
import { ImportComponentTypeInput } from './import-component-type.input'
import { ImportElementTypeInput } from './import-element-type.input'
import { ImportEnumTypeInput } from './import-enum-type.input'
import { ImportInterfaceTypeInput } from './import-interface-type.input'
import { ImportLambdaTypeInput } from './import-lambda-type.input'
import { ImportPrimitiveTypeInput } from './import-primitive-type.input'

export const ImportTypeVertex = createUnionType({
  name: 'ImportTypeInput',
  types: () => [
    ImportEnumTypeInput,
    ImportPrimitiveTypeInput,
    ImportArrayTypeInput,
    ImportComponentTypeInput,
    ImportElementTypeInput,
    ImportInterfaceTypeInput,
    ImportLambdaTypeInput,
  ],
})

export type ImportTypeVertex = typeof ImportTypeVertex
