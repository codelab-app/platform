import { useState } from 'react'
import { LabeledSelect } from '../components'
import { ColorPicker } from '../components/ColorPicker'

const clippingOptions = [
  { label: 'None', value: 'border-box' },
  { label: 'Clip Background to Padding', value: 'padding-box' },
  { label: 'Clip Background to Content', value: 'content-box' },
  { label: 'Clip Background to Text', value: 'text' },
]

export const BackgroundEditor = () => {
  const [color, setColor] = useState('#fff')
  const [clipping, setClipping] = useState('border-box')

  return (
    <div className="space-y-2">
      <ColorPicker onChange={setColor} value={color} />
      <LabeledSelect
        label="Clipping"
        onChange={setClipping}
        options={clippingOptions}
        value={clipping}
      />
    </div>
  )
}
