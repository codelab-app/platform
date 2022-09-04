import { IElement } from '@codelab/shared/abstract/core'
import { useDndContext } from '@dnd-kit/core'
import { css } from '@emotion/react'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren, useMemo } from 'react'
import tw from 'twin.macro'
import { BuilderDropId } from './BuilderDropId'
import { useCreateElementDroppable } from './useCreateElementDroppable'

interface BuilderDropHandlerProps {
  element: IElement
}

const dropIndicatorRender = (dropPosition: 0 | 1) => {
  const leftByDropPosition: Record<number, number> = {
    0: 8,
    1: 32,
  }

  const style: React.CSSProperties = {
    left: leftByDropPosition[dropPosition],
    right: 0,
    bottom: -4,
  }

  return <div className="ant-tree-drop-indicator" style={style} />
}

// That's a separate component in order to not re-render the builder whenever
// the dnd position is changed, it causes massive lag
export const BuilderDropHandler = observer<
  PropsWithChildren<BuilderDropHandlerProps>
>(({ element, children }) => {
  const droppableId = useMemo(
    () => BuilderDropId.ElementTree + element.id,
    [element],
  )

  const { collisions } = useDndContext()
  const dropPosition = collisions?.[0]?.data?.['dropPosition']

  const createElementInput = useMemo(() => {
    // TBC
    return {}
  }, [element])

  const { setNodeRef, isOver } = useCreateElementDroppable(
    droppableId,
    createElementInput,
  )

  return (
    <div
      css={css`
        ${tw`relative`}
      `}
    >
      <div
        css={css`
          ${isOver && tw`bg-blue-500 text-white opacity-70 rounded`}
          ${tw`px-1`}
        `}
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
