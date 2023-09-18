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
  const { canReset, getCurrentStyle, resetStyle, setStyle } = useStyle()

  return (
    <Col className="space-y-3">
      <Col className="space-y-2">
        <Row className="space-x-3" justify="space-between" wrap={false}>
          <ValuePicker
            canReset={canReset(CssProperty.Width)}
            currentValue={getCurrentStyle(CssProperty.Width)}
            label="Width"
            onChange={(value) => setStyle(CssProperty.Width, value)}
            onReset={() => resetStyle(CssProperty.Width)}
          />
          <ValuePicker
            canReset={canReset(CssProperty.Height)}
            currentValue={getCurrentStyle(CssProperty.Height)}
            label="Height"
            onChange={(value) => setStyle(CssProperty.Height, value)}
            onReset={() => resetStyle(CssProperty.Height)}
          />
        </Row>
        <Row className="space-x-3" justify="space-between" wrap={false}>
          <ValuePicker
            canReset={canReset(CssProperty.MinWidth)}
            currentValue={getCurrentStyle(CssProperty.MinWidth)}
            label="Min W"
            onChange={(value) => setStyle(CssProperty.MinWidth, value)}
            onReset={() => resetStyle(CssProperty.MinWidth)}
          />
          <ValuePicker
            canReset={canReset(CssProperty.MinHeight)}
            currentValue={getCurrentStyle(CssProperty.MinHeight)}
            label="Min H"
            onChange={(value) => setStyle(CssProperty.MinHeight, value)}
            onReset={() => resetStyle(CssProperty.MinHeight)}
          />
        </Row>
        <Row className="space-x-3" justify="space-between" wrap={false}>
          <ValuePicker
            canReset={canReset(CssProperty.MaxWidth)}
            currentValue={getCurrentStyle(CssProperty.MaxWidth)}
            label="Max W"
            onChange={(value) => setStyle(CssProperty.MaxWidth, value)}
            onReset={() => resetStyle(CssProperty.MaxWidth)}
          />
          <ValuePicker
            canReset={canReset(CssProperty.MaxHeight)}
            currentValue={getCurrentStyle(CssProperty.MaxHeight)}
            label="Max H"
            onChange={(value) => setStyle(CssProperty.MaxHeight, value)}
            onReset={() => resetStyle(CssProperty.MaxHeight)}
          />
        </Row>
      </Col>
      <Divider className="my-2" />
      <SegmentedSelect
        canReset={canReset(CssProperty.Overflow)}
        label="Overflow"
        onChange={(val) => setStyle(CssProperty.Overflow, val)}
        onReset={() => resetStyle(CssProperty.Overflow)}
        options={overFlowOptions}
        value={getCurrentStyle(CssProperty.Overflow)}
      />
      <LabeledSelect
        canReset={canReset(CssProperty.Fit)}
        label="Fit"
        onChange={(val) => setStyle(CssProperty.Fit, val)}
        onReset={() => resetStyle(CssProperty.Fit)}
        options={fillOptions}
        value={getCurrentStyle(CssProperty.Fit)}
      />
    </Col>
  )
}
