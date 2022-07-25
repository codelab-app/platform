import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { InputNumberWithUnits } from '../components/InputNumberWithUnits'
import {
  matchCssPropNumber,
  matchCssPropUnit,
  updateGuiCssProperty,
} from '../utils'

type SizeEditorProps = {
  element: IElement
  guiCssObj: cssMap
}

const options = [
  'width',
  'height',
  'minWidth',
  'minHeight',
  'maxWidth',
  'maxHeight',
]

const units = ['auto', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw']

export const SizeEditor = observer(
  ({ element, guiCssObj }: SizeEditorProps) => (
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
  ),
)
