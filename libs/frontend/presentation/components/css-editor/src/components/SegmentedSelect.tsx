import { Col, Row, Segmented } from 'antd'
import type { SegmentedLabeledOption, SegmentedValue } from 'antd/lib/segmented'
import React from 'react'
import { ResetLabel } from './ResetLabel'

interface SegmentedSelectProps {
  canReset?: boolean
  label?: string
  options: Array<SegmentedLabeledOption | SegmentedValue>
  size?: 'large' | 'middle' | 'small'
  value: string
  wideLabel?: boolean
  onChange?(value: string): void
  onReset?(): void
}

export const SegmentedSelect = ({
  canReset,
  label = '',
  onChange,
  onReset,
  options,
  size = 'middle',
  value,
  wideLabel,
}: SegmentedSelectProps) => {
  return (
    <Row
      align="middle"
      className="overflow-hidden"
      data-test-id="gui-display"
      justify="space-between"
      wrap={false}
    >
      <Col span={wideLabel ? 8 : 6}>
        {label && (
          <ResetLabel canReset={canReset} label={label} onReset={onReset} />
        )}
      </Col>
      <Col className="w-full">
        <Segmented
          block
          className="text-[11px]"
          onChange={(selected) => onChange?.(selected.toString())}
          options={options}
          size={size}
          style={{ border: '1px solid #d9d9d9' }}
          value={value}
        />
      </Col>
    </Row>
  )
}
