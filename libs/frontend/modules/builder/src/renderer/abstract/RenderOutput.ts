import { AtomType, PropsData } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { mergeProps } from '@codelab/shared/utils'

/**
 * This is the intermediate output from rendering a single Element
 */
export interface RenderOutput {
  /** This is the id of the element which this RenderOutput was rendered from */
  elementId: string
  atomType?: AtomType
  props?: PropsData
}

// Named factory methods for convenience
export const RenderOutput = {
  empty: (input: Pick<RenderOutput, 'elementId'>): RenderOutput => ({
    ...input,
  }),
  withAtom: (
    input: Pick<RenderOutput, 'atomType' | 'elementId' | 'props'>,
  ): RenderOutput => ({ ...input }),
  overrideProps: (input: RenderOutput, props: Nullish<PropsData>) => {
    return { ...input, props: mergeProps(input.props, props) }
  },
}
