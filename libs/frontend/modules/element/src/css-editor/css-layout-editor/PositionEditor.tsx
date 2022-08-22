import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CssPropValueSelector } from '../components'
import { InputNumberWithUnits } from '../components/InputNumberWithUnits'
import {
  extractCssNumber,
  extractCssUnit,
  updateGuiCssProperty,
} from '../utils'

type PositionEditorProps = {
  element: IElement
  guiCssObj: cssMap
}

const defaultUnits = ['auto', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw']

const options = [
  {
    name: 'top',
    units: defaultUnits,
  },
  {
    name: 'right',
    units: defaultUnits,
  },
  {
    name: 'bottom',
    units: defaultUnits,
  },
  {
    name: 'left',
    units: defaultUnits,
  },
  {
    name: 'zIndex',
  },
]

export const PositionEditor = observer(
  ({ element, guiCssObj }: PositionEditorProps) => {
    const [zIndex, setZIndex] = React.useState(
      extractCssNumber(guiCssObj['zIndex'] ?? '') ?? 0,
    )

    return (
      <>
        <CssPropValueSelector
          currentValue={guiCssObj['position'] ?? 'static'}
          name="position"
          onClick={updateGuiCssProperty(element, 'position')}
          options={['static', 'relative', 'fixed', 'absolute', 'sticky']}
        />
        {!guiCssObj['position'] || guiCssObj['position'] === 'static' ? null : (
          <>
            {options.map(({ name, units }) => (
              <InputNumberWithUnits
                currentUnit={extractCssUnit(guiCssObj[name] ?? '') ?? 'auto'}
                currentValue={extractCssNumber(guiCssObj[name] ?? '') ?? 0}
                disabled={
                  (extractCssUnit(guiCssObj[name] ?? '') ?? 'auto') === 'auto'
                }
                name={name}
                onChange={(value, unit) =>
                  updateGuiCssProperty(
                    element,
                    name,
                  )(unit === 'auto' ? unit : `${value}${unit}`)
                }
                units={units}
              />
            ))}
            <InputNumberWithUnits
              checked={guiCssObj['zIndex'] !== 'auto'}
              currentValue={zIndex}
              disabled={extractCssUnit(guiCssObj['zIndex'] ?? '') === 'auto'}
              enableCheckBox
              name="zIndex"
              onChange={(value) => {
                updateGuiCssProperty(element, 'zIndex')(`${value}`)
                setZIndex(value)
              }}
              onCheck={(checked) =>
                updateGuiCssProperty(
                  element,
                  'zIndex',
                )(!checked ? 'auto' : `${zIndex}`)
              }
            />
          </>
        )}
      </>
    )
  },
)
