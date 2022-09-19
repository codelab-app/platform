import {
  BuilderDndType,
  BuilderDragData,
  IBuilderService,
  IElement,
  IElementService,
  IElementTree,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { frozen } from 'mobx-keystone'
import { useCallback } from 'react'
import { shouldCreateElementAsFirstChild } from './utils'

export interface UseBuilderDnd {
  onDragStart: (data: DragStartEvent) => void
  onDragEnd: (data: DragEndEvent) => void
}

export const useBuilderDnd = (
  builderService: IBuilderService,
  elementService: IElementService,
  elementTree: IElementTree,
): UseBuilderDnd => {
  const onDragStart = useCallback(
    (e: DragStartEvent) => {
      const data = e.active.data.current as Maybe<BuilderDragData>

      if (data?.type === BuilderDndType.CreateElement) {
        builderService.setCurrentDragData(frozen(data))
      }
    },
    [builderService],
  )

  if (!elementTree) {
    console.warn('[useBuilderDnd] No element tree found')
  }

  const onDragEnd = useCallback(
    async (e: DragEndEvent) => {
      const data = e.active.data.current as Maybe<BuilderDragData>
      const overData = e.over?.data.current as Maybe<BuilderDragData>
      const collisions = e.collisions
      const nearestCollision = collisions?.[0]?.data
      const dropPosition = nearestCollision?.['dropPosition']

      const shouldCreate =
        data?.type === BuilderDndType.CreateElement &&
        overData?.type === BuilderDndType.CreateElement &&
        (data?.createElementInput || overData?.createElementInput)

      builderService.setCurrentDragData(null)

      if (!shouldCreate) {
        return
      }

      const createElementInput = {
        ...data.createElementInput,
        ...overData.createElementInput,
      }

      // drop position = 1, add as children
      let element: IElement | null = null

      if (shouldCreateElementAsFirstChild(dropPosition)) {
        element = await elementService.createElementAsFirstChild(
          createElementInput,
        )
      } else {
        element = await elementService.createElementAsNextSibling(
          createElementInput,
        )
      }

      if (elementTree) {
        elementTree.buildTree([element])
      }
    },
    [builderService, elementService, elementTree],
  )

  return { onDragStart, onDragEnd }
}
