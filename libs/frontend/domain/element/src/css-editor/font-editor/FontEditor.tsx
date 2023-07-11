import type { CssMap, IElement } from '@codelab/frontend/abstract/core'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { InputNumberWithUnits } from '../components/InputNumberWithUnits'
import {
  extractCssNumber,
  extractCssUnit,
  updateGuiCssProperty,
} from '../utils'
import { extractFontDataFromUrl } from './font-editor.util'

interface FontEditorProps {
  element: IElement
  guiCssObj: CssMap
}

export const FontEditor = observer(
  ({ element, guiCssObj }: FontEditorProps) => {
    const fonts = extractFontDataFromUrl()

    const [selectedFont, setSelectedFont] = React.useState({
      family: guiCssObj['font-family'],
      weight: guiCssObj['font-weight'],
    })

    // When the component mounts we need to make sure that the selected weight is still valid
    useEffect(() => onFamilyChanged(selectedFont.family), [])

    const [weightOptions, setWeightOptions] = React.useState([])

    const onFamilyChanged = (value: string) => {
      updateGuiCssProperty(element, 'font-family')(`${value}`)
      setSelectedFont({ ...selectedFont, family: value })

      // When the font family changes we need to make sure that the selected weight is still valid
      const currentFont = fonts.find((font) => font.family === value)

      if (currentFont) {
        setWeightOptions(
          currentFont.weights.map((weight) => {
            return {
              label: weight,
              value: weight,
            }
          }),
        )

        if (!currentFont.weights.includes(selectedFont.weight)) {
          onWeightChanged(currentFont.weights[0])
        }
      }
    }

    const onWeightChanged = (value: string) => {
      updateGuiCssProperty(element, 'font-weight')(value)
      setSelectedFont({ ...selectedFont, weight: value })
    }

    const makeFamilyOptions = () => {
      return fonts.map((fontData) => {
        return {
          label: fontData.family,
          value: `${fontData.family}`,
        }
      })
    }

    return (
      <>
        <Select
          className="w-full"
          onChange={onFamilyChanged}
          options={makeFamilyOptions()}
          value={selectedFont.family}
        />
        <Select
          className="w-full"
          onChange={onWeightChanged}
          options={weightOptions}
          value={selectedFont.weight}
        />
        <InputNumberWithUnits
          currentUnit={extractCssUnit(guiCssObj['font-size'] ?? '') ?? 'auto'}
          currentValue={extractCssNumber(guiCssObj['font-size'] ?? '') ?? 0}
          name="font-size"
          onChange={(value, unit) =>
            updateGuiCssProperty(
              element,
              'font-size',
            )(unit === 'auto' ? unit : `${value}${unit}`)
          }
          units={['auto', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw']}
        />
      </>
    )
  },
)
