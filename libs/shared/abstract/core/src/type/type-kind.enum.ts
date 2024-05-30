import { TypeKind } from '@codelab/shared/abstract/codegen'
import { type TLiteral, type TLiteralValue, Type } from '@sinclair/typebox'

export { TypeKind as ITypeKind }

interface AssertIsTypeKind {
  <T extends TypeKind>(actual: TypeKind, expected: T): asserts actual is T
}

export const assertIsTypeKind: AssertIsTypeKind = (actual, expected) => {
  if (actual !== expected) {
    throw new Error('TypeKind does not match')
  }
}

const TypeKindSchema = Type.Literal<`${TypeKind}`>(
  `${TypeKind}` as `${TypeKind}`,
)

export const ITypeKindTransform = Type.Transform(TypeKindSchema)
  // string to enum
  .Decode((value) => TypeKind[value])
  // enum to string
  .Encode((value) => value)
