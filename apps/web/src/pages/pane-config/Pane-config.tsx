import { useBuilderSelectionState } from '@codelab/frontend/builder'
import { Tabs } from 'antd'
import React from 'react'
import { PaneConfigStyle } from '@codelab/modules/style'
import styled from '@emotion/styled'
import { PaneConfigPageElementProps } from '@codelab/modules/prop'
import { useRouter } from 'next/router'
import { PageType } from '@codelab/frontend/shared'
import { PaneConfigComponentElement } from '@codelab/modules/component-element'

const { TabPane } = Tabs

const StyledTabs = styled(Tabs)`
  height: 100%;

  .ant-tabs-content-holder,
  .ant-tabs-content,
  .ant-tabs-tabpane {
    height: 100%;
  }
`

const PaneConfigLayout = ({ children }: React.PropsWithChildren<unknown>) => (
  <div data-testid="pane-config">
    <StyledTabs defaultActiveKey="1" style={{ padding: '1rem' }}>
      {children}
    </StyledTabs>
  </div>
)

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
      <PaneConfigLayout>
        <Tabs.TabPane tab="Inspector" key="1" style={{ height: '100%' }}>
          <PaneConfigComponentElement
            componentElementId={selectedElement.componentElementId}
          />
        </Tabs.TabPane>
      </PaneConfigLayout>
    )
  }

  if (!selectedElement.pageElementId) {
    return null
  }

  return (
    <PaneConfigLayout>
      <TabPane tab="Props" key="1" style={{ height: '100%' }}>
        <PaneConfigPageElementProps
          pageElementId={selectedElement.pageElementId}
        />
      </TabPane>
      <TabPane tab="Style" key="2">
        <PaneConfigStyle vertexId={selectedElement.pageElementId} />
      </TabPane>
    </PaneConfigLayout>
  )
})
