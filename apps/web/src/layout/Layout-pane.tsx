import { useBuilderSelectionState } from '@codelab/frontend/builder'
import styled from '@emotion/styled'
import { Tabs } from 'antd'
import React from 'react'

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

  // if (pathname === PageType.ComponentDetail) {
  //   return (
  //     <PaneConfigLayout>
  //       <TabPane tab="Inspector" key="1" style={{ height: '100%' }}>
  //         <PaneConfigComponentElement componentElementId={selectedElement} />
  //       </TabPane>
  //     </PaneConfigLayout>
  //   )
  // }

  // return (
  //   <PaneConfigLayout>
  //     <TabPane tab="Inspector" key="1" style={{ height: '100%' }}>
  //       <PaneConfigPageElementInspector pageElementId={selectedElement} />
  //     </TabPane>
  //     <TabPane tab="Props" key="2" style={{ height: '100%' }}>
  //       <PaneConfigPageElementProps pageElementId={selectedElement} />
  //     </TabPane>
  //     <TabPane tab="Style" key="3">
  //       <PaneConfigStyle vertexId={selectedElement} />
  //     </TabPane>
  //   </PaneConfigLayout>
  // )
  return null
})
