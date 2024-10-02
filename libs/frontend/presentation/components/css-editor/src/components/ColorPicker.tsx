import { ColorPicker as AntdColorPicker, Col, Row } from 'antd'

import { ResetLabel } from './ResetLabel'

interface ColorPickerProps {
  canReset?: boolean
  label?: string
  size?: 'large' | 'middle' | 'small'
  value?: string
  onChange?(value: string): void
  onReset?(): unknown
}

export const ColorPicker = ({
  canReset,
  label = 'Color',
  onChange,
  onReset,
  size,
  value,
}: ColorPickerProps) => {
  return (
    <Row align="middle" justify="space-between" wrap={false}>
      <Col span={6}>
        <ResetLabel canReset={canReset} label={label} onReset={onReset} />
      </Col>
      <Col className="w-full">
        <AntdColorPicker
          allowClear={true}
          className="w-full justify-start"
          onChange={(color) => onChange?.(color.toHexString())}
          onClear={() => onChange?.('transparent')}
          showText={(color) => <span>{color.toHexString()}</span>}
          size={size}
          value={value}
        />
      </Col>
    </Row>
  )
}
