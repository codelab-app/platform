import {
  BarcodeOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import { useState } from 'react'
import { LabeledSelect } from '../components/LabeledSelect'
import { SegmentedSelect } from '../components/SegmentedSelect'
import { ValuePicker } from '../components/ValuePicker'

const overFlowOptions = [
  {
    icon: <EyeOutlined />,
    value: 'visible',
  },
  {
    icon: <EyeInvisibleOutlined />,
    value: 'hidden',
  },
  {
    icon: <BarcodeOutlined />,
    value: 'scroll',
  },
  {
    label: 'Auto',
    value: 'auto',
  },
]

const fillOptions = [
  { label: 'Fill', value: 'fill' },
  { label: 'Contain', value: 'contain' },
  { label: 'Cover', value: 'cover' },
  { label: 'None', value: 'none' },
  { label: 'Scale Down', value: 'scale-down' },
]

export const SizeEditor = () => {
  const [overflow, setOverflow] = useState('visible')
  const [fill, setFill] = useState('fill')

  return (
    <Col className="space-y-3">
      <Col className="space-y-2">
        <Row justify="space-between" wrap={false}>
          <ValuePicker label="Width" />
          <ValuePicker label="Height" />
        </Row>
        <Row justify="space-between" wrap={false}>
          <ValuePicker label="Min W" />
          <ValuePicker label="Min H" />
        </Row>
        <Row justify="space-between" wrap={false}>
          <ValuePicker label="Max W" />
          <ValuePicker label="Max H" />
        </Row>
      </Col>
      <Divider className="my-2" />
      <SegmentedSelect
        label="Overflow"
        onChange={setOverflow}
        options={overFlowOptions}
        value={overflow}
      />
      <LabeledSelect
        label="Fit"
        onChange={setFill}
        options={fillOptions}
        value={fill}
      />
    </Col>
  )
}
