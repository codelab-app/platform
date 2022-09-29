import {
  BuilderDndType,
  BuilderDragData,
  BuilderDropData,
  IBuilderService,
  IElement,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { frozen } from 'mobx-keystone'
import { useCallback } from 'react'
import { shouldCreateElementAsFirstChild } from './utils'

export interface UseBuilderDnd {
  onDragStart: (data: DragStartEvent) => void
  onDragEnd: (data: DragEndEvent) => void
  // sensors: ReturnType<typeof useSensors>
}

export const useBuilderDnd = (
  builderService: IBuilderService,
  elementService: IElementService,
  elementTree?: IElementTree,
): UseBuilderDnd => {
  // const sensors = useSensors(
  //   useSensor(PointerSensor, {
  //     activationConstraint: {
  //       delay: 100,
  //       tolerance: 5,
  //     },
  //   }),
  // )

  const onDragStart = useCallback(
    (e: DragStartEvent) => {
      const data = e.active.data.current as Maybe<BuilderDragData>

      console.log('onDragStart', data)

      if (data?.type === BuilderDndType.CreateElement) {
        builderService.setCurrentDragData(frozen(data))
      }
    },
    [builderService],
  )

  const onDragEnd = useCallback(
    async (e: DragEndEvent) => {
      console.log('onDragEnd', e)

      const data = e.active.data.current as Maybe<BuilderDragData>
      const overData = e.over?.data.current as Maybe<BuilderDropData>
      const collisions = e.collisions
      const nearestCollision = collisions?.[0]?.data
      const dropPosition = nearestCollision?.['dropPosition']
      const dragPosition = e.over?.data.current?.dragPosition

      // TODO: REFACTOR WHOLE

      // const shouldCreate =
      //   data?.type === BuilderDndType.CreateElement &&
      //   overData?.type === BuilderDndType.CreateElement &&
      //   (data?.createElementInput || overData?.createElementInput)

      const shouldCreate =
        data?.type === BuilderDndType.CreateElement &&
        data?.createElementInput !== undefined

      const shouldMove = data?.type === BuilderDndType.MoveElement

      builderService.setCurrentDragData(null)

      console.log('over', overData, 'active', data)

      // if (!shouldCreate) {
      //   return
      // }

      // const createElementInput = {
      //   ...data.createElementInput,
      //   ...overData.createElementInput,
      // }

      if (!elementTree) {
        console.error('Element Tree is missing')

        return
      }

      // drop position = 1, add as children
      let element: IElement

      if (
        data?.type === BuilderDndType.CreateElement &&
        data?.createElementInput !== undefined
      ) {
        console.log('shouldCreate dat ===> ', data.createElementInput)

        if (shouldCreateElementAsFirstChild(dropPosition)) {
          element = await elementService.createElementAsFirstChild(
            data.createElementInput,
          )
        } else {
          element = await elementService.createElementAsNextSibling(
            data.createElementInput,
          )
        }

        elementTree.addElements([element])
      } else if (shouldMove) {
        const droppedElementId = e.active.id.toString()
        const targetElementId = e.over?.id.toString()

        if (!droppedElementId || !targetElementId) {
          return
        }

        await elementService.handleElementDrop({
          droppedElementId,
          targetElementId,
          dragPosition,
        })
      }
    },
    [builderService, elementService, elementTree],
  )

  return { onDragStart, onDragEnd }
}
