import type { PropsWithChildren } from 'react'
import React from 'react'
import type { BuilderDragData } from './builder-drag-data.interface'
import { useTypedDraggable } from './use-typed-draggable'

interface MakeDraggableProps {
  data: Omit<BuilderDragData, 'overlayRenderer'>
  id: string
  wrapper?: React.FC
  // customOverlay // TODO:otherwise the children are used for overlay
}

export const MakeChildrenDraggable = ({
  children,
  data,
  id,
  wrapper,
}: PropsWithChildren<MakeDraggableProps>) => {
  const WrapperElement = wrapper || 'div'

  const { active, attributes, listeners, setNodeRef } =
    useTypedDraggable<BuilderDragData>({
      data: {
        ...data,
        overlayRenderer: () => <WrapperElement>{children}</WrapperElement>,
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
