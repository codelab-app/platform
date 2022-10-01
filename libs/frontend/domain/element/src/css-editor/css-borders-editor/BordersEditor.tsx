import { CssMap, IElement } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CssPropValueSelector } from '../components'
import { ColorPicker } from '../components/ColorPicker'
import { InputNumberWithUnits } from '../components/InputNumberWithUnits'
import {
  extractCssNumber,
  extractCssUnit,
  updateGuiCssProperty,
} from '../utils'

interface BordersEditorProps {
  element: IElement
  guiCssObj: CssMap
}

const props = [
  {
    name: 'borderBottomWidth',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'borderBottomStyle',
    type: 'select',
    options: ['unset', 'solid', 'dashed', 'dotted', 'double'],
  },
  {
    name: 'borderBottomColor',
    type: 'color-picker',
  },
  {
    name: 'borderLeftWidth',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'borderLeftStyle',
    type: 'select',
    options: ['unset', 'solid', 'dashed', 'dotted', 'double'],
  },
  {
    name: 'borderLeftColor',
    type: 'color-picker',
  },
  {
    name: 'borderRightWidth',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'borderRightStyle',
    type: 'select',
    options: ['unset', 'solid', 'dashed', 'dotted', 'double'],
  },
  {
    name: 'borderRightColor',
    type: 'color-picker',
  },
  {
    name: 'borderTopWidth',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'borderTopStyle',
    type: 'select',
    options: ['unset', 'solid', 'dashed', 'dotted', 'double'],
  },
  {
    name: 'borderTopColor',
    type: 'color-picker',
  },
  {
    name: 'borderTopLeftRadius',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'borderTopRightRadius',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'borderBottomLeftRadius',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'borderBottomRightRadius',
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
              currentUnit={extractCssUnit(guiCssObj[name] ?? '') ?? 'unset'}
              currentValue={extractCssNumber(guiCssObj[name] ?? '') ?? 0}
              disabled={
                (extractCssUnit(guiCssObj[name] ?? '') ?? 'unset') === 'unset'
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
