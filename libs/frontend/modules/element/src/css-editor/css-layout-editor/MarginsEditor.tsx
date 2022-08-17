import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { InputNumberWithUnits } from '../components/InputNumberWithUnits'
import {
  matchCssPropNumber,
  matchCssPropUnit,
  updateGuiCssProperty,
} from '../utils'

type MarginsEditorProps = {
  element: IElement
  guiCssObj: cssMap
}

const options = ['margin-top', 'margin-right', 'margin-bottom', 'margin-left']
const units = ['auto', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw']

export const MarginsEditor = observer(
  ({ element, guiCssObj }: MarginsEditorProps) => {
    return (
      <>
        {options.map((option, i) => (
          <InputNumberWithUnits
            currentUnit={matchCssPropUnit(guiCssObj[option] ?? '') ?? 'auto'}
            currentValue={matchCssPropNumber(guiCssObj[option] ?? '') ?? 0}
            disabled={
              (matchCssPropUnit(guiCssObj[option] ?? '') ?? 'auto') === 'auto'
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
