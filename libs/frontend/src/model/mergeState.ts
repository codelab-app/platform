import { mergeDeepWith } from 'immutable'

/**
 *
 * @param stateA
 * @param stateB
 * @param sharedKeys Keys to merge on
 */
export const mergeState = (
  stateA: any = {},
  stateB: any = {},
  sharedKeys: Array<string> = [],
): object => {
  return mergeDeepWith(
    (oldVal: any, newVal: any) => {
      console.log(oldVal, newVal)

      return {}
    },
    stateA,
    stateB,
  )
}
