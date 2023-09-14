import {
  BarcodeOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import { useState } from 'react'
import { LabeledSelect, SegmentedSelect, ValuePicker } from '../components'
import { useStyle } from '../style.hook'
import { DefaultSizeProperties, SizeProperty } from './properties'

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
  const { getCurrentStyle, setStyle } = useStyle()
  const [overflow, setOverflow] = useState('visible')
  const [fill, setFill] = useState('fill')

  return (
    <Col className="space-y-3">
      <Col className="space-y-2">
        <Row justify="space-between" wrap={false}>
          <ValuePicker
            currentValue={getCurrentStyle(
              DefaultSizeProperties[SizeProperty.Width],
            )}
            label="Width"
            onChange={(value) => setStyle(SizeProperty.Width, value)}
          />
          <ValuePicker
            currentValue={getCurrentStyle(
              DefaultSizeProperties[SizeProperty.Height],
            )}
            label="Height"
            onChange={(value) => setStyle(SizeProperty.Height, value)}
          />
        </Row>
        <Row justify="space-between" wrap={false}>
          <ValuePicker
            currentValue={getCurrentStyle(
              DefaultSizeProperties[SizeProperty.MinWidth],
            )}
            label="Min W"
            onChange={(value) => setStyle(SizeProperty.MinWidth, value)}
          />
          <ValuePicker
            currentValue={getCurrentStyle(
              DefaultSizeProperties[SizeProperty.MinHeight],
            )}
            label="Min H"
            onChange={(value) => setStyle(SizeProperty.MinHeight, value)}
          />
        </Row>
        <Row justify="space-between" wrap={false}>
          <ValuePicker
            currentValue={getCurrentStyle(
              DefaultSizeProperties[SizeProperty.MaxWidth],
            )}
            label="Max W"
            onChange={(value) => setStyle(SizeProperty.MaxWidth, value)}
          />
          <ValuePicker
            currentValue={getCurrentStyle(
              DefaultSizeProperties[SizeProperty.MaxHeight],
            )}
            label="Max H"
            onChange={(value) => setStyle(SizeProperty.MaxHeight, value)}
          />
        </Row>
      </Col>
      <Divider className="my-2" />
      <SegmentedSelect
        label="Overflow"
        onChange={(val) => setStyle(SizeProperty.Overflow, val)}
        options={overFlowOptions}
        value={getCurrentStyle(DefaultSizeProperties[SizeProperty.Overflow])}
      />
      <LabeledSelect
        label="Fit"
        onChange={(val) => setStyle(SizeProperty.Fit, val)}
        options={fillOptions}
        value={getCurrentStyle(DefaultSizeProperties[SizeProperty.Fit])}
      />
    </Col>
  )
}
