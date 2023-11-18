import { DragOverlay, useDndContext } from '@dnd-kit/core'
import React from 'react'
import type { WithInternalDragData } from './internal-drag-data.interface'

export const AutoDragOverlay = () => {
  const { active } = useDndContext()
  const data = active?.data.current as WithInternalDragData<unknown> | undefined

  return (
    <DragOverlay>{data?.internalUseOnlyDragData.overlayRenderer()}</DragOverlay>
  )
}
