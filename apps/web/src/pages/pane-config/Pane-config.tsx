import { Tabs } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { PaneConfigProps, VertexProvider } from '@codelab/modules/component'
import { PaneConfigStyle } from '@codelab/modules/style'
import { paneConfigState } from '@codelab/frontend/shared'

const { TabPane } = Tabs

export const PaneConfig = React.memo(() => {
  const [{ vertexId }] = useRecoilState(paneConfigState)

  if (!vertexId) {
    return null
  }

  return (
    <Tabs defaultActiveKey="1" onChange={() => null}>
      <TabPane tab="Props" key="1">
        <VertexProvider vertexId={vertexId}>
          <PaneConfigProps />
        </VertexProvider>
      </TabPane>
      <TabPane tab="Style" key="2">
        <PaneConfigStyle vertexId={vertexId} />
      </TabPane>
    </Tabs>
  )
})
