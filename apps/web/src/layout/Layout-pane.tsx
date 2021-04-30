import { useBuilderSelectionState } from '@codelab/frontend/builder'
import { Tabs } from 'antd'
import React from 'react'
import { PaneConfigStyle } from '@codelab/modules/style'
import styled from '@emotion/styled'
import { PaneConfigPageElementProps } from '@codelab/modules/prop'

const StyledTabs = styled(Tabs)`
  height: 100%;
  .ant-tabs-content-holder,
  .ant-tabs-content,
  .ant-tabs-tabpane {
    height: 100%;
  }
`

export const TabsLayout = ({ children }: React.PropsWithChildren<unknown>) => (
  <div data-testid="pane-config">
    <StyledTabs defaultActiveKey="1" style={{ padding: '1rem' }}>
      {children}
    </StyledTabs>
  </div>
)

export const LayoutPane = React.memo(() => {
  const {
    selectionState: { selectedElement },
  } = useBuilderSelectionState()

  if (!selectedElement) {
    return null
  }

  if (!selectedElement.pageElementId) {
    return null
  }

  return (
    <TabsLayout>
      <Tabs.TabPane tab="Props" key="1" style={{ height: '100%' }}>
        <PaneConfigPageElementProps
          pageElementId={selectedElement.pageElementId}
        />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Style" key="2">
        <PaneConfigStyle vertexId={selectedElement.pageElementId} />
      </Tabs.TabPane>
    </TabsLayout>
  )
})
