import { DragPosition } from '@codelab/frontend/abstract/core'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import { useEffect, useState } from 'react'

interface Position {
  x: number
  y: number
}

interface Size {
  w: number
  h: number
}

interface ElementLayout {
  size: Nullable<Size>
  relativeMousePosition: Nullable<Position>
}

/**
 * Keeps track of the element's size and the mouse position relative
 * to the top left corner of the bounding box around the element
 * @param refElement
 * @returns
 */
export const useElementLayout = (refElement: Nullable<Element>) => {
  const [relativeX, setRelativeX] = useState<number>()
  const [relativeY, setRelativeY] = useState<number>()

  useEffect(() => {
    if (refElement) {
      const handleMouseMove = (event: MouseEvent) => {
        const { left, top } = refElement.getBoundingClientRect()
        const posX = left + window.pageXOffset
        const posY = top + window.pageYOffset
        setRelativeX(event.pageX - posX)
        setRelativeY(event.pageY - posY)
      }

      document.addEventListener('mousemove', handleMouseMove)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
      }
    }

    return
  }, [refElement])

  return { relativeX, relativeY }
}

export const calcDragPosition = (
  dragYCoordinate: number,
  draggedOnElHeight: number,
): Maybe<DragPosition> => {
  if (Math.abs(dragYCoordinate) < draggedOnElHeight / 3) {
    return DragPosition.Before
  }

  if (Math.abs(dragYCoordinate) > draggedOnElHeight * (2 / 3)) {
    return DragPosition.After
  }

  return DragPosition.Inside
}
