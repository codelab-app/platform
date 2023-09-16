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
      <Col className="text-[12px]" span={8}>
        {label}
      </Col>
      <Col className="w-full overflow-hidden">
        <Select
          onChange={onChange}
          options={options}
          popupMatchSelectWidth={false}
          size={size}
          style={{ width: '100%' }}
          value={value}
        />
      </Col>
    </Row>
  )
}
