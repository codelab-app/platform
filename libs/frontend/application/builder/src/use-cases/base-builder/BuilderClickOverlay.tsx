import CheckOutlined from '@ant-design/icons/CheckOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import DragOutlined from '@ant-design/icons/DragOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import type { BuilderDragData } from '@codelab/frontend/abstract/application'
import {
  BuilderDndAction,
  isRuntimeElementRef,
} from '@codelab/frontend/abstract/application'
import { elementRef } from '@codelab/frontend/abstract/domain'
import { MakeChildrenDraggable } from '@codelab/frontend-application-dnd/components'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import { ClickOverlay } from '@codelab/frontend-presentation-view/components/overlay'
import { isServer } from '@codelab/shared/utils'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { createPortal } from 'react-dom'
import styled from 'styled-components'
import { queryRenderedElementById } from '../../utils/query-rendered-element-by-id'

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
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(({ renderContainerRef }) => {
  const { builderService, elementService, runtimeElementService } = useStore()
  const selectedNode = builderService.selectedNode

  if (isServer || !selectedNode || !isRuntimeElementRef(selectedNode)) {
    return null
  }

  const element = selectedNode.current.element.current
  const domElement = queryRenderedElementById(element.id)

  if (!domElement || !renderContainerRef.current) {
    return null
  }

  const content = (
    <StyledOverlayContainer>
      <StyledOverlayButtonGroup>
        <div
          className="flex size-7 cursor-pointer items-center justify-center align-middle"
          onClick={(event) => {
            event.stopPropagation()
            elementService.deleteModal.open(elementRef(selectedNode.id))
          }}
        >
          <div
            className="flex size-5 items-center justify-center rounded-full align-middle"
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
          <div className="flex size-7 items-center justify-center align-middle">
            <div
              className="flex size-5 items-center justify-center rounded-full align-middle"
              style={{ backgroundColor: '#375583', color: 'white' }}
            >
              <DragOutlined color="white" />
            </div>
          </div>
        </MakeChildrenDraggable>
        <div
          className="flex size-7 cursor-pointer items-center justify-center align-middle"
          onClick={(event) => {
            event.stopPropagation()
            element.setIsTextContentEditable(!element.isTextContentEditable)
          }}
        >
          <div
            aria-label="Toggle Content Editing"
            className="flex size-5 items-center justify-center rounded-full align-middle"
            style={{ backgroundColor: '#375583', color: 'white' }}
          >
            {element.isTextContentEditable ? (
              <CheckOutlined />
            ) : (
              <EditOutlined />
            )}
          </div>
        </div>
      </StyledOverlayButtonGroup>
      <StyledSpan>{element.name}</StyledSpan>
    </StyledOverlayContainer>
  )

  return createPortal(
    <ClickOverlay
      content={content}
      dependencies={[
        selectedNode.current.style.guiCss(
          runtimeElementService.currentStylePseudoClass,
        ),
        selectedNode.current.style.customCss,
        element.tailwindClassNames,
        element.props.values,
        element.nextSibling?.id,
        element.parentElement?.id,
        element.isTextContentEditable,
      ]}
      element={domElement}
      renderContainer={renderContainerRef.current}
    />,
    renderContainerRef.current,
  )
})

BuilderClickOverlay.displayName = 'BuilderClickOverlay'
