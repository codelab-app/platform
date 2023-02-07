import type { IPropData, IRenderOutput } from '@codelab/frontend/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'

// Named factory methods for convenience
export const RenderOutput = {
  empty: (input: Pick<IRenderOutput, 'elementId' | 'props'>): IRenderOutput =>
    input,
  withAtom: (
    input: Pick<IRenderOutput, 'atomType' | 'elementId' | 'props'>,
  ): IRenderOutput => input,
  overrideProps: (input: IRenderOutput, props: Nullish<IPropData>) => {
    return { ...input, props: mergeProps(input.props, props) }
  },
}
