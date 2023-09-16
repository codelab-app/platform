import {
  BarcodeOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from '@ant-design/icons'
import { Col, Divider, Row } from 'antd'
import { LabeledSelect, SegmentedSelect, ValuePicker } from '../components'
import { CssProperty } from '../css'
import { useStyle } from '../style.hook'

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

  return (
    <Col className="space-y-3">
      <Col className="space-y-2">
        <Row className="space-x-3" justify="space-between" wrap={false}>
          <ValuePicker
            currentValue={getCurrentStyle(CssProperty.Width)}
            label="Width"
            onChange={(value) => setStyle(CssProperty.Width, value)}
          />
          <ValuePicker
            currentValue={getCurrentStyle(CssProperty.Height)}
            label="Height"
            onChange={(value) => setStyle(CssProperty.Height, value)}
          />
        </Row>
        <Row className="space-x-3" justify="space-between" wrap={false}>
          <ValuePicker
            currentValue={getCurrentStyle(CssProperty.MinWidth)}
            label="Min W"
            onChange={(value) => setStyle(CssProperty.MinWidth, value)}
          />
          <ValuePicker
            currentValue={getCurrentStyle(CssProperty.MinHeight)}
            label="Min H"
            onChange={(value) => setStyle(CssProperty.MinHeight, value)}
          />
        </Row>
        <Row className="space-x-3" justify="space-between" wrap={false}>
          <ValuePicker
            currentValue={getCurrentStyle(CssProperty.MaxWidth)}
            label="Max W"
            onChange={(value) => setStyle(CssProperty.MaxWidth, value)}
          />
          <ValuePicker
            currentValue={getCurrentStyle(CssProperty.MaxHeight)}
            label="Max H"
            onChange={(value) => setStyle(CssProperty.MaxHeight, value)}
          />
        </Row>
      </Col>
      <Divider className="my-2" />
      <SegmentedSelect
        label="Overflow"
        onChange={(val) => setStyle(CssProperty.Overflow, val)}
        options={overFlowOptions}
        value={getCurrentStyle(CssProperty.Overflow)}
      />
      <LabeledSelect
        label="Fit"
        onChange={(val) => setStyle(CssProperty.Fit, val)}
        options={fillOptions}
        value={getCurrentStyle(CssProperty.Fit)}
      />
    </Col>
  )
}
