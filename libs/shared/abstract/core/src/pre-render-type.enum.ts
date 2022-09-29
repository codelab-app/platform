import { PreRenderType } from '@codelab/shared/abstract/codegen'

export { PreRenderType as IPreRenderType }

interface AssertIsPreRenderType {
  <T extends PreRenderType>(
    actual: PreRenderType,
    expected: T,
  ): asserts actual is T
}

export const AssertIsPreRenderType: AssertIsPreRenderType = (
  actual,
  expected,
) => {
  if (actual !== expected) {
    throw new Error('PreRenderType does not match')
  }
}
