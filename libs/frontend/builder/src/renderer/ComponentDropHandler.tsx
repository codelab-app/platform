import { ComponentItemType, DragAndDropTypes } from '@codelab/frontend/shared'
import styled from '@emotion/styled'
import React, { PropsWithChildren } from 'react'
import { useDrop } from 'react-dnd'

interface ComponentDropHandlerProps {
  root?: any
  onDropped?: (component: ComponentItemType) => any
}

const StyledContainer = styled.div<{ isOver: boolean }>`
  min-height: 80vh;
  transition: border 150ms ease-in-out;
  border: ${(props) => (props.isOver ? '#55bbdd 1px solid' : 'sky 1px solid')};
  position: relative;
`

const CenteredMessage = styled.div<{ isOver: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: border 150ms ease-in-out;
  color: ${(props) => (props.isOver ? '#55bbdd' : 'sky')};
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`

export const ComponentDropHandler = ({
  children,
  root,
  onDropped,
}: PropsWithChildren<ComponentDropHandlerProps>) => {
  const [{ isOver }, drop] = useDrop<ComponentItemType, any, any>({
    accept: DragAndDropTypes.Component,
    drop: (component) => {
      if (onDropped) {
        onDropped(component)
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  })

  const hasNodes = root && root.children && root.children.length

  return (
    <StyledContainer ref={drop} isOver={isOver}>
      {hasNodes ? (
        children
      ) : (
        <CenteredMessage isOver={isOver}>
          <p>Drop components here</p>
        </CenteredMessage>
      )}
    </StyledContainer>
  )
}
