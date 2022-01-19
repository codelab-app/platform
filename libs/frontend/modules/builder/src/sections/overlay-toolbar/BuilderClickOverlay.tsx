import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useElementDispatch } from '@codelab/frontend/modules/element'
import { ClickOverlay } from '@codelab/frontend/view/components'
import styled from '@emotion/styled'
import { Button } from 'antd'
import React from 'react'
import { useBuilderSelectedElement } from '../../hooks'
import { queryRenderedElementById } from '../../renderer'

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

export const BuilderClickOverlay = () => {
  const { selectedElement } = useBuilderSelectedElement()
  const { openDeleteModal, openCreateModal } = useElementDispatch()

  if (!selectedElement) {
    return null
  }

  const content = (
    <StyledOverlayContainer className="click-overlay-toolbar">
      <span>
        {selectedElement.name}{' '}
        {selectedElement.atom ? `(${selectedElement.atom.name})` : ''}
      </span>
      <StyledOverlayButtonGroup>
        <Button
          icon={<PlusOutlined />}
          onClick={(e) => {
            e.stopPropagation()

            return openCreateModal({ parentElementId: selectedElement.id })
          }}
          size="small"
          type="text"
        />

        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation()

            return openDeleteModal({
              deleteIds: [selectedElement.id],
              entity: selectedElement,
            })
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
      nodeId={selectedElement.id}
    />
  )
}

BuilderClickOverlay.displayName = 'BuilderClickOverlay'
