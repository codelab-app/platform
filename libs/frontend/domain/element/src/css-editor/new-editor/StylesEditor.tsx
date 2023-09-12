import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse } from 'antd'
import React from 'react'
import { DisplayEditor } from './display/DisplayEditor'
import { SizeEditor } from './size/SizeEditor'
import { TypographyEditor } from './typography/TypographyEditor'

const { Panel } = Collapse

export const StylesEditor = () => {
  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1', '2', '3', '4', '5', '6', '7', '8']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
      size="small"
    >
      <Panel header="Layout" key="1">
        <DisplayEditor />
      </Panel>
      <Panel header="Spacing" key="2"></Panel>
      <Panel header="Size" key="3">
        <SizeEditor />
      </Panel>
      <Panel header="Position" key="4"></Panel>
      <Panel header="Typography" key="5">
        <TypographyEditor />
      </Panel>
      <Panel header="Backgrounds" key="6"></Panel>
      <Panel header="Borders" key="7"></Panel>
      <Panel header="Effects" key="8"></Panel>
    </Collapse>
  )
}
