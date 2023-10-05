import { DeleteOutlined } from '@ant-design/icons'
import type {
  IBuilderService,
  IElementService,
} from '@codelab/frontend/abstract/core'
import { elementRef, isElementRef } from '@codelab/frontend/abstract/core'
import { queryRenderedElementById } from '@codelab/frontend/domain/renderer'
import { ClickOverlay } from '@codelab/frontend/presentation/view'
import { isServer } from '@codelab/shared/utils'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'

const StyledOverlayContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  max-height: 20px;
  justify-content: space-between;
  & > *:not(:last-child) {
    margin-right: 0.3rem;
  }
`

const StyledSpan = styled.p`
  height: 20px;
  min-width: 50px;
  margin: 0;
  font-size: 15px;
  overflow: hidden;
  white-space: nowrap;
`

const StyledOverlayButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  & > *:not(:last-child) {
    margin-right: 0.2rem;
  }
`

export const BuilderClickOverlay = observer<{
  builderService: IBuilderService
  elementService: IElementService
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(({ builderService, elementService, renderContainerRef }) => {
  const selectedNode = builderService.selectedNode

  if (isServer || !selectedNode || !isElementRef(selectedNode)) {
    return null
  }

  const element = queryRenderedElementById(selectedNode.id)

  if (!element || !renderContainerRef.current) {
    return null
  }

  const content = (
    <StyledOverlayContainer>
      <StyledSpan>{selectedNode.current.name}</StyledSpan>
      <StyledOverlayButtonGroup>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={(event) => {
            event.stopPropagation()
            elementService.deleteModal.open(elementRef(selectedNode.id))
          }}
          size="small"
          type="text"
        />
      </StyledOverlayButtonGroup>
    </StyledOverlayContainer>
  )

  const { closestParent, customCss, guiCss, nextSibling } = selectedNode.current
  const breakpoint = builderService.selectedBuilderBreakpoint
  const props = selectedNode.current.props.current.values
  const parentId = closestParent?.id
  const nextSiblingId = nextSibling?.id

  const dependencies = [
    guiCss,
    customCss,
    props,
    nextSiblingId,
    breakpoint,
    parentId,
  ]

  return createPortal(
    <ClickOverlay
      content={content}
      dependencies={dependencies}
      element={element}
      renderContainer={renderContainerRef.current}
    />,
    renderContainerRef.current,
  )
})

BuilderClickOverlay.displayName = 'BuilderClickOverlay'
