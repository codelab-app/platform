import type { BuilderDragData } from '@codelab/frontend/abstract/application'

import CheckOutlined from '@ant-design/icons/CheckOutlined'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import DragOutlined from '@ant-design/icons/DragOutlined'
import EditOutlined from '@ant-design/icons/EditOutlined'
import {
  BuilderDndAction,
  isRuntimeElement,
} from '@codelab/frontend/abstract/application'
import { MakeChildrenDraggable } from '@codelab/frontend-application-dnd/components'
import { DeleteElementPopconfirm } from '@codelab/frontend-application-element/use-cases/delete-element'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { ClickOverlay } from '@codelab/frontend-presentation-view/components/overlay'
import { isServer } from '@codelab/shared/utils'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
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
  gap: 4px;
`

export const BuilderClickOverlay = observer<{
  renderContainerRef: React.MutableRefObject<HTMLElement | null>
}>(({ renderContainerRef }) => {
  const { builderService, runtimeElementService } = useApplicationStore()
  const selectedNode = builderService.selectedNode?.current

  if (isServer || !selectedNode || !isRuntimeElement(selectedNode)) {
    return null
  }

  const element = selectedNode.element.current
  const domElement = queryRenderedElementById(element.id)
  const supportsTextEditing = element.children.length === 0

  if (!domElement || !renderContainerRef.current) {
    return null
  }

  const content = (
    <StyledOverlayContainer>
      <StyledOverlayButtonGroup>
        <DeleteElementPopconfirm element={element} placement="bottom">
          <Button
            danger
            icon={<DeleteOutlined />}
            shape="circle"
            size="small"
            style={{ backgroundColor: '#375583' }}
            type="text"
          ></Button>
        </DeleteElementPopconfirm>

        <MakeChildrenDraggable<BuilderDragData>
          data={{
            action: BuilderDndAction.MoveElement,
          }}
          id={selectedNode.element.id}
        >
          <Button
            icon={<DragOutlined color="white" />}
            shape="circle"
            size="small"
            style={{ backgroundColor: '#375583' }}
            type="primary"
          />
        </MakeChildrenDraggable>
        {supportsTextEditing && (
          <Button
            aria-label="Toggle Content Editing"
            icon={
              element.isTextContentEditable ? (
                <CheckOutlined />
              ) : (
                <EditOutlined />
              )
            }
            onClick={(event) => {
              event.stopPropagation()
              element.setIsTextContentEditable(!element.isTextContentEditable)
            }}
            shape="circle"
            size="small"
            style={{ backgroundColor: '#375583' }}
            type="primary"
          />
        )}
      </StyledOverlayButtonGroup>
      <StyledSpan>{element.name}</StyledSpan>
    </StyledOverlayContainer>
  )

  return createPortal(
    <ClickOverlay
      content={content}
      dependencies={[
        selectedNode.style.guiCss(
          runtimeElementService.currentStylePseudoClass,
        ),
        selectedNode.style.customCss,
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
