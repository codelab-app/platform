import type { IElementService } from '@codelab/frontend/abstract/application'
import type {
  IBuilderDomainService,
  IElementTree,
} from '@codelab/frontend/abstract/domain'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { useCallback } from 'react'
import {
  BuilderDndAction,
  type BuilderDragData,
} from './builder-drag-data.interface'
import { useDndDropHandler } from './useDndDropHandlers.hook'

export interface UseBuilderDnd {
  sensors: ReturnType<typeof useSensors>

  onDragEnd(data: DragEndEvent): void
  onDragStart(data: DragStartEvent): void
}

export const useBuilderDnd = (
  builderService: IBuilderDomainService,
  elementService: IElementService,
  elementTree: Maybe<IElementTree>,
): UseBuilderDnd => {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        // Elements like checkboxes, inputs, etc. won't be interactive without a delay
        delay: 100,
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
      // const data = event.active.data.current as Maybe<BuilderDragData>
    },
    [builderService],
  )

  const onDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const data = event.active.data.current as Maybe<BuilderDragData>

      const shouldCreate =
        data?.action === BuilderDndAction.CreateElement &&
        data.createElementInput !== undefined

      const shouldMove = data?.action === BuilderDndAction.MoveElement

      if (shouldCreate) {
        await handleCreateElement(event)
      } else if (shouldMove) {
        await handleMoveElement(event)
      }
    },
    [builderService, elementService, elementTree],
  )

  return { onDragEnd, onDragStart, sensors }
}
