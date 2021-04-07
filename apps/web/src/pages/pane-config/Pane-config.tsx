import { Tabs } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { PaneConfigProps } from '@codelab/modules/component'
import { PaneConfigStyle } from '@codelab/modules/style'
import { paneConfigState } from '@codelab/frontend/shared'
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
  const [{ pageElementId }] = useRecoilState(paneConfigState)

  if (!pageElementId) {
    return null
  }

  return (
    <StyledTabs
      defaultActiveKey="1"
      style={{ padding: '1rem' }}
      onChange={() => null}
    >
      <TabPane tab="Props" key="1" style={{ height: '100%' }}>
        <PaneConfigProps pageElementId={pageElementId} />
      </TabPane>
      <TabPane tab="Style" key="2">
        <PaneConfigStyle vertexId={pageElementId} />
      </TabPane>
    </StyledTabs>
  )
})
