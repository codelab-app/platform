import { Col, ColorPicker as AntdColorPicker, Row } from 'antd'

interface ColorPickerProps {
  label?: string
  value?: string
  onChange?(value: string): void
}

export const ColorPicker = ({
  label = 'Color',
  onChange,
  value,
}: ColorPickerProps) => {
  return (
    <Row align="middle" justify="space-between" wrap={false}>
      <Col className="text-[12px]">{label}</Col>
      <AntdColorPicker
        onChange={(color) => onChange?.(color.toHexString())}
        showText={(color) => <span>{color.toHexString()}</span>}
        size="small"
        value={value}
      />
    </Row>
  )
}
