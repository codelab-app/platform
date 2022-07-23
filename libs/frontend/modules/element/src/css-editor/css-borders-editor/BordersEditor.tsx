import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CssPropValueSelector } from '../components'
import { ColorPicker } from '../components/ColorPicker'
import { InputNumberWithUnits } from '../components/InputNumberWithUnits'
import {
  matchCssPropNumber,
  matchCssPropUnit,
  updateGuiCssProperty,
} from '../utils'

type BordersEditorProps = {
  element: IElement
  guiCssObj: cssMap
}

const props = [
  {
    name: 'border-bottom-width',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'border-bottom-style',
    type: 'select',
    options: ['unset', 'solid', 'dashed', 'dotted', 'double'],
  },
  {
    name: 'border-bottom-color',
    type: 'color-picker',
  },
  {
    name: 'border-left-width',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'border-left-style',
    type: 'select',
    options: ['unset', 'solid', 'dashed', 'dotted', 'double'],
  },
  {
    name: 'border-left-color',
    type: 'color-picker',
  },
  {
    name: 'border-right-width',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'border-right-style',
    type: 'select',
    options: ['unset', 'solid', 'dashed', 'dotted', 'double'],
  },
  {
    name: 'border-right-color',
    type: 'color-picker',
  },
  {
    name: 'border-top-width',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'border-top-style',
    type: 'select',
    options: ['unset', 'solid', 'dashed', 'dotted', 'double'],
  },
  {
    name: 'border-top-color',
    type: 'color-picker',
  },
  {
    name: 'border-top-left-radius',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'border-top-right-radius',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'border-bottom-left-radius',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'border-bottom-right-radius',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
]

export const BordersEditor = observer(
  ({ element, guiCssObj }: BordersEditorProps) => {
    return (
      <>
        {props.map(({ name, type, options, units }) =>
          type === 'select' ? (
            <CssPropValueSelector
              currentValue={guiCssObj[name] ?? 'unset'}
              name={name}
              onClick={updateGuiCssProperty(element, name)}
              options={options ?? []}
            />
          ) : type === 'input-number-with-unit' ? (
            <InputNumberWithUnits
              currentUnit={matchCssPropUnit(guiCssObj[name] ?? '') ?? 'unset'}
              currentValue={matchCssPropNumber(guiCssObj[name] ?? '') ?? 0}
              disabled={
                (matchCssPropUnit(guiCssObj[name] ?? '') ?? 'unset') === 'unset'
              }
              name={name}
              onChange={(value, unit) =>
                updateGuiCssProperty(
                  element,
                  name,
                )(unit === 'unset' ? `${unit}` : `${value}${unit}`)
              }
              units={units ?? []}
            />
          ) : (
            <ColorPicker
              currentValue={guiCssObj[name]}
              name={name}
              onChange={updateGuiCssProperty(element, name)}
            />
          ),
        )}
      </>
    )
  },
)
