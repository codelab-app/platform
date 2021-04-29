import { useBuilderSelectionState } from '@codelab/frontend/builder'
import { Tabs } from 'antd'
import React from 'react'
import { PaneConfigStyle } from '@codelab/modules/style'
import styled from '@emotion/styled'
import { PaneConfigPageElementProps } from '@codelab/modules/prop'
import { useRouter } from 'next/router'
import {
  ActionType,
  CrudModal,
  EntityType,
  PageType,
} from '@codelab/frontend/shared'
import {
  CreateLinkedComponentElementButton,
  CreateLinkedComponentElementForm,
} from '@codelab/modules/component-element'

const { TabPane } = Tabs

const StyledTabs = styled(Tabs)`
  height: 100%;

  .ant-tabs-content-holder,
  .ant-tabs-content,
  .ant-tabs-tabpane {
    height: 100%;
  }
`

export const PaneConfig = React.memo(() => {
  const {
    selectionState: { selectedElement },
  } = useBuilderSelectionState()

  const { pathname } = useRouter()

  if (!selectedElement) {
    return null
  }

  if (pathname === PageType.ComponentDetail) {
    if (!selectedElement.componentElementId) {
      return null
    }

    return (
      <div data-testid="pane-config">
        <StyledTabs defaultActiveKey="1" style={{ padding: '1rem' }}>
          <TabPane tab="Inspector" key="1" style={{ height: '100%' }}>
            <CreateLinkedComponentElementButton>
              Insert child element
            </CreateLinkedComponentElementButton>

            <CrudModal
              modalProps={{
                className: 'create-linked-component-element-modal',
              }}
              entityType={EntityType.LinkedComponentElement}
              actionType={ActionType.Create}
              okText="Create"
              renderForm={() => (
                <CreateLinkedComponentElementForm
                  sourceComponentElementId={selectedElement.componentElementId}
                />
              )}
            />
          </TabPane>
        </StyledTabs>
      </div>
    )
  }

  if (!selectedElement.pageElementId) {
    return null
  }

  return (
    <StyledTabs defaultActiveKey="1" style={{ padding: '1rem' }}>
      <TabPane tab="Props" key="1" style={{ height: '100%' }}>
        <PaneConfigPageElementProps
          pageElementId={selectedElement.pageElementId}
        />
      </TabPane>
      <TabPane tab="Style" key="2">
        <PaneConfigStyle vertexId={selectedElement.pageElementId} />
      </TabPane>
    </StyledTabs>
  )
})
