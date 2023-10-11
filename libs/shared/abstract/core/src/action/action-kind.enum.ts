import { ActionKind } from '@codelab/shared/abstract/codegen'

export { ActionKind as IActionKind }

interface AssertIsActionKind {
  <T extends ActionKind>(actual: ActionKind, expected: T): asserts actual is T
}

export const assertIsActionKind: AssertIsActionKind = (actual, expected) => {
  if (actual !== expected) {
    throw new Error('ActionKind does not match')
  }
}
