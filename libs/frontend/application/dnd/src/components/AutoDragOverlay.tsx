import { DragOverlay, useDndContext } from '@dnd-kit/core'
import { snapCenterToCursor } from '@dnd-kit/modifiers'
import React, { useRef } from 'react'
import type { WithInternalDragData } from '../hooks/internal-drag-data.interface'

export const AutoDragOverlay = () => {
  const { active } = useDndContext()
  const data = active?.data.current as WithInternalDragData<unknown> | undefined
  const overlayContainerRef = useRef<HTMLDivElement>(null)

  return (
    <DragOverlay
      modifiers={[snapCenterToCursor]}
      style={{
        cursor: 'grabbing',
        height: overlayContainerRef.current?.style.height,
        width: overlayContainerRef.current?.style.height,
      }}
    >
      {data?.internalUseOnlyDragData.overlayRenderer(overlayContainerRef)}
    </DragOverlay>
  )
}
