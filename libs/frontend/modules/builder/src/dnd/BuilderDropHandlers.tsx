import { IElement } from '@codelab/shared/abstract/core'
import { ElementTree } from '@codelab/shared/core'
import React from 'react'
import { querySelectorRenderedElement } from '../renderer'
import { HoverOverlay } from '../sections'
import { useCreateElementDroppable } from './useCreateElementDroppable'

export interface BuilderDropHandlersProps {
  tree: ElementTree
}

const BuilderDropHandler = React.memo(
  ({
    element,
    target,
    order,
  }: {
    element: IElement
    target: HTMLElement
    order?: number
  }) => {
    const { setNodeRef, isOver, rect, node, over, active } =
      useCreateElementDroppable(element.id, {
        order,
        parentElementId: element.id,
      })

    if (isOver) {
      const content = `${element.name} ${
        element.atom ? `(${element.atom.name})` : ''
      }`

      return <HoverOverlay nodeId={element.id} content={content} />
    }

    setNodeRef(target)

    return null
  },
)

export const BuilderDropHandlers = React.memo(
  ({ tree }: BuilderDropHandlersProps) => {
    return (
      <>
        {tree.getAllVertices(ElementTree.isElement).map((e) => {
          const target = querySelectorRenderedElement(e.id)

          if (!target) {
            return null
          }

          return <BuilderDropHandler element={e} key={e.id} target={target} />
        })}
      </>
    )
  },
)

BuilderDropHandlers.displayName = 'BuilderDropHandlers'
