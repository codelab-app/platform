import type { Rectangle } from '@codelab/frontend/abstract/types'

/**
 * Calculate the bounding rect of a set of elements.
 * It will return a single bounding rect that
 * encompasses all the elements.
 * @param elements
 * @returns
 */
export const calculateEncapsulatingRect = (
  elements: Array<HTMLElement>,
): Rectangle => {
  return elements
    .map((el) => el.getBoundingClientRect())
    .reduce<Rectangle>(
      (acc, val) => {
        return {
          bottom: Math.max(acc.bottom, val.bottom),
          height: acc.bottom - acc.top,
          left: Math.min(acc.left, val.left),
          right: Math.max(acc.right, val.right),
          top: Math.min(acc.top, val.top),
          width: acc.right - acc.left,
          x: Math.min(acc.left, val.left),
          y: Math.min(acc.top, val.top),
        }
      },
      {
        bottom: -Infinity,
        height: 0,
        left: Infinity,
        right: -Infinity,
        top: Infinity,
        width: 0,
        x: 0,
        y: 0,
      },
    )
}
