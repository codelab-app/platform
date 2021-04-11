import { useBuilderSelectionState } from '@codelab/frontend/builder'
import { Tabs } from 'antd'
import React from 'react'
import { PaneConfigProps } from '@codelab/modules/component'
import { PaneConfigStyle } from '@codelab/modules/style'
import styled from '@emotion/styled'

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
    selectionState: { selectedElementId },
  } = useBuilderSelectionState()

  if (!selectedElementId) {
    return null
  }

  return (
    <StyledTabs
      defaultActiveKey="1"
      style={{ padding: '1rem' }}
      onChange={() => null}
    >
      <TabPane tab="Props" key="1" style={{ height: '100%' }}>
        <PaneConfigProps pageElementId={selectedElementId} />
      </TabPane>
      <TabPane tab="Style" key="2">
        <PaneConfigStyle vertexId={selectedElementId} />
      </TabPane>
    </StyledTabs>
  )
})
