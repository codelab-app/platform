import type { PropsWithChildren, ReactNode, RefObject } from 'react'
import React from 'react'
import type { WithInternalDragData } from './internal-drag-data.interface'
import { useTypedDraggable } from './use-typed-draggable'

interface MakeDraggableProps<DragDataType> {
  /**
   * otherwise the children are used for overlay
   */
  customOverlay?: ReactNode
  data: DragDataType
  id: string
  wrapper?: React.FC
}

export const MakeChildrenDraggable = <DragDataType,>({
  children,
  customOverlay,
  data,
  id,
  wrapper,
}: PropsWithChildren<MakeDraggableProps<DragDataType>>) => {
  const WrapperElement = wrapper || 'div'

  const { active, attributes, listeners, setNodeRef } = useTypedDraggable<
    WithInternalDragData<DragDataType>
  >({
    data: {
      ...data,
      internalUseOnlyDragData: {
        overlayRenderer: (ref?: RefObject<HTMLDivElement>) => (
          <div ref={ref}>
            <WrapperElement>{customOverlay ?? children}</WrapperElement>
          </div>
        ),
      },
    },
    id,
  })

  const style = {
    opacity: active?.id === id ? 0.5 : 1,
  }

  return (
    <WrapperElement
      ref={setNodeRef}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...listeners}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...attributes}
      style={style}
    >
      {children}
    </WrapperElement>
  )
}
