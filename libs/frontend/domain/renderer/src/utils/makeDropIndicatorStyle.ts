import { DragPosition } from '@codelab/frontend/abstract/core'

type Style = Record<string, string | number>

/**
 * creates a style object that can be used to add styling to the droppable element
 * @param dragPosition position where the dragged element will be dropped
 * @param customStyles custom styles to be shared on all positions
 * @returns object containing css styling values
 */
export const makeDropIndicatorStyle = (
  dragPosition: DragPosition,
  customStyles?: Style,
) => {
  const indicatorStyle: Style = { ...customStyles }

  switch (dragPosition) {
    case DragPosition.After:
      indicatorStyle['boxShadow'] = '0px -2px 0px cyan inset, 0px 2px 0px cyan'
      break
    case DragPosition.Before:
      indicatorStyle['boxShadow'] = '0px 2px 0px cyan inset, 0px -2px 0px cyan'
      break
    case DragPosition.Inside:
      indicatorStyle['boxShadow'] =
        '0px 0px 0px 2px cyan inset, 0px 0px 0px 2px cyan'
      break
    default:
      break
  }

  return indicatorStyle
}
