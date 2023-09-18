import { LabeledSelect } from '../components'
import { ColorPicker } from '../components/ColorPicker'
import { CssProperty } from '../css'
import { useStyle } from '../style.hook'

const clippingOptions = [
  { label: 'None', value: 'border-box' },
  { label: 'Clip Background to Padding', value: 'padding-box' },
  { label: 'Clip Background to Content', value: 'content-box' },
  { label: 'Clip Background to Text', value: 'text' },
]

export const BackgroundEditor = () => {
  const { canReset, getCurrentStyle, resetStyle, setStyle } = useStyle()

  return (
    <div className="space-y-2">
      <ColorPicker
        onChange={(val) => setStyle(CssProperty.BackgroundColor, val)}
        value={getCurrentStyle(CssProperty.BackgroundColor)}
      />
      <LabeledSelect
        canReset={canReset(CssProperty.BackgroundClip)}
        label="Clipping"
        onChange={(val) => setStyle(CssProperty.BackgroundClip, val)}
        onReset={() => resetStyle(CssProperty.BackgroundClip)}
        options={clippingOptions}
        value={getCurrentStyle(CssProperty.BackgroundClip)}
      />
    </div>
  )
}
