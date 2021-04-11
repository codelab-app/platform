import React, { FunctionComponent } from 'react'
import { useDrop } from 'react-dnd'
import {
  COMPONENT_ITEM_DRAG_TYPE,
  ComponentItemType,
} from '@codelab/modules/component'
import { NodeA } from '@codelab/frontend/shared'
import styled from '@emotion/styled'

interface ComponentDropHandlerProps {
  root?: NodeA
  onDropped?: (component: ComponentItemType) => any
}

const StyledContainer = styled.div<{ isOver: boolean }>`
  min-height: 80vh;
  transition: border 150ms ease-in-out;
  border: ${(props) =>
    props.isOver ? '#55bbdd 1px solid' : 'lightblue 1px solid'};
  position: relative;
`

const CenteredMessage = styled.div<{ isOver: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: border 150ms ease-in-out;
  color: ${(props) => (props.isOver ? '#55bbdd' : 'lightblue')};
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`

export const ComponentDropHandler: FunctionComponent<ComponentDropHandlerProps> = ({
  children,
  root,
  onDropped,
}) => {
  const [{ isOver }, drop] = useDrop<ComponentItemType, any, any>({
    accept: COMPONENT_ITEM_DRAG_TYPE,
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
