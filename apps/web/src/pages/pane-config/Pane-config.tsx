import { Tabs } from 'antd'
import React from 'react'
import { useRecoilState } from 'recoil'
import { PaneConfigProps } from '@codelab/modules/component'
import { PaneConfigStyle } from '@codelab/modules/style'
import { paneConfigState } from '@codelab/frontend/shared'

const { TabPane } = Tabs

export const PaneConfig = React.memo(() => {
  const [{ pageElementId }] = useRecoilState(paneConfigState)

  if (!pageElementId) {
    return null
  }

  return (
    <Tabs
      defaultActiveKey="1"
      style={{ padding: '1rem' }}
      onChange={() => null}
    >
      <TabPane tab="Props" key="1">
        <PaneConfigProps pageElementId={pageElementId} />
      </TabPane>
      <TabPane tab="Style" key="2">
        <PaneConfigStyle vertexId={pageElementId} />
      </TabPane>
    </Tabs>
  )
})
