import type { CssMap, IElement } from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { InputNumberWithUnits } from '../components/InputNumberWithUnits'
import { extractCssNumber, updateGuiCssProperty } from '../utils'

interface EffectsEditorProps {
  element: IElement
  guiCssObj: CssMap
}

const effects = [
  {
    name: 'opacity',
    min: 0,
    max: 1,
    step: 0.1,
    defaultValue: 1,
  },
]

export const EffectsEditor = observer(
  ({ element, guiCssObj }: EffectsEditorProps) => {
    return (
      <>
        {effects.map((effect) => (
          <InputNumberWithUnits
            currentValue={
              extractCssNumber(guiCssObj[effect.name] ?? '') ??
              effect.defaultValue
            }
            max={effect.max}
            min={effect.min}
            name={effect.name}
            onChange={(value) =>
              updateGuiCssProperty(element, effect.name)(`${value}`)
            }
            step={effect.step}
          />
        ))}
      </>
    )
  },
)
