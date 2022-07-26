import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { Nullish } from '@codelab/shared/abstract/types'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { CssPropEditorItem } from '../components'
import { ColorPicker } from '../components/ColorPicker'
import { InputNumberWithUnits } from '../components/InputNumberWithUnits'
import {
  matchCssPropNumber,
  matchCssPropUnit,
  updateGuiCssProperty,
} from '../utils'

type TextShadowEditorProps = {
  element: IElement
  guiCssObj: cssMap
}

type BooleanProp = {
  name: 'textShadow'
  type: 'boolean'
  value: boolean
}

type NumberProp = {
  name: 'offsetX' | 'offsetY' | 'blurRadius'
  type: 'input-number-with-unit'
  value: number
  units: Array<string>
  unit: string
}

type ColorPickerProp = {
  name: 'color'
  type: 'color-picker'
  value: string
}

type TextShadowState = {
  textShadow: BooleanProp
  offsetX: NumberProp
  offsetY: NumberProp
  blurRadius: NumberProp
  color: ColorPickerProp
}

const props: TextShadowState = {
  textShadow: {
    name: 'textShadow',
    type: 'boolean',
    value: false,
  },
  offsetX: {
    name: 'offsetX',
    type: 'input-number-with-unit',
    units: ['px', 'em', 'rem', 'ch', 'vh', 'vw'],
    unit: 'px',
    value: 5,
  },
  offsetY: {
    name: 'offsetY',
    type: 'input-number-with-unit',
    units: ['px', 'em', 'rem', 'ch', 'vh', 'vw'],
    unit: 'px',
    value: 5,
  },
  blurRadius: {
    name: 'blurRadius',
    type: 'input-number-with-unit',
    units: ['unset', 'px', 'em', 'rem', 'ch', 'vh', 'vw'],
    unit: 'unset',
    value: 5,
  },
  color: {
    name: 'color',
    type: 'color-picker',
    value: '#000000',
  },
}

const parseTextShadow = (textShadow: Nullish<string>): TextShadowState => {
  if (!textShadow) {
    return { ...props }
  }

  // extract color if it exists
  const color = (
    textShadow.match(/\s*(#[0-9a-fA-F]{3,6}|rgba?\([^)]+\))/)?.[0] ?? ''
  ).trim()

  if (color !== '') {
    textShadow = textShadow.replace(color, '')
  }

  // extract the rest of the values (the numbers)
  const [offsetX, offsetY, blurRadius] = textShadow.split(' ')
  // separate the numbers from the units
  const offsetXNumber = matchCssPropNumber(offsetX)
  const offsetXUnit = matchCssPropUnit(offsetX)
  const offsetYNumber = matchCssPropNumber(offsetY)
  const offsetYUnit = matchCssPropUnit(offsetY)
  const blurRadiusNumber = matchCssPropNumber(blurRadius)
  const blurRadiusUnit = matchCssPropUnit(blurRadius)

  return {
    textShadow: { ...props.textShadow, value: true },
    offsetX: {
      ...props.offsetX,
      value: offsetXNumber ?? props.offsetX.value,
      unit: offsetXUnit ?? props.offsetX.unit,
    },
    offsetY: {
      ...props.offsetY,
      value: offsetYNumber ?? props.offsetY.value,
      unit: offsetYUnit ?? props.offsetY.unit,
    },
    blurRadius: {
      ...props.blurRadius,
      value: blurRadiusNumber ?? props.blurRadius.value,
      unit: blurRadiusUnit ?? props.blurRadius.unit,
    },
    color: {
      ...props.color,
      value: color,
    },
  }
}

export const TextShadow = observer(
  ({ element, guiCssObj }: TextShadowEditorProps) => {
    const [textShadowState, setTextShadowState] =
      React.useState<TextShadowState>(parseTextShadow(guiCssObj.textShadow))

    useEffect(() => {
      updateGuiCssProperty(
        element,
        'textShadow',
      )(
        // if textShadow is false, remove the textShadow property
        // else combine the textShadow properties into a string
        textShadowState['textShadow'].value === false
          ? null
          : `${`${textShadowState['offsetX'].value}${textShadowState['offsetX'].unit}`} ${`${textShadowState['offsetY'].value}${textShadowState['offsetY'].unit}`} ${
              textShadowState['blurRadius'].unit !== 'unset'
                ? `${textShadowState['blurRadius'].value}${textShadowState['blurRadius'].unit}`
                : '0'
            } ${textShadowState['color'].value}`,
      )
    }, [element, textShadowState])

    return (
      <>
        {Object.values(textShadowState).map((property) =>
          property.type === 'boolean' ? (
            <CssPropEditorItem
              defaultChecked={property.value}
              enableCheckbox
              onChange={(val) =>
                setTextShadowState({
                  ...textShadowState,
                  [property.name]: {
                    ...textShadowState[property.name],
                    value: val,
                  },
                })
              }
              title={property.name}
            >
              {
                // eslint-disable-next-line react/jsx-no-useless-fragment
                <></>
              }
            </CssPropEditorItem>
          ) : textShadowState['textShadow'] ? (
            property.type === 'input-number-with-unit' ? (
              <InputNumberWithUnits
                currentUnit={property.unit}
                currentValue={property.value}
                disabled={property.unit === 'unset'}
                name={property.name}
                onChange={(value, unit) =>
                  setTextShadowState({
                    ...textShadowState,
                    [property.name]: {
                      ...textShadowState[property.name],
                      value,
                      unit,
                    },
                  })
                }
                units={property.units ?? []}
              />
            ) : (
              <ColorPicker
                currentValue={property.value}
                name={property.name}
                onChange={(value) =>
                  setTextShadowState({
                    ...textShadowState,
                    [property.name]: {
                      ...textShadowState[property.name],
                      value,
                    },
                  })
                }
              />
            )
          ) : null,
        )}
      </>
    )
  },
)
