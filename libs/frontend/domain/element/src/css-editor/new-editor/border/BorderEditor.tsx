import {
  CloseOutlined,
  DashOutlined,
  MinusOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
  SmallDashOutlined,
} from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import React, { useState } from 'react'
import { SegmentedSelect, ValuePicker } from '../components'
import { ColorPicker } from '../components/ColorPicker'
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

const radiusOptions = [
  {
    icon: <RadiusUpleftOutlined />,
    value: 'border-top-right-radius',
  },
  {
    icon: <RadiusUprightOutlined />,
    value: 'border-top-left-radius',
  },
  {
    icon: <RadiusBottomleftOutlined />,
    value: 'border-bottom-right-radius',
  },
  {
    icon: <RadiusBottomrightOutlined />,
    value: 'border-bottom-left-radius',
  },
]

export const BorderEditor = () => {
  const [selectedSide, setSelectedSide] = useState(Side.Top)
  const [selectedStyle, setSelectedStyle] = useState('none')

  return (
    <Col>
      <Row justify="space-between" wrap={false}>
        <Col span={8}>
          <BorderSidePicker onChange={setSelectedSide} side={selectedSide} />
        </Col>
        <Col className="w-full space-y-2" span={14}>
          <SegmentedSelect
            label="Style"
            onChange={setSelectedStyle}
            options={styleOptions}
            size="small"
            value={selectedStyle}
          />
          <ValuePicker label="Width" size="small" />
          <ColorPicker label="Color" size="small" />
        </Col>
      </Row>
      <Divider className="my-2 mt-3" />
      <BorderRadiusEditor />
    </Col>
  )
}
