import { Input } from 'antd'
import { useState } from 'react'
import { CssPropEditorItem } from './CssPropEditorItem'

interface PropValueSelectorProps {
  checked?: boolean
  currentValue: string
  disabled?: boolean
  enableCheckbox?: boolean
  name: string

  onChange(val: string): undefined | void
  onCheck?(checked: boolean): void
}

export const ColorPicker = ({
  checked,
  currentValue,
  disabled,
  enableCheckbox,
  name,
  onChange,
  onCheck,
}: PropValueSelectorProps) => {
  const [color, setColor] = useState<string>(currentValue)

  return (
    <CssPropEditorItem
      checked={checked}
      enableCheckbox={enableCheckbox}
      onCheck={onCheck}
      title={name}
    >
      <Input
        defaultValue={color}
        disabled={disabled}
        onChange={(event) => {
          onChange(event.target.value)
          setColor(event.target.value)
        }}
        type="color"
        value={disabled ? '#D1D1D1' : color}
      />
    </CssPropEditorItem>
  )
}
