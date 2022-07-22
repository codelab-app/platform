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
const units = ['px', '%', 'em', 'rem', 'ch', 'vh', 'vw']

export const MarginsEditor = observer(
  ({ element, guiCssObj }: MarginsEditorProps) => {
    return (
      <>
        {options.map((option, i) => (
          <InputNumberWithUnits
            currentUnit={matchCssPropUnit(guiCssObj[option] ?? '') ?? 'px'}
            currentValue={matchCssPropNumber(guiCssObj[option] ?? '') ?? 0}
            name={option}
            onChange={(value, unit) =>
              updateGuiCssProperty(element, option)(`${value}${unit}`)
            }
            units={units}
          />
        ))}
      </>
    )
  },
)
