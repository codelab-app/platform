import type { IPropData } from '@codelab/shared/abstract/core'
import type { AnyData } from '@codelab/shared/abstract/types'
import type { PropsWithChildren } from 'react'
import React from 'react'
import type { WithInternalDropData } from './internal-drop-data.interface'
import { useTypedDroppable } from './use-typed-droppable'

interface MakeDroppableComponentProps<dataType> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReactComponent: React.ComponentType<React.ComponentPropsWithRef<any>>
  componentProps: IPropData
  data: dataType
  id: string
  parentDroppableContainerId?: string
}

export const MakeComponentDroppable = <DropDataType extends AnyData>({
  children,
  componentProps,
  data,
  id,
  parentDroppableContainerId,
  ReactComponent,
}: PropsWithChildren<MakeDroppableComponentProps<DropDataType>>) => {
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
    <>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ReactComponent ref={setNodeRef} {...componentProps}>
        {children}
      </ReactComponent>
    </>
  )
}
