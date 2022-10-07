import {
  BuilderDndType,
  BuilderDragData,
  IBuilderService,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import {
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { frozen } from 'mobx-keystone'
import { useCallback } from 'react'
import { useDndDropHandler } from './useDndDropHandlers'

export interface UseBuilderDnd {
  onDragStart: (data: DragStartEvent) => void
  onDragEnd: (data: DragEndEvent) => void
  sensors: ReturnType<typeof useSensors>
}

export const useBuilderDnd = (
  builderService: IBuilderService,
  elementService: IElementService,
  elementTree?: IElementTree,
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
    (e: DragStartEvent) => {
      const data = e.active.data.current as Maybe<BuilderDragData>

      if (data?.type === BuilderDndType.CreateElement) {
        builderService.setCurrentDragData(frozen(data))
      }
    },
    [builderService],
  )

  const onDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const data = event.active.data.current as Maybe<BuilderDragData>

      const shouldCreate =
        data?.type === BuilderDndType.CreateElement &&
        data?.createElementInput !== undefined

      const shouldMove = data?.type === BuilderDndType.MoveElement

      builderService.setCurrentDragData(null)

      if (shouldCreate) {
        await handleCreateElement(event)
      } else if (shouldMove) {
        await handleMoveElement(event)
      }
    },
    [builderService, elementService, elementTree],
  )

  return { onDragStart, onDragEnd, sensors }
}
