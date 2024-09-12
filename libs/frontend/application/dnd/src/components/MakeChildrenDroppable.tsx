import type { ObjectLike } from '@codelab/shared/abstract/types'
import type { PropsWithChildren } from 'react'
import type { WithInternalDropData } from '../hooks/internal-drop-data.interface'
import { useTypedDroppable } from '../hooks/use-typed-droppable'

interface MakeDroppableProps<DropDataType> {
  data: DropDataType
  id: string
  parentDroppableContainerId?: string
  wrapper?: React.FC
  wrapperStyles?: React.CSSProperties
}

export const MakeChildrenDroppable = <DropDataType extends ObjectLike>({
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
