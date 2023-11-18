import type { PropsWithChildren } from 'react'
import React from 'react'
import type { WithInternalDragData } from './internal-drag-data.interface'
import { useTypedDraggable } from './use-typed-draggable'

interface MakeDraggableProps<DragDataType> {
  data: DragDataType
  id: string
  wrapper?: React.FC
  // customOverlay // TODO:otherwise the children are used for overlay
}

export const MakeChildrenDraggable = <DragDataType,>({
  children,
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
        overlayRenderer: () => <WrapperElement>{children}</WrapperElement>,
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
