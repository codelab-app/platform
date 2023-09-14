import {
  MinusCircleOutlined,
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusSettingOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from '@ant-design/icons'
import { Col, Row, Slider } from 'antd'
import React, { useState } from 'react'
import { SegmentedSelect, ValuePicker } from '../components'

const sideOptions = [
  {
    // TODO: revisit icons
    icon: <MinusCircleOutlined />,
    value: 'all',
  },
  {
    icon: <RadiusSettingOutlined />,
    value: 'side',
  },
]

export const BorderRadiusEditor = () => {
  const [selectedSide, setSelectedSide] = useState('all')

  return (
    <div className="space-y-2">
      <Row
        align="middle"
        className="w-full"
        justify="space-between"
        wrap={false}
      >
        <Col span={10}>
          <Row justify="space-between" wrap={false}>
            <Col>Radius</Col>
            <SegmentedSelect
              onChange={setSelectedSide}
              options={sideOptions}
              size="small"
              value={selectedSide}
            />
          </Row>
        </Col>
        <Col span={12}>
          <Row align="middle" justify="space-between" wrap={false}>
            <Col span={12}>
              <Slider max={300} min={0} onChange={undefined} value={0} />
            </Col>
            <ValuePicker onChange={undefined} />
          </Row>
        </Col>
      </Row>
      {selectedSide === 'side' && (
        <Col className="space-y-2">
          <Row align="middle" className="space-x-2" justify="end" wrap={false}>
            <ValuePicker prefix={<RadiusUpleftOutlined />} />
            <ValuePicker prefix={<RadiusUprightOutlined />} />
          </Row>
          <Row align="middle" className="space-x-2" justify="end" wrap={false}>
            <ValuePicker prefix={<RadiusBottomleftOutlined />} />
            <ValuePicker prefix={<RadiusBottomrightOutlined />} />
          </Row>
        </Col>
      )}
    </div>
  )
}
