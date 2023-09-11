import { CaretRightOutlined } from '@ant-design/icons'
import { Collapse } from 'antd'
import React from 'react'
import { DisplayEditor } from './DisplayEditor'

const { Panel } = Collapse

export const StylesEditor = () => {
  const [display, setDisplay] = React.useState('flex')

  return (
    <Collapse
      bordered={false}
      defaultActiveKey={['1']}
      expandIcon={({ isActive }) => (
        <CaretRightOutlined rotate={isActive ? 90 : 0} />
      )}
    >
      <Panel header="Layout" key="1">
        <DisplayEditor onChange={setDisplay} value={display} />
      </Panel>
      <Panel header="Font" key="2"></Panel>
      <Panel header="Background" key="3"></Panel>
      <Panel header="Effects" key="4"></Panel>
      <Panel header="Borders" key="5"></Panel>
      <Panel header="Shadows" key="6"></Panel>
    </Collapse>
  )
}
