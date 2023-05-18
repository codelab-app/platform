/**
Given rect width
| x% = add as descendant |  y% = add as children                                     |
Check for interected rect 
 */

export const calcDropPosition = (
  collisionRect: ClientRect,
  droppableRect: ClientRect,
) => {
  const left = droppableRect.left
  const width = droppableRect.width
  const leftDragOverlayRect = collisionRect.left
  // 30%
  const addAsDescendantWidth = width * 0.2

  const xRangeAddAsDescendant = {
    max: left + addAsDescendantWidth,
  }

  const shouldAddAsDescendants = leftDragOverlayRect > xRangeAddAsDescendant.max

  return shouldAddAsDescendants ? 1 : 0
}
