import { Tabs } from 'antd'
import React from 'react'

const { TabPane } = Tabs

const onChange = (key: string) => {
  console.log(key)
}

export const EditorPaneBuilder = () => {
  return (
    <Tabs defaultActiveKey="1" onChange={onChange}>
      <TabPane key="1" tab="Tab 1">
        Content of Tab Pane 1
      </TabPane>
      <TabPane key="2" tab="Tab 2">
        Content of Tab Pane 2
      </TabPane>
      <TabPane key="3" tab="Tab 3">
        Content of Tab Pane 3
      </TabPane>
    </Tabs>
  )
}
