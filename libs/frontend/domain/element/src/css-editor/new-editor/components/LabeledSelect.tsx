import { Col, Row, Select } from 'antd'

interface LabeledSelectProps {
  label?: string
  options: Array<{ label: string; value: string }>
  size?: 'large' | 'middle' | 'small'
  value?: string
  onChange?(value: string): void
}

export const LabeledSelect = ({
  label,
  onChange,
  options,
  size,
  value,
}: LabeledSelectProps) => {
  return (
    <Row align="middle" justify="space-between" wrap={false}>
      <Col className="text-[12px]">{label}</Col>
      <Col className="w-1/2">
        <Select
          className="text-[12px]"
          onChange={onChange}
          options={options}
          size={size}
          style={{ width: '100%' }}
          value={value}
        />
      </Col>
    </Row>
  )
}