import { Tabs } from 'antd'
import React from 'react'
import { TemplateProperties } from './RJSFCustomGroupedTemplate'

const { TabPane } = Tabs

export const GroupTemplates = {
  tabs: (props: TemplateProperties) => (
    <Tabs defaultActiveKey="0" key="tabs">
      {props.properties.map((p: any, idx: any) => (
        <TabPane tab={p.name} key={p.name}>
          {p.children.map((c: React.ReactElement) => ({
            ...c,
            key: c.props.idSchema.$id,
          }))}
        </TabPane>
      ))}
    </Tabs>
  ),
}

export type GroupTypes = keyof typeof GroupTemplates
