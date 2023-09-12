import {
  AlignCenterOutlined,
  AlignLeftOutlined,
  AlignRightOutlined,
  CloseOutlined,
  FontColorsOutlined,
  ItalicOutlined,
  StrikethroughOutlined,
  UnderlineOutlined,
} from '@ant-design/icons'
import { Col, ColorPicker, Row } from 'antd'
import { useState } from 'react'
import { LabeledSelect, SegmentedSelect, ValuePicker } from '../components'

const fontOptions = [
  { label: 'Arial', value: 'Arial' },
  { label: 'Helvetica', value: 'Helvetica' },
  { label: 'Times New Roman', value: 'Times New Roman' },
  { label: 'Times', value: 'Times' },
  { label: 'Courier New', value: 'Courier New' },
  { label: 'Courier', value: 'Courier' },
  { label: 'Verdana', value: 'Verdana' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Palatino', value: 'Palatino' },
]

const weightOptions = [
  { label: '100 - Thin', value: '100' },
  { label: '200 - Extra Light', value: '200' },
  { label: '300 - Light', value: '300' },
  { label: '400 - Normal', value: '400' },
  { label: '500 - Medium', value: '500' },
  { label: '600 - Semi Bold', value: '600' },
  { label: '700 - Bold', value: '700' },
  { label: '800 - Extra Bold', value: '800' },
  { label: '900 - Black', value: '900' },
]

const alignOptions = [
  { icon: <AlignLeftOutlined />, value: 'left' },
  { icon: <AlignCenterOutlined />, value: 'center' },
  { icon: <AlignRightOutlined />, value: 'right' },
  // TODO: revisit icons
  { icon: <AlignLeftOutlined />, value: 'justify' },
]

const italicizeOptions = [
  // TODO: revisit icons
  { icon: <FontColorsOutlined />, value: 'normal' },
  {
    icon: <ItalicOutlined />,
    value: 'italic',
  },
]

const decorationOptions = [
  { icon: <CloseOutlined />, value: 'none' },
  {
    icon: <StrikethroughOutlined />,
    value: 'line-through',
  },
  {
    icon: <UnderlineOutlined />,
    value: 'underline',
  },
  {
    icon: <FontColorsOutlined />,
    value: 'overline',
  },
]

export const TypographyEditor = () => {
  const [font, setFont] = useState('Arial')
  const [weight, setWeight] = useState('400')
  const [align, setAlign] = useState('left')
  const [italicize, setItalicize] = useState('normal')
  const [decoration, setDecoration] = useState('none')

  return (
    <Col className="space-y-2">
      <LabeledSelect
        label="Font"
        onChange={setFont}
        options={fontOptions}
        value={font}
      />
      <LabeledSelect
        label="Weight"
        onChange={setWeight}
        options={weightOptions}
        value={weight}
      />
      <Row align="middle" justify="space-between" wrap={false}>
        <ValuePicker label="Size" />
        <ValuePicker label="Height" />
      </Row>
      <Row align="middle" justify="space-between" wrap={false}>
        <Col className="text-[12px]">Color</Col>
        <ColorPicker
          showText={(color) => <span>{color.toHexString()}</span>}
          size="small"
        />
      </Row>
      <SegmentedSelect
        label="Align"
        onChange={setAlign}
        options={alignOptions}
        value={align}
      />
      <SegmentedSelect
        label="Italicize"
        onChange={setItalicize}
        options={italicizeOptions}
        value={italicize}
      />
      <SegmentedSelect
        label="Decoration"
        onChange={setDecoration}
        options={decorationOptions}
        value={decoration}
      />
    </Col>
  )
}
