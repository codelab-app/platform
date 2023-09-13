import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse, Typography } from 'antd'
import React from 'react'
import { BackgroundEditor } from './background'
import { BorderEditor } from './border'
import { DisplayEditor } from './display/DisplayEditor'
import { PositionEditor } from './position'
import { SizeEditor } from './size/SizeEditor'
import { SpacingEditor } from './spacing/SpacingEditor'
import { TypographyEditor } from './typography/TypographyEditor'

const { Panel } = Collapse

const panelHeader = (title: string) => {
  return <Typography className="text-[12px] font-semibold">{title}</Typography>
}

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
      <Panel header={panelHeader('Layout')} key="1">
        <DisplayEditor />
      </Panel>
      <Panel header={panelHeader('Spacing')} key="2">
        <SpacingEditor />
      </Panel>
      <Panel header={panelHeader('Size')} key="3">
        <SizeEditor />
      </Panel>
      <Panel header={panelHeader('Position')} key="4">
        <PositionEditor />
      </Panel>
      <Panel header={panelHeader('Typography')} key="5">
        <TypographyEditor />
      </Panel>
      <Panel header={panelHeader('Backgrounds')} key="6">
        <BackgroundEditor />
      </Panel>
      <Panel header={panelHeader('Borders')} key="7">
        <BorderEditor />
      </Panel>
      <Panel header={panelHeader('Effects')} key="8"></Panel>
    </Collapse>
  )
}
