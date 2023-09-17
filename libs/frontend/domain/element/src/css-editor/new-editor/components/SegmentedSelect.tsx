import { Col, ConfigProvider, Row, Segmented } from 'antd'
import type { SegmentedLabeledOption, SegmentedValue } from 'antd/lib/segmented'
import { ResetLabel } from './ResetLabel'

interface SegmentedSelectProps {
  canReset?: boolean
  disableAnimation?: boolean
  label?: string
  options: Array<SegmentedLabeledOption | SegmentedValue>
  size?: 'large' | 'middle' | 'small'
  value: string
  onChange?(value: string): void
  onReset?(): void
}

export const SegmentedSelect = ({
  canReset,
  disableAnimation = true,
  label = '',
  onChange,
  onReset,
  options,
  size = 'middle',
  value,
}: SegmentedSelectProps) => {
  return (
    <Row align="middle" justify="space-between" wrap={false}>
      <Col>
        {label && (
          <ResetLabel canReset={canReset} label={label} onReset={onReset} />
        )}
      </Col>
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
            className="text-[12px]"
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
