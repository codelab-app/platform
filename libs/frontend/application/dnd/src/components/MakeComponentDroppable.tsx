import type { IPropData } from '@codelab/shared/abstract/core'
import type { AnyData } from '@codelab/shared/abstract/types'
import type { PropsWithChildren } from 'react'

import type { WithInternalDropData } from '../hooks/internal-drop-data.interface'

import { useTypedDroppable } from '../hooks/use-typed-droppable'

type ReactComponentWithRef = React.ComponentType<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  React.ComponentPropsWithRef<any>
>

interface MakeDroppableComponentProps<dataType> {
  ReactComponent: ReactComponentWithRef
  componentProps: IPropData
  data: dataType
  id: string
  parentDroppableContainerId?: string
  /**
   * whether or not to wrap the droppable component.
   * mainly used in case the component itself cannot be droppable
   */
  wrapComponent?: boolean
}

export const MakeComponentDroppable = <DropDataType extends AnyData>({
  children,
  componentProps,
  data,
  id,
  parentDroppableContainerId,
  ReactComponent,
  wrapComponent,
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

  return wrapComponent ? (
    <div ref={setNodeRef}>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <ReactComponent {...componentProps}>{children}</ReactComponent>
    </div>
  ) : (
    /* eslint-disable-next-line react/jsx-props-no-spreading */
    <ReactComponent ref={setNodeRef} {...componentProps}>
      {children}
    </ReactComponent>
  )
}
