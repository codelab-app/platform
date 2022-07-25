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

type TypographyEditorProps = {
  element: IElement
  guiCssObj: cssMap
}

const props = [
  {
    name: 'fontFamily',
    type: 'select',
    options: [
      'Arial',
      'Verdana',
      'Helvetica',
      'Tahoma',
      'Trebuchet MS',
      'Times New Roman',
      'Georgia',
      'Garamond',
      'Courier New',
      'Brush Script MT',
    ],
  },
  {
    name: 'fontSize',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'lineHeight',
    type: 'input-number-with-unit',
    units: ['unset', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw'],
  },
  {
    name: 'fontWeight',
    type: 'select',
    options: [
      'unset',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
    ],
  },
  {
    name: 'textAlign',
    type: 'select',
    options: ['unset', 'left', 'center', 'right', 'justify'],
  },
  {
    name: 'verticalAlign',
    type: 'select',
    options: ['unset', 'top', 'middle', 'bottom'],
  },
  {
    name: 'fontStyle',
    type: 'select',
    options: ['unset', 'normal', 'italic', 'oblique'],
  },
  {
    name: 'textDecoration',
    type: 'select',
    options: ['unset', 'none', 'underline', 'line-through', 'overline'],
  },
]

export const TypographyEditor = observer(
  ({ element, guiCssObj }: TypographyEditorProps) => {
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
          ) : (
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
          ),
        )}
        <ColorPicker
          currentValue={guiCssObj['color']}
          name="color"
          onChange={updateGuiCssProperty(element, 'color')}
        />
      </>
    )
  },
)
