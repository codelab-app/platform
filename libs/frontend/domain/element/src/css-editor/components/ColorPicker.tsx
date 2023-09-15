import { Input } from 'antd'
import { useState } from 'react'
import { CssPropEditorItem } from './CssPropEditorItem'

interface PropValueSelectorProps {
  name: string
  currentValue: string
  onChange(val: string): undefined | void
  disabled?: boolean
  checked?: boolean
  enableCheckbox?: boolean
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
        onChange={(e) => {
          onChange(e.target.value)
          setColor(e.target.value)
        }}
        type="color"
        value={disabled ? '#D1D1D1' : color}
      />
    </CssPropEditorItem>
  )
}
