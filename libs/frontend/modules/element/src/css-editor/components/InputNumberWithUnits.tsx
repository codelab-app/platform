import { InputNumber } from 'antd'
import { useCallback, useState } from 'react'
import { makeAddonAfterNumber } from '../utils'
import { CssPropEditorItem } from './CssPropEditorItem'

export const InputNumberWithUnits = ({
  name,
  currentValue,
  currentUnit,
  onValueChange,
  onUnitChange,
  onChange,
  units,
  min,
  max,
  step,
  disabled,
}: {
  name: string
  currentValue: number
  currentUnit?: string
  onValueChange?: (value: number) => void
  onUnitChange?: (unit: string) => void
  onChange?: (value: number, unit: string) => void
  units?: Array<string>
  min?: number
  max?: number
  step?: number
  disabled?: boolean
}) => {
  const [value, setValue] = useState<number>(currentValue)
  const [unit, setUnit] = useState<string>(currentUnit ?? '')

  const selectAfter = useCallback(
    (unitList: Array<string>) =>
      makeAddonAfterNumber(
        unitList.map((aUnit) => ({
          value: aUnit,
          title: aUnit,
        })),
        unit,
        (selectedUnit) => {
          onUnitChange?.(selectedUnit)
          onChange?.(value, selectedUnit)
          setUnit(selectedUnit)
        },
      ),
    [onUnitChange, onChange, unit, value],
  )

  return (
    <CssPropEditorItem title={name}>
      <InputNumber
        addonAfter={units ? selectAfter(units) : null}
        defaultValue={value}
        disabled={disabled}
        max={max}
        min={min}
        onChange={(e) => {
          onValueChange?.(e)
          onChange?.(e, unit)
          setValue(e)
        }}
        step={step}
        style={{ width: '100%' }}
      />
    </CssPropEditorItem>
  )
}
