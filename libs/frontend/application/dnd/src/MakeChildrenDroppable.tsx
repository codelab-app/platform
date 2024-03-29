import type { PropsWithChildren } from 'react'
import React from 'react'
import type { WithInternalDropData } from './internal-drop-data.interface'
import { useTypedDroppable } from './use-typed-droppable'

interface MakeDroppableProps<DropDataType> {
  data: DropDataType
  id: string
  parentDroppableContainerId?: string
  wrapper?: React.FC
  wrapperStyles?: React.CSSProperties
}

export const MakeChildrenDroppable = <
  DropDataType extends Record<string, unknown>,
>({
  children,
  data,
  id,
  parentDroppableContainerId,
  wrapper,
  wrapperStyles,
}: PropsWithChildren<MakeDroppableProps<DropDataType>>) => {
  const WrapperElement = wrapper || 'div'

  const { setNodeRef } = useTypedDroppable<WithInternalDropData<DropDataType>>({
    data: {
      ...data,
      internalUseOnlyDropData: {
        hierarchy: {
          parentId: parentDroppableContainerId,
        },
      },
    },
    id,
  })

  return (
    <WrapperElement
      className="size-full"
      ref={setNodeRef}
      style={wrapperStyles}
    >
      {children}
    </WrapperElement>
  )
}
