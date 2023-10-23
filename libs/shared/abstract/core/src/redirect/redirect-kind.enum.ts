import { RedirectKind } from '@codelab/shared/abstract/codegen'

export { RedirectKind as IRedirectKind }

interface AssertIsRedirectKind {
  <T extends RedirectKind>(
    actual: RedirectKind,
    expected: T,
  ): asserts actual is T
}

export const assertIsRedirectKind: AssertIsRedirectKind = (
  actual,
  expected,
) => {
  if (actual !== expected) {
    throw new Error('RedirectKind does not match')
  }
}
