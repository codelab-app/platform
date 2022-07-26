import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CssPropValueSelector } from '../components'
import { InputNumberWithUnits } from '../components/InputNumberWithUnits'
import {
  matchCssPropNumber,
  matchCssPropUnit,
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
      matchCssPropNumber(guiCssObj['zIndex'] ?? '') ?? 0,
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
                currentUnit={matchCssPropUnit(guiCssObj[name] ?? '') ?? 'auto'}
                currentValue={matchCssPropNumber(guiCssObj[name] ?? '') ?? 0}
                disabled={
                  (matchCssPropUnit(guiCssObj[name] ?? '') ?? 'auto') === 'auto'
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
              currentValue={zIndex}
              defaultChecked={guiCssObj['zIndex'] !== 'auto'}
              disabled={matchCssPropUnit(guiCssObj['zIndex'] ?? '') === 'auto'}
              enableCheckBox
              name="zIndex"
              onChange={(value) => {
                updateGuiCssProperty(element, 'zIndex')(`${value}`)
                setZIndex(value)
              }}
              onCheckedChange={(checked) =>
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
