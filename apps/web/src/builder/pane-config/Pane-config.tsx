import { Tabs } from 'antd'
import React from 'react'
import { atom, useRecoilState } from 'recoil'
import { VertexProvider } from '../../useCases/vertex/VertexProvider'
import { PaneConfigProps } from './props/Pane-config--props'
import { PaneConfigStyle } from './style/Pane-config--style'

const { TabPane } = Tabs

export interface PaneConfigState {
  vertexId?: string
}

export const paneConfigState = atom<PaneConfigState>({
  key: 'paneConfig',
  default: {
    // vertexId: null,
  },
})

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
        <PaneConfigStyle />
      </TabPane>
    </Tabs>
  )
})

// PaneConfig.whyDidYouRender = true
