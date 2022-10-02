import {
  IBuilderService,
  IElementService,
  IElementTree,
  ROOT_RENDER_CONTAINER_ID,
} from '@codelab/frontend/abstract/core'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'
import tw from 'twin.macro'
import { GetComponentItem } from '../sections/config-pane/ConfigPane-ComponentTabContainer/GetComponentItem'
import { builderCollisionDetection } from './builderCollisionDetection'
import { useBuilderDnd } from './useBuilderDnd'

/**
 * Provides the DnD context for the builder
 */
export const BuilderContext = observer<
  PropsWithChildren<{
    elementService: IElementService
    builderService: IBuilderService
    elementTree?: IElementTree
  }>
>(({ children, elementService, builderService, elementTree }) => {
  const { onDragEnd, onDragStart } = useBuilderDnd(
    builderService,
    elementService,
    elementTree,
  )

  return (
    <DndContext
      autoScroll={{
        canScroll: (e) => {
          const renderRoot = document.getElementById(ROOT_RENDER_CONTAINER_ID)

          return e.contains(renderRoot)
        },
      }}
      collisionDetection={builderCollisionDetection}
      onDragEnd={(e) => {
        onDragEnd(e)
      }}
      onDragStart={(e) => {
        onDragStart(e)
      }}
    >
      {children}

      <DragOverlay dropAnimation={null}>
        {builderService.currentDragData ? (
          <div css={tw`p-2 text-sm border-gray-200 border w-[300px]`}>
            <GetComponentItem
              component={builderService.currentDragData.data}
              css={tw`opacity-40`}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
})

BuilderContext.displayName = 'BuilderContext'
