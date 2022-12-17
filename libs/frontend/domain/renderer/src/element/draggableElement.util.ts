import { DragPosition } from '@codelab/frontend/abstract/core'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { RefObject } from 'react'
import { useEffect, useRef } from 'react'

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
export const useElementLayout = (refElement: RefObject<Element>) => {
  const refLayout = useRef<ElementLayout>({
    size: null,
    relativeMousePosition: null,
  })

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (refElement.current) {
        const {
          left,
          top,
          width: w,
          height: h,
        } = refElement.current.getBoundingClientRect()

        const posX = left + window.pageXOffset
        const posY = top + window.pageYOffset

        refLayout.current.relativeMousePosition = {
          x: event.pageX - posX,
          y: event.pageY - posY,
        }

        refLayout.current.size = { w, h }
      }
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [refLayout, refElement])

  return refLayout
}

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
