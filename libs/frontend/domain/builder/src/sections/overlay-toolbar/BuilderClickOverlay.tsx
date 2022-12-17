import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import type {
  IBuilderService,
  IElementService,
} from '@codelab/frontend/abstract/core'
import { isElement } from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/domain/element'
import { queryRenderedElementById } from '@codelab/frontend/domain/renderer'
import { ClickOverlay } from '@codelab/frontend/view/components'
import styled from '@emotion/styled'
import { Button } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'

const StyledOverlayContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  & > *:not(:last-child) {
    margin-right: 0.3rem;
  }

  .click-overlay-toolbar--button-group {
  }
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
}>(({ builderService, elementService }) => {
  const selectedNode = builderService.selectedNode

  if (!selectedNode || !isElement(selectedNode)) {
    return null
  }

  const content = (
    <StyledOverlayContainer className="click-overlay-toolbar">
      <span>
        {selectedNode.name}{' '}
        {selectedNode.atom ? `(${selectedNode.atom.current.name})` : ''}
      </span>
      <StyledOverlayButtonGroup>
        <Button
          icon={<PlusOutlined />}
          onClick={(e) => {
            e.stopPropagation()

            elementService.createModal.open({
              // TODO: null!
              parentElement: selectedNode.renderComponentType
                ? null!
                : elementRef(selectedNode.id),
            })
          }}
          size="small"
          type="text"
        />

        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation()

            elementService.deleteModal.open(elementRef(selectedNode.id))
          }}
          size="small"
          type="text"
        />
      </StyledOverlayButtonGroup>
    </StyledOverlayContainer>
  )

  return (
    <ClickOverlay
      content={content}
      getOverlayElement={queryRenderedElementById}
      nodeId={selectedNode.id}
    />
  )
})

BuilderClickOverlay.displayName = 'BuilderClickOverlay'
