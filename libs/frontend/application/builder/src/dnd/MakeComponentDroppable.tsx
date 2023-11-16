import type { IPropData } from '@codelab/shared/abstract/core'
import type { PropsWithChildren } from 'react'
import React from 'react'
import type { BuilderDropData } from './builder-drop-data.interface'
import { useTypedDroppable } from './use-typed-droppable'

interface MakeDroppableComponentProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ReactComponent: React.ComponentType<React.ComponentPropsWithRef<any>>
  componentProps: IPropData
  data: BuilderDropData
  id: string
}

export const MakeComponentDroppable = ({
  children,
  componentProps,
  data,
  id,
  ReactComponent,
}: PropsWithChildren<MakeDroppableComponentProps>) => {
  const { setNodeRef } = useTypedDroppable<BuilderDropData>({
    data,
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
