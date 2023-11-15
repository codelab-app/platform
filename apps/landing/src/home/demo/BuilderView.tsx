import FormatPainterOutlined from '@ant-design/icons/FormatPainterOutlined'
import PartitionOutlined from '@ant-design/icons/PartitionOutlined'
import SettingOutlined from '@ant-design/icons/SettingOutlined'
import { Tabs } from 'antd'
import React from 'react'
import { ButtonPropsForm } from './ButtonDemoProps'
import { DOMTree } from './DomTree'

const { TabPane } = Tabs

export const BuilderView = () => {
  return (
    <Tabs defaultActiveKey="1" style={{ height: 220 }} tabPosition="left">
      <TabPane key="tree" tab={<PartitionOutlined />}>
        <DOMTree />
      </TabPane>
      <TabPane key="props" tab={<SettingOutlined />}>
        <ButtonPropsForm />
      </TabPane>
      <TabPane key="css" tab={<FormatPainterOutlined />}>
        <ButtonPropsForm />
      </TabPane>
    </Tabs>
  )
}
