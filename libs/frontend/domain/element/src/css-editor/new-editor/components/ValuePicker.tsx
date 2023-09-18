import { Col, InputNumber, Row, Select } from 'antd'
import type { SizeType } from 'antd/lib/config-provider/SizeContext'
import { Option } from 'antd/lib/mentions'
import isNumber from 'lodash/isNumber'
import type { ReactNode } from 'react'
import React from 'react'
import { CssUnit, parseCssValue } from '../utils'
import { ResetLabel } from './ResetLabel'

// TODO: revisit auto and '-'
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
    onChange={(val) => onChange(val === '-' ? CssUnit.Auto : (val as CssUnit))}
    popupMatchSelectWidth={false}
    size={size}
    suffixIcon={null}
    value={fixedUnit ? fixedUnit : unit === CssUnit.Auto ? '-' : unit}
  >
    {!fixedUnit && (
      <>
        <Option value={CssUnit.PX}>{CssUnit.PX}</Option>
        <Option value={CssUnit.PERCENT}>{CssUnit.PERCENT}</Option>
        <Option value={CssUnit.REM}>{CssUnit.REM}</Option>
        <Option value={CssUnit.EM}>{CssUnit.EM}</Option>
        <Option value={CssUnit.VW}>{CssUnit.VW}</Option>
        <Option value={CssUnit.VH}>{CssUnit.VH}</Option>
        <Option value={CssUnit.CH}>{CssUnit.CH}</Option>
        <Option value={CssUnit.SVW}>{CssUnit.SVW}</Option>
        <Option value={CssUnit.SVH}>{CssUnit.SVH}</Option>
        <Option value={CssUnit.Auto}>{CssUnit.Auto}</Option>
      </>
    )}
  </Select>
)

interface ValuePickerProps {
  canReset?: boolean
  currentValue?: string
  fixedUnit?: CssUnit
  label?: string
  max?: number
  min?: number
  prefix?: ReactNode
  size?: SizeType
  onChange?(value: string): void
  onReset?(): unknown
}

export const ValuePicker = ({
  canReset,
  currentValue,
  fixedUnit,
  label,
  max,
  min,
  onChange,
  onReset,
  prefix,
  size,
}: ValuePickerProps) => {
  const { unit, value } = parseCssValue(currentValue ?? '0px')
  const isAuto = unit === CssUnit.Auto

  const onChanged = (selectedUnit?: CssUnit, val?: number | null) => {
    if (isNumber(val)) {
      // Unit was auto and now a value is entered
      if (selectedUnit === CssUnit.Auto) {
        onChange?.(`${val}${CssUnit.PX}`)
      } else {
        onChange?.(`${val}${selectedUnit}`)
      }
    } else {
      onChange?.(`${val}${selectedUnit}`)
    }
  }

  return (
    <Row align="middle" justify="space-between" wrap={false}>
      {label && (
        <Col span={8}>
          <ResetLabel canReset={canReset} label={label} onReset={onReset} />
        </Col>
      )}
      <Col className="w-full">
        <InputNumber
          addonAfter={selectAfter(
            size,
            (selectedUnit) => onChanged(selectedUnit, value),
            unit,
            fixedUnit,
          )}
          addonBefore={prefix}
          className="w-full p-0"
          controls={false}
          max={max}
          min={min}
          onChange={(val) => onChanged(unit, val)}
          placeholder={isAuto ? 'Auto' : undefined}
          size={size}
          value={isAuto ? undefined : value}
        />
      </Col>
    </Row>
  )
}
