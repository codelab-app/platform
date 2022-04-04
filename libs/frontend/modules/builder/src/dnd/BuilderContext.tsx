import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/core'
import { WithElementService } from '@codelab/frontend/modules/element'
import { withProvider } from '@codelab/frontend/presenter/container'
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { observer } from 'mobx-react-lite'
import React, { PropsWithChildren } from 'react'
import tw from 'twin.macro'
import { WithBuilderService } from '../store/BuilderService'
import { builderCollisionDetection } from './builderCollisionDetection'
import { useBuilderDnd } from './useBuilderDnd'

export interface BuilderContextProps
  extends WithElementService,
    WithBuilderService {}

/**
 * Provides the DnD context for the builder
 */
export const BuilderContext = observer(
  ({
    children,
    elementService,
    builderService,
  }: PropsWithChildren<BuilderContextProps>) => {
    const { onDragEnd, onDragStart } = useBuilderDnd(
      builderService,
      elementService,
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
            <div css={tw`p-2 text-sm border-gray-200 border w-24`}>
              {builderService.currentDragData.data.createElementInput.name}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    )
  },
)

export const withBuilderContext = withProvider(BuilderContext)
