import { InputNumber } from 'antd'
import { useCallback, useState } from 'react'
import { makeAddonAfterNumber } from '../utils'
import { CssPropEditorItem } from './CssPropEditorItem'

interface InputNumberWithUnitsProps {
  checked?: boolean
  currentUnit?: string
  currentValue: number
  disabled?: boolean
  enableCheckBox?: boolean
  max?: number
  min?: number
  name: string
  step?: number
  units?: Array<string>
  onChange?(value: number, unit: string): void
  onCheck?(checked: boolean): void
  onUnitChange?(unit: string): void
  onValueChange?(value: number): void
}

export const InputNumberWithUnits = ({
  checked,
  currentUnit,
  currentValue,
  disabled,
  enableCheckBox,
  max,
  min,
  name,
  onChange,
  onCheck,
  onUnitChange,
  onValueChange,
  step,
  units,
}: InputNumberWithUnitsProps) => {
  const [value, setValue] = useState<number>(currentValue)
  const [unit, setUnit] = useState<string>(currentUnit ?? '')

  const selectAfter = useCallback(
    (unitList: Array<string>) =>
      makeAddonAfterNumber(
        unitList.map((aUnit) => ({
          title: aUnit,
          value: aUnit,
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
    <CssPropEditorItem
      checked={checked}
      enableCheckbox={enableCheckBox}
      onCheck={onCheck}
      title={name}
    >
      <InputNumber
        addonAfter={units ? selectAfter(units) : null}
        defaultValue={value}
        disabled={disabled}
        max={max}
        min={min}
        onChange={(event) => {
          if (event === null) {
            return
          }

          onValueChange?.(event)
          onChange?.(event, unit)
          setValue(event)
        }}
        step={step}
        style={{ width: '100%' }}
      />
    </CssPropEditorItem>
  )
}
