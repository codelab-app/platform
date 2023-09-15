import { Col, InputNumber, Row, Select } from 'antd'
import type { SizeType } from 'antd/lib/config-provider/SizeContext'
import { Option } from 'antd/lib/mentions'
import type { ReactNode } from 'react'
import React from 'react'
import { CssUnit, parseCssValue } from '../utils'

const selectAfter = (
  size: SizeType,
  onChange: (val: CssUnit) => void,
  unit?: CssUnit,
) => (
  <Select
    defaultValue={CssUnit.PX}
    dropdownStyle={{ width: 100 }}
    onChange={(val) => onChange(val)}
    size={size}
    style={{ width: 35 }}
    suffixIcon={null}
    value={unit}
  >
    <Option value={CssUnit.Autio}>-</Option>
    <Option value={CssUnit.PX}>{CssUnit.PX}</Option>
    <Option value={CssUnit.PERCENT}>{CssUnit.PERCENT}</Option>
    <Option value={CssUnit.REM}>{CssUnit.REM}</Option>
    <Option value={CssUnit.EM}>{CssUnit.EM}</Option>
    <Option value={CssUnit.VW}>{CssUnit.VW}</Option>
    <Option value={CssUnit.VH}>{CssUnit.VH}</Option>
    <Option value={CssUnit.CH}>{CssUnit.CH}</Option>
    <Option value={CssUnit.SVW}>{CssUnit.SVW}</Option>
    <Option value={CssUnit.SVH}>{CssUnit.SVH}</Option>
  </Select>
)

interface ValuePickerProps {
  currentValue?: string
  label?: string
  prefix?: ReactNode
  size?: SizeType
  onChange?(value: string): void
}

export const ValuePicker = ({
  currentValue,
  label,
  onChange,
  prefix,
  size,
}: ValuePickerProps) => {
  const { unit, value } = parseCssValue(currentValue ?? '0px')

  return (
    <Row
      align="middle"
      className="space-x-1"
      justify="space-between"
      wrap={false}
    >
      {label && (
        <Col className="whitespace-nowrap text-[12px]" span={8}>
          {label}
        </Col>
      )}
      <Col>
        <InputNumber
          addonAfter={selectAfter(
            size,
            (selectedUnit) => onChange?.(`${value}${selectedUnit}`),
            unit,
          )}
          addonBefore={prefix}
          controls={false}
          defaultValue={0}
          onChange={(val) => onChange?.(`${val ?? 0}${unit}`)}
          size={size}
          style={{ padding: 0, width: '100%' }}
          value={value}
        />
      </Col>
    </Row>
  )
}
