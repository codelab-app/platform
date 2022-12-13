import { CssMap, IElement } from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { InputNumberWithUnits } from '../components/InputNumberWithUnits'
import {
  extractCssNumber,
  extractCssUnit,
  updateGuiCssProperty,
} from '../utils'

interface MarginsEditorProps {
  element: IElement
  guiCssObj: CssMap
}

const options = ['marginTop', 'marginRight', 'marginBottom', 'marginLeft']
const units = ['auto', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw']

export const MarginsEditor = observer(
  ({ element, guiCssObj }: MarginsEditorProps) => {
    return (
      <>
        {options.map((option, i) => (
          <InputNumberWithUnits
            currentUnit={extractCssUnit(guiCssObj[option] ?? '') ?? 'auto'}
            currentValue={extractCssNumber(guiCssObj[option] ?? '') ?? 0}
            disabled={
              (extractCssUnit(guiCssObj[option] ?? '') ?? 'auto') === 'auto'
            }
            name={option}
            onChange={(value, unit) =>
              updateGuiCssProperty(
                element,
                option,
              )(unit === 'auto' ? unit : `${value}${unit}`)
            }
            units={units}
          />
        ))}
      </>
    )
  },
)
