import { Col, InputNumber, Row, Select } from 'antd'
import type { SizeType } from 'antd/lib/config-provider/SizeContext'
import debounce from 'lodash/debounce'
import isNumber from 'lodash/isNumber'
import type { ReactNode } from 'react'
import React from 'react'
import { CssUnit, parseCssValue } from '../utils'
import { ResetLabel } from './ResetLabel'

const selectAfter = (
  size: SizeType,
  onChange: (val: CssUnit) => void,
  unit?: CssUnit,
  fixedUnit?: CssUnit,
) => (
  <Select
    className="[&>*:first-child]:!px-0.5 [&>*:first-child]:!text-[11px]"
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
        <Select.Option className="!text-[11px]" value={CssUnit.PX}>
          {CssUnit.PX}
        </Select.Option>
        <Select.Option className="!text-[11px]" value={CssUnit.PERCENT}>
          {CssUnit.PERCENT}
        </Select.Option>
        <Select.Option className="!text-[11px]" value={CssUnit.REM}>
          {CssUnit.REM}
        </Select.Option>
        <Select.Option className="!text-[11px]" value={CssUnit.EM}>
          {CssUnit.EM}
        </Select.Option>
        <Select.Option className="!text-[11px]" value={CssUnit.VW}>
          {CssUnit.VW}
        </Select.Option>
        <Select.Option className="!text-[11px]" value={CssUnit.VH}>
          {CssUnit.VH}
        </Select.Option>
        <Select.Option className="!text-[11px]" value={CssUnit.CH}>
          {CssUnit.CH}
        </Select.Option>
        <Select.Option className="!text-[11px]" value={CssUnit.SVW}>
          {CssUnit.SVW}
        </Select.Option>
        <Select.Option className="!text-[11px]" value={CssUnit.SVH}>
          {CssUnit.SVH}
        </Select.Option>
        <Select.Option className="!text-[11px]" value={CssUnit.Auto}>
          {CssUnit.Auto}
        </Select.Option>
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
  wideLabel?: boolean
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
  wideLabel,
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
        <Col span={wideLabel ? 8 : 6}>
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
          onChange={debounce((val) => onChanged(fixedUnit ?? unit, val), 300)}
          placeholder={isAuto ? 'Auto' : undefined}
          size={size}
          value={isAuto ? undefined : value}
        />
      </Col>
    </Row>
  )
}
