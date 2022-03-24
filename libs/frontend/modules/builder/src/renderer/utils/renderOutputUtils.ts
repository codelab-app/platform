import { ArrayOrSingle } from 'ts-essentials'
import { RenderOutput } from '../abstract/RenderOutput'

/**
 * Utility function for looping over one or more RenderOutputs
 */
export const mapOutput = <T>(
  output: ArrayOrSingle<RenderOutput>,
  mapper: (output: RenderOutput) => T,
): Array<T> | T => {
  if (Array.isArray(output)) {
    return output.map(mapper)
  }

  return mapper(output)
}
