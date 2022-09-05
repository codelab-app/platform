import { queryRenderedElementById } from '@codelab/frontend/modules/renderer'
import { HoverOverlay } from '@codelab/frontend/view/components'
import { IElement } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { useCreateElementDroppable } from './useCreateElementDroppable'

interface BuilderDropHandlerProps {
  element: IElement
  target: HTMLElement
  order?: number
}

const BuilderDropHandler = observer<BuilderDropHandlerProps>(
  ({ element, target, order }) => {
    const { setNodeRef, isOver, rect, node, over, active } =
      useCreateElementDroppable(element.id, {
        parentElementId: element.id,
      })

    if (isOver) {
      const content = `${element.name} ${
        element.atom ? `(${element.atom?.current?.name})` : ''
      }`

      return (
        <HoverOverlay
          content={content}
          getOverlayElement={queryRenderedElementById}
          nodeId={element.id}
        />
      )
    }

    setNodeRef(target)

    return null
  },
)

interface ElementDropHandlersProps {
  elementsList: Array<IElement>
}

export const ElementDropHandlers = observer<ElementDropHandlersProps>(
  ({ elementsList }) => {
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {elementsList.map((element) => {
          if (!element) {
            return null
          }

          const target = queryRenderedElementById(element?.id)

          if (!target) {
            return null
          }

          return (
            <BuilderDropHandler
              element={element}
              key={element.id}
              target={target}
            />
          )
        })}
      </>
    )
  },
)

ElementDropHandlers.displayName = 'ElementDropHandlers'
