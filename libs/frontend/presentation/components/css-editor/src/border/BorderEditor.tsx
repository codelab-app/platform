import CloseOutlined from '@ant-design/icons/CloseOutlined'
import DashOutlined from '@ant-design/icons/DashOutlined'
import MinusOutlined from '@ant-design/icons/MinusOutlined'
import SmallDashOutlined from '@ant-design/icons/SmallDashOutlined'
import { Col, Divider, Row } from 'antd'
import { useState } from 'react'

import type { CssProperty } from '../css'

import { SegmentedSelect, ValuePicker } from '../components'
import { ColorPicker } from '../components/ColorPicker'
import { useStyle } from '../style.hook'
import { Side } from '../utils'
import { BorderRadiusEditor } from './BorderRadiusEditor'
import { BorderSidePicker } from './BorderSidePicker'

const styleOptions = [
  {
    icon: <CloseOutlined />,
    value: 'none',
  },
  {
    icon: <MinusOutlined />,
    value: 'solid',
  },
  {
    icon: <DashOutlined />,
    value: 'dashed',
  },
  {
    icon: <SmallDashOutlined />,
    value: 'dotted',
  },
]

const getSidePropertyName = (side: Side, property: string) => {
  let key = ''

  if (side === Side.Center) {
    key = `border-${property}`
  } else {
    key = `border-${side}-${property}`
  }

  return key as CssProperty
}

export const BorderEditor = () => {
  const { canReset, getCurrentStyle, resetStyle, setStyle } = useStyle()
  const [selectedSide, setSelectedSide] = useState(Side.Center)

  const isSideModified = (side: Side) => {
    return (
      canReset(getSidePropertyName(side, 'style')) ||
      canReset(getSidePropertyName(side, 'width')) ||
      canReset(getSidePropertyName(side, 'color'))
    )
  }

  return (
    <Col>
      <Row justify="space-between" wrap={false}>
        <Col span={8}>
          <BorderSidePicker
            canResetSide={isSideModified}
            onChange={setSelectedSide}
            side={selectedSide}
          />
        </Col>
        <Col className="w-full space-y-2" span={14}>
          <SegmentedSelect
            canReset={canReset(getSidePropertyName(selectedSide, 'style'))}
            label="Style"
            onChange={(value) => {
              setStyle(getSidePropertyName(selectedSide, 'style'), value)
            }}
            onReset={() => {
              resetStyle(getSidePropertyName(selectedSide, 'style'))
            }}
            options={styleOptions}
            size="small"
            value={getCurrentStyle(getSidePropertyName(selectedSide, 'style'))}
          />
          <ValuePicker
            canReset={canReset(getSidePropertyName(selectedSide, 'width'))}
            currentValue={getCurrentStyle(
              getSidePropertyName(selectedSide, 'width'),
            )}
            label="Width"
            onChange={(value) => {
              setStyle(getSidePropertyName(selectedSide, 'width'), value)
            }}
            onReset={() => {
              resetStyle(getSidePropertyName(selectedSide, 'width'))
            }}
            size="small"
          />
          <ColorPicker
            canReset={canReset(getSidePropertyName(selectedSide, 'color'))}
            label="Color"
            onChange={(value) => {
              setStyle(getSidePropertyName(selectedSide, 'color'), value)
            }}
            onReset={() => {
              resetStyle(getSidePropertyName(selectedSide, 'color'))
            }}
            size="small"
            value={getCurrentStyle(getSidePropertyName(selectedSide, 'color'))}
          />
        </Col>
      </Row>
      <Divider className="my-2 mt-3" />
      <BorderRadiusEditor />
    </Col>
  )
}
