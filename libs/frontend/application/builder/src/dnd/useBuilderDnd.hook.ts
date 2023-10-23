import type {
  IBuilderService,
  IElementService,
} from '@codelab/frontend/abstract/application'
import type {
  BuilderDragData,
  DragPosition,
  IElementTree,
} from '@codelab/frontend/abstract/domain'
import { BuilderDndType } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { frozen } from 'mobx-keystone'
import { pick } from 'ramda'
import { useCallback } from 'react'
import { useDndDropHandler } from './useDndDropHandlers.hook'

export interface UseBuilderDnd {
  sensors: ReturnType<typeof useSensors>
  onDragEnd(data: DragEndEvent, dragPosition: DragPosition): void
  onDragStart(data: DragStartEvent): void
}

export const useBuilderDnd = (): UseBuilderDnd => {
  const { builderService, elementService } = useStore()
  const elementTree: Maybe<IElementTree> = builderService.activeElementTree

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // Elements like checkboxes, inputs, etc. won't be interactive without a delay
        delay: 200,
        tolerance: 5,
      },
    }),
  )

  const { handleCreateElement, handleMoveElement } = useDndDropHandler(
    elementService,
    elementTree,
  )

  const onDragStart = useCallback(
    (event: DragStartEvent) => {
      const data = event.active.data.current as Maybe<BuilderDragData>

      if (data?.type === BuilderDndType.CreateElement) {
        // In mobx-keystone v1.2.0, `frozen` will throw if property is not serializable
        // e.g. `overlayRenderer` which is a function we add used for dragging effect style
        const dragData = pick(
          ['name', 'type', 'createElementInput', 'icon'],
          data,
        )

        builderService.mergeWithDragHoverContext({
          createAndMoveData: frozen(dragData),
          hoveredNode: null,
        })
      }
    },
    [builderService],
  )

  const onDragEnd = useCallback(
    async (event: DragEndEvent, dragPosition: DragPosition) => {
      const data = event.active.data.current as Maybe<BuilderDragData>

      const shouldCreate =
        data?.type === BuilderDndType.CreateElement &&
        data.createElementInput !== undefined

      const shouldMove = data?.type === BuilderDndType.MoveElement

      builderService.mergeWithDragHoverContext({
        createAndMoveData: null,
      })

      if (shouldCreate) {
        await handleCreateElement(event, dragPosition)
      } else if (shouldMove) {
        await handleMoveElement(event, dragPosition)
      }
    },
    [builderService, handleCreateElement, handleMoveElement],
  )

  return { onDragEnd, onDragStart, sensors }
}
