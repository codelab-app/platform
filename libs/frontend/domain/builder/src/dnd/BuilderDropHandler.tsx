import type { IElement } from '@codelab/frontend/abstract/core'
import { useDndContext } from '@dnd-kit/core'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React, { useMemo } from 'react'
import { css } from 'styled-components'
import { BuilderDropId } from './builder-drop-id'
import { useCreateElementDroppable } from './useCreateElementDroppable.hook'
import { shouldCreateElementAsFirstChild } from './utils'

interface BuilderDropHandlerProps {
  element: IElement
}

const dropIndicatorRender = (dropPosition: 0 | 1) => {
  const leftByDropPosition: Record<number, number> = {
    0: 8,
    1: 32,
  }

  const style: React.CSSProperties = {
    bottom: -4,
    left: leftByDropPosition[dropPosition],
    right: 0,
  }

  return <div className="ant-tree-drop-indicator" style={style} />
}

// That's a separate component in order to not re-render the builder whenever
// the dnd position is changed, it causes massive lag
export const BuilderDropHandler = observer<
  PropsWithChildren<BuilderDropHandlerProps>
>(({ children, element }) => {
  const droppableId = useMemo(
    () => BuilderDropId.ElementTree + element.id,
    [element],
  )

  const { collisions } = useDndContext()
  const nearestCollision = collisions?.[0]?.data
  const dropPosition = nearestCollision?.['dropPosition']

  const createElementInput = useMemo(() => {
    if (shouldCreateElementAsFirstChild(dropPosition)) {
      return {
        parentElement: element,
      }
    }

    return {
      prevSibling: element,
    }
  }, [element, dropPosition])

  const { isOver, setNodeRef } = useCreateElementDroppable(
    { id: droppableId },
    createElementInput,
  )

  return (
    <div className="relative">
      <div
        className={`${
          isOver ? 'rounded bg-blue-500 text-white opacity-70' : ''
        } px-1`}
        id="builder-drop-handler"
        ref={setNodeRef}
      >
        {children}
      </div>
      {isOver && dropIndicatorRender(dropPosition)}
    </div>
  )
})

BuilderDropHandler.displayName = 'BuilderDropHandler'
