import { Col, InputNumber, Row, Select } from 'antd'
import { Option } from 'antd/lib/mentions'
import type { ReactNode } from 'react'
import React from 'react'

export enum ValuePickerUnit {
  PX = 'px',
  PERCENT = '%',
  REM = 'rem',
  EM = 'em',
  VW = 'vw',
  VH = 'vh',
  CH = 'ch',
  SVW = 'svw',
  SVH = 'svh',
}

const selectAfter = (
  <Select
    defaultValue={ValuePickerUnit.PX}
    dropdownStyle={{ width: 100 }}
    showArrow={false}
    size="small"
    style={{ width: 35 }}
  >
    <Option value={ValuePickerUnit.PX}>{ValuePickerUnit.PX}</Option>
    <Option value={ValuePickerUnit.PERCENT}>{ValuePickerUnit.PERCENT}</Option>
    <Option value={ValuePickerUnit.REM}>{ValuePickerUnit.REM}</Option>
    <Option value={ValuePickerUnit.EM}>{ValuePickerUnit.EM}</Option>
    <Option value={ValuePickerUnit.VW}>{ValuePickerUnit.VW}</Option>
    <Option value={ValuePickerUnit.VH}>{ValuePickerUnit.VH}</Option>
    <Option value={ValuePickerUnit.CH}>{ValuePickerUnit.CH}</Option>
    <Option value={ValuePickerUnit.SVW}>{ValuePickerUnit.SVW}</Option>
    <Option value={ValuePickerUnit.SVH}>{ValuePickerUnit.SVH}</Option>
  </Select>
)

interface ValuePickerProps {
  label?: string
  prefix?: ReactNode
  size?: 'large' | 'middle' | 'small'
  value?: number
  onChange?(value: number): void
}

export const ValuePicker = ({
  label,
  onChange,
  prefix,
  size,
  value,
}: ValuePickerProps) => {
  return (
    <Row
      align="middle"
      className="space-x-1"
      justify="space-between"
      wrap={false}
    >
      {label && <Col className="text-[12px]">{label}</Col>}
      <InputNumber
        addonAfter={selectAfter}
        addonBefore={prefix}
        controls={false}
        defaultValue={0}
        onChange={(val) => onChange?.(val || 0)}
        size={size}
        style={{ padding: 0, width: '100%' }}
        value={value}
      />
    </Row>
  )
}
