import { Col, Row, Select } from 'antd'
import { ResetLabel } from './ResetLabel'

interface LabeledSelectProps {
  canReset?: boolean
  label?: string
  options: Array<{ label: string; value: string }>
  size?: 'large' | 'middle' | 'small'
  value?: string
  onChange?(value: string): void
  onReset?(): unknown
}

export const LabeledSelect = ({
  canReset,
  label,
  onChange,
  onReset,
  options,
  size,
  value,
}: LabeledSelectProps) => {
  return (
    <Row align="middle" justify="space-between" wrap={false}>
      <Col span={6}>
        {label && (
          <ResetLabel canReset={canReset} label={label} onReset={onReset} />
        )}
      </Col>
      <Col className="w-full overflow-hidden">
        <Select
          className="w-full"
          onChange={onChange}
          options={options}
          popupMatchSelectWidth={false}
          size={size}
          value={value}
        />
      </Col>
    </Row>
  )
}
