import { isValidElement, type ReactElement } from 'react'

/**
 * These are the segmentPaths that we use to hide our secondary popovers
 */
const hiddenSecondaryPopoverPaths = [
  'children/(protected)/children/atoms/secondaryPopover',
]

/**
 * For parallel slots we need to use default.tsx, but can't assign null, so the only way is to check if we have a fragment with no children
 */
export const isHiddenSlot = (
  node?: ReactElement<{ segmentPath: Array<string> }>,
) => {
  if (isValidElement(node)) {
    const secondaryPopoverProps = node.props
    const segmentPath = secondaryPopoverProps['segmentPath'].join('/')

    console.log(segmentPath)

    return hiddenSecondaryPopoverPaths.includes(segmentPath)
  }

  return false
}
