import { Col, ConfigProvider, Row, Segmented } from 'antd'
import type { SegmentedLabeledOption, SegmentedValue } from 'antd/lib/segmented'

interface SegmentedSelectProps {
  disableAnimation?: boolean
  label?: string
  options: Array<SegmentedLabeledOption | SegmentedValue>
  size?: 'large' | 'middle' | 'small'
  value: string
  onChange?(value: string): void
}

export const SegmentedSelect = ({
  disableAnimation = true,
  label = '',
  onChange,
  options,
  size = 'middle',
  value,
}: SegmentedSelectProps) => {
  return (
    <Row align="middle" justify="space-between" wrap={false}>
      <Col className="text-[12px]">{label}</Col>
      <Col>
        <ConfigProvider
          theme={{
            token: disableAnimation
              ? {
                  motionUnit: 0,
                }
              : undefined,
          }}
        >
          <Segmented
            onChange={(selected) => onChange?.(selected.toString())}
            options={options}
            size={size}
            style={{ border: '1px solid #d9d9d9' }}
            value={value}
          />
        </ConfigProvider>
      </Col>
    </Row>
  )
}
