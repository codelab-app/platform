import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { ClickOverlay } from '@codelab/frontend/builder'
import { EntityType, useCrudModalForm } from '@codelab/frontend/shared'
import styled from '@emotion/styled'
import { Button } from 'antd'
import React from 'react'
import { usePageBuilderState } from './pageBuilderState'

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

export const PageBuilderClickAdapter = () => {
  const {
    state: { selectedElement },
  } = usePageBuilderState()

  const { openDeleteModal, openCreateModal } = useCrudModalForm(
    EntityType.Element,
  )

  if (!selectedElement) {
    return null
  }

  const content = (
    <StyledOverlayContainer className="click-overlay-toolbar">
      <span>
        {selectedElement.name}{' '}
        {selectedElement.atom ? `(${selectedElement.atom.label})` : ''}
      </span>
      <StyledOverlayButtonGroup>
        <Button
          size="small"
          type="text"
          icon={<PlusOutlined />}
          onClick={(e) => {
            e.stopPropagation()

            return openCreateModal()
          }}
        />

        <Button
          size="small"
          danger
          type="text"
          icon={<DeleteOutlined />}
          onClick={(e) => {
            e.stopPropagation()

            return openDeleteModal([selectedElement.id], selectedElement)
          }}
        />
      </StyledOverlayButtonGroup>
    </StyledOverlayContainer>
  )

  return <ClickOverlay nodeId={selectedElement.id} content={content} />
}

PageBuilderClickAdapter.displayName = 'PageBuilderClickAdapter'
