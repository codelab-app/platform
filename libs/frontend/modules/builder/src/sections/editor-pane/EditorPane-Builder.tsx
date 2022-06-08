import {
  EditorPaneToggler,
  UseResizable,
} from '@codelab/frontend/view/components'
import { Tabs } from 'antd'
import React, { useState } from 'react'

const { TabPane } = Tabs

const onChange = (key: string) => {
  console.log(key)
}

type EditorPaneBuilderProps = {
  resizable: UseResizable
}

export const EditorPaneBuilder = ({ resizable }: EditorPaneBuilderProps) => {
  return (
    <Tabs
      defaultActiveKey="1"
      onChange={onChange}
      tabBarExtraContent={<EditorPaneToggler resizable={resizable} />}
    >
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
