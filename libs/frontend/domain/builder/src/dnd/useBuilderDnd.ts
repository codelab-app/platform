import type {
  BuilderDragData,
  IBuilderService,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import { BuilderDndType } from '@codelab/frontend/abstract/core'
import { useStore } from '@codelab/frontend/presenter/container'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { notification } from 'antd'
import { frozen } from 'mobx-keystone'
import { pick } from 'ramda'
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

  const { atomService } = useStore()

  const { handleCreateElement, handleMoveElement } = useDndDropHandler(
    elementService,
    elementTree,
  )

  const onDragStart = useCallback(
    (e: DragStartEvent) => {
      const data = e.active.data.current as Maybe<BuilderDragData>

      if (data?.type === BuilderDndType.CreateElement) {
        // In mobx-keystone v1.2.0, `frozen` will throw if property is not serializable
        // e.g. `overlayRenderer` which is a function we add used for dragging effect style
        const dragData = pick(
          ['name', 'type', 'createElementInput', 'icon'],
          data,
        )

        builderService.setCurrentDragData(frozen(dragData))
      }
    },
    [builderService],
  )

  const onDragEnd = useCallback(
    async (event: DragEndEvent) => {
      const data = event.active.data.current as Maybe<BuilderDragData>
      const parent = event.over

      const child = atomService.atoms.get(
        `${data?.createElementInput?.renderType?.id}`,
      )

      const shouldCreate =
        data?.type === BuilderDndType.CreateElement &&
        data.createElementInput !== undefined

      const shouldMove = data?.type === BuilderDndType.MoveElement

      // check required parent
      if (child?.requiredParent) {
        if (child.requiredParent.id !== parent?.id) {
          notification['error']({
            message: 'Parent element required',
            description: `This element requires ${child.requiredParent.name} as a parent`,
            duration: 5,
          })

          return
        }
      }

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
