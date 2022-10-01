import { ITypeKind } from '@codelab/shared/abstract/core'

interface AssertIsTypeKind {
  <T extends ITypeKind>(actual: ITypeKind, expected: T): asserts actual is T
}

export const assertIsTypeKind: AssertIsTypeKind = (actual, expected) => {
  if (actual !== expected) {
    throw new Error('TypeKind does not match')
  }
}
