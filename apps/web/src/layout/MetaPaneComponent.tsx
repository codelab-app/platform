import { css } from '@emotion/react'
import { Tabs } from 'antd'
import { Resizable } from 're-resizable'
import React from 'react'
import { ComponentTab } from './MetaPaneComponent-componentTab'

export const MetaPaneComponent = () => {
  return (
    <Resizable
      enable={{ top: true }}
      css={css`
        position: fixed;
        bottom: 0;
        background: white;
        height: 80%;
      `}
      maxHeight={400}
      defaultSize={{
        width: '100%',
        height: 200,
      }}
    >
      <Tabs defaultActiveKey="1">
        <Tabs.TabPane tab="Component" key="1">
          <ComponentTab />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </Tabs.TabPane>
      </Tabs>
    </Resizable>
  )
}
