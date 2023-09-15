import { Col, ColorPicker as AntdColorPicker, Row } from 'antd'

interface ColorPickerProps {
  label?: string
  size?: 'large' | 'middle' | 'small'
  value?: string
  onChange?(value: string): void
}

export const ColorPicker = ({
  label = 'Color',
  onChange,
  size,
  value,
}: ColorPickerProps) => {
  return (
    <Row align="middle" justify="space-between" wrap={false}>
      <Col className="text-[12px]" span={8}>
        {label}
      </Col>
      <Col className="w-full">
        <AntdColorPicker
          className="w-full justify-start"
          onChange={(color) => onChange?.(color.toHexString())}
          showText={(color) => <span>{color.toHexString()}</span>}
          size={size}
          value={value}
        />
      </Col>
    </Row>
  )
}
