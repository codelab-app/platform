import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import DragOutlined from '@ant-design/icons/DragOutlined'
import type {
  BuilderDragData,
  IElementService,
} from '@codelab/frontend/abstract/application'
import { BuilderDndAction } from '@codelab/frontend/abstract/application'
import type { IBuilderDomainService } from '@codelab/frontend/abstract/domain'
import { elementRef, isElementRef } from '@codelab/frontend/abstract/domain'
import { MakeChildrenDraggable } from '@codelab/frontend/application/dnd'
import { ClickOverlay } from '@codelab/frontend/presentation/view'
import { isServer } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { queryRenderedElementById } from '../../utils'

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
  margin: 2px;
  overflow: hidden;
  white-space: nowrap;
`

const StyledOverlayButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
`

export const BuilderClickOverlay = observer<{
  builderService: IBuilderDomainService
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
      <StyledOverlayButtonGroup>
        <div
          className="size-7 flex cursor-pointer items-center justify-center align-middle"
          onClick={(event) => {
            event.stopPropagation()
            elementService.deleteModal.open(elementRef(selectedNode.id))
          }}
        >
          <div
            className="size-5 flex items-center justify-center rounded-full align-middle"
            style={{ backgroundColor: '#375583', color: 'red' }}
          >
            <DeleteOutlined />
          </div>
        </div>
        <MakeChildrenDraggable<BuilderDragData>
          data={{
            action: BuilderDndAction.MoveElement,
          }}
          id={selectedNode.id}
        >
          <div className="size-7 flex items-center justify-center align-middle">
            <div
              className="size-5 flex items-center justify-center rounded-full align-middle"
              style={{ backgroundColor: '#375583', color: 'white' }}
            >
              <DragOutlined color="white" />
            </div>
          </div>
        </MakeChildrenDraggable>
      </StyledOverlayButtonGroup>
      <StyledSpan>{selectedNode.current.name}</StyledSpan>
    </StyledOverlayContainer>
  )

  const { closestParentElement, nextSibling } = selectedNode.current
  const breakpoint = builderService.selectedBuilderBreakpoint
  const props = selectedNode.current.props.values
  const parentId = closestParentElement?.id
  const nextSiblingId = nextSibling?.id
  const dependencies = [props, nextSiblingId, breakpoint, parentId]

  return createPortal(
    <ClickOverlay
      content={content}
      dependencies={[
        selectedNode.current.style.guiCss(
          elementService.currentStylePseudoClass,
        ),
        selectedNode.current.style.customCss,
        selectedNode.current.tailwindClassNames,
        selectedNode.current.props.values,
        selectedNode.current.nextSibling?.id,
        selectedNode.current.parentElement?.id,
      ]}
      element={element}
      renderContainer={renderContainerRef.current}
    />,
    renderContainerRef.current,
  )
})

BuilderClickOverlay.displayName = 'BuilderClickOverlay'
