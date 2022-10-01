import { DragPosition } from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'

export const calcDragPosition = (
  isOver: boolean,
  dragYCoordinate: number,
  draggedOnElHeight: number,
): Maybe<DragPosition> => {
  if (!isOver) {
    return undefined
  }

  if (dragYCoordinate < draggedOnElHeight / 2) {
    return DragPosition.Before
  }

  return DragPosition.After
}
