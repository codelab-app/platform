import type { PropsWithChildren } from 'react'
import React from 'react'
import type { BuilderDropData } from './builder-drop-data.interface'
import { useTypedDroppable } from './use-typed-droppable'

interface MakeDroppableProps {
  data: BuilderDropData
  id: string
  wrapper?: React.FC
}

export const MakeChildrenDroppable = ({
  children,
  data,
  id,
  wrapper,
}: PropsWithChildren<MakeDroppableProps>) => {
  const WrapperElement = wrapper || 'div'

  const { setNodeRef } = useTypedDroppable<BuilderDropData>({
    data,
    id,
  })

  return (
    <WrapperElement className="h-full w-full" ref={setNodeRef}>
      {children}
    </WrapperElement>
  )
}
