import { MakeComponentDroppable } from '@codelab/frontend/application/dnd'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { StyledComponent, type StyledComponentProps } from './StyledComponent'

interface DroppableStyledComponentProps extends StyledComponentProps {
  id: string
  isDroppable: boolean
  parentId: string | undefined
}

export const DroppableStyledComponent = ({
  children,
  componentProps,
  id,
  isDroppable,
  parentId,
  ReactComponent,
}: PropsWithChildren<DroppableStyledComponentProps>) => {
  return isDroppable ? (
    <MakeComponentDroppable
      ReactComponent={StyledComponent}
      componentProps={{
        componentProps,
        ReactComponent,
      }}
      data={{}}
      id={id}
      parentDroppableContainerId={parentId}
      wrapComponent={ReactComponent === React.Fragment}
    >
      {children}
    </MakeComponentDroppable>
  ) : (
    <StyledComponent
      ReactComponent={ReactComponent}
      componentProps={componentProps}
    >
      {children}
    </StyledComponent>
  )
}
