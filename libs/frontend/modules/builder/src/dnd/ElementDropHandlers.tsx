import { Element } from '@codelab/frontend/modules/element'
import { HoverOverlay } from '@codelab/frontend/view/components'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { queryRenderedElementById } from '../renderer/utils/queryRenderedElementById'
import { WithBuilderService } from '../store/BuilderService'
import { useCreateElementDroppable } from './useCreateElementDroppable'

export type BuilderDropHandlersProps = WithBuilderService

const BuilderDropHandler = observer(
  ({
    element,
    target,
    order,
  }: {
    element: Element
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

export const ElementDropHandlers = observer(
  ({ builderService }: BuilderDropHandlersProps) => {
    return (
      <>
        {builderService.builderRenderer.tree?.elementsList.map((e) => {
          const target = queryRenderedElementById(e.id)

          if (!target) {
            return null
          }

          return <BuilderDropHandler element={e} key={e.id} target={target} />
        })}
      </>
    )
  },
)

ElementDropHandlers.displayName = 'BuilderDropHandlers'
