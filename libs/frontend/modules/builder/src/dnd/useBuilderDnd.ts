import { ElementStore } from '@codelab/frontend/modules/element'
import { Maybe } from '@codelab/shared/abstract/types'
import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { frozen } from 'mobx-keystone'
import { useCallback } from 'react'
import { BuilderService } from '../store/BuilderService'
import { BuilderDndType } from './BuilderDndType'
import { BuilderDragData } from './BuilderDragData'

export interface UseBuilderDnd {
  onDragStart: (data: DragStartEvent) => void
  onDragEnd: (data: DragEndEvent) => void
}

export const useBuilderDnd = (elementStore: ElementStore): UseBuilderDnd => {
  const { setCurrentlyDragging } = useBuilderDispatch()
  const state = useSelector((s) => s.builder.currentlyDragging)
  const { setSelectedElement } = useBuilderSelectedElement()

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
    async (e: DragEndEvent) => {
      const data = e.active.data.current as Maybe<BuilderDragData>
      const overData = e.over?.data.current as Maybe<BuilderDragData>

      const shouldCreate =
        data?.type === BuilderDndType.CreateElement &&
        overData?.type === BuilderDndType.CreateElement &&
        (data?.createElementInput || overData?.createElementInput)

      builderService.setCurrentDragData(null)

      if (shouldCreate) {
        const createElementInput = {
          ...(data?.createElementInput ?? {}),
          ...(overData?.createElementInput ?? {}),
        }

        elementStore.createElement(createElementInput).then((el: any) => {
          setSelectedElement(el.data?.createElement.id)
        })
      }
    },
    [elementStore, setCurrentlyDragging, setSelectedElement],
  )

  return { onDragStart, onDragEnd }
}
