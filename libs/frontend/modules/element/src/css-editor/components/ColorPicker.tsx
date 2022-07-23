import { Input } from 'antd'
import { useEffect, useState } from 'react'
import { CssPropEditorItem } from './CssPropEditorItem'

type PropValueSelectorProps = {
  name: string
  currentValue: string
  onChange: (val: string) => void | undefined
  disabled?: boolean
}

export const ColorPicker = ({
  name,
  currentValue,
  onChange,
  disabled,
}: PropValueSelectorProps) => {
  const [color, setColor] = useState<string>(currentValue)

  useEffect(() => {
    onChange(color)
  }, [color, onChange])

  return (
    <CssPropEditorItem title={name}>
      <Input
        disabled={disabled}
        onChange={(e) => setColor(e.target.value)}
        type="color"
        value={color}
      />
    </CssPropEditorItem>
  )
}
