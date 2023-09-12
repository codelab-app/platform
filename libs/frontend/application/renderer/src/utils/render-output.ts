import type { IRenderOutput } from '@codelab/frontend/abstract/domain'
import { mergeProps } from '@codelab/frontend/domain/prop'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Nullish } from '@codelab/shared/abstract/types'

// Named factory methods for convenience
export const RenderOutput = {
  empty: (input: Pick<IRenderOutput, 'element' | 'props'>): IRenderOutput =>
    input,
  notRenderable: (
    input: Pick<IRenderOutput, 'element' | 'props'>,
  ): IRenderOutput => ({ ...input, shouldRender: false }),
  overrideProps: (input: IRenderOutput, props: Nullish<IPropData>) => {
    return { ...input, props: mergeProps(input.props, props) }
  },
  withAtom: (
    input: Pick<IRenderOutput, 'atomType' | 'element' | 'props'>,
  ): IRenderOutput => {
    return input
  },
}
