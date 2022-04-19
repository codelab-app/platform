import { TypeKind } from '@codelab/shared/abstract/codegen'

export { TypeKind as ITypeKind }

interface AssertIsTypeKind {
  <T extends TypeKind>(actual: TypeKind, expected: T): asserts actual is T
}

export const assertIsTypeKind: AssertIsTypeKind = (actual, expected) => {
  if (actual !== expected) {
    throw new Error('TypeKind does not match')
  }
}
