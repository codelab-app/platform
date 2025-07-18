import type { IRenderOutput } from '@codelab/frontend-abstract-application'
import type { IPropData } from '@codelab/shared-abstract-core'
import type { Nullish } from '@codelab/shared-abstract-types'

import { mergeProps } from '@codelab/frontend-domain-prop/utils'

// Named factory methods for convenience
export const RenderOutput = {
  empty: (
    input: Pick<IRenderOutput, 'props' | 'runtimeElement'>,
  ): IRenderOutput => input,
  overrideProps: (input: IRenderOutput, props: Nullish<IPropData>) => {
    return { ...input, props: mergeProps(input.props, props ?? {}) }
  },
  withAtom: (
    input: Pick<IRenderOutput, 'atomType' | 'props' | 'runtimeElement'>,
  ): IRenderOutput => {
    return input
  },
}
