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
  fixedUnit?: CssUnit,
) => (
  <Select
    className="[&>*:first-child]:!px-0.5"
    defaultValue={fixedUnit ?? CssUnit.PX}
    disabled={Boolean(fixedUnit)}
    onChange={(val) => onChange(val)}
    popupMatchSelectWidth={false}
    size={size}
    suffixIcon={null}
    value={fixedUnit ?? unit}
  >
    {!fixedUnit && (
      <>
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
      </>
    )}
  </Select>
)

interface ValuePickerProps {
  currentValue?: string
  fixedUnit?: CssUnit
  label?: string
  max?: number
  min?: number
  prefix?: ReactNode
  size?: SizeType
  onChange?(value: string): void
}

export const ValuePicker = ({
  currentValue,
  fixedUnit,
  label,
  max,
  min,
  onChange,
  prefix,
  size,
}: ValuePickerProps) => {
  const { unit, value } = parseCssValue(currentValue ?? '0px')

  return (
    <Row align="middle" justify="space-between" wrap={false}>
      {label && (
        <Col className="whitespace-nowrap text-[12px]" span={8}>
          {label}
        </Col>
      )}
      <Col className="w-full">
        <InputNumber
          addonAfter={selectAfter(
            size,
            (selectedUnit) => onChange?.(`${value}${selectedUnit}`),
            unit,
            fixedUnit,
          )}
          addonBefore={prefix}
          className="w-full p-0"
          controls={false}
          defaultValue={0}
          max={max}
          min={min}
          onChange={(val) => onChange?.(`${val ?? 0}${unit}`)}
          size={size}
          value={value}
        />
      </Col>
    </Row>
  )
}
