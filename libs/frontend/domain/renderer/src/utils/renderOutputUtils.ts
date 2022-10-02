import { IRenderOutput } from '@codelab/frontend/abstract/core'
import { ArrayOrSingle } from 'ts-essentials'

/**
 * Utility function for looping over one or more RenderOutputs
 */
export const mapOutput = <T>(
  output: ArrayOrSingle<IRenderOutput>,
  mapper: (output: IRenderOutput) => T,
): Array<T> | T => {
  if (Array.isArray(output)) {
    return output.map(mapper)
  }

  return mapper(output)
}
