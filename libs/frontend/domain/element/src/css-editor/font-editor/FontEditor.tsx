import type { CssMap, IElement } from '@codelab/frontend/abstract/core'
import { Select } from 'antd'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { InputNumberWithUnits } from '../components/InputNumberWithUnits'
import {
  extractCssNumber,
  extractCssUnit,
  updateGuiCssProperty,
} from '../utils'

interface FontEditorProps {
  element: IElement
  guiCssObj: CssMap
}

const DEFAULT_FONT = 'Arial, sans-serif'

export const FontEditor = observer(
  ({ element, guiCssObj }: FontEditorProps) => {
    const extractFontFamily = (font?: string) => {
      return (font ?? DEFAULT_FONT).split(',')[0]
    }

    const [font, setFont] = React.useState(
      extractFontFamily(guiCssObj['fontFamily']),
    )

    const onChange = (value: string) => {
      setFont(extractFontFamily(value))
      updateGuiCssProperty(element, 'fontFamily')(value)
      console.log(element.guiCss)
    }

    const options = [
      { label: 'Roboto', value: 'Roboto, sans-serif' },
      { label: 'Pacifico', value: 'Pacifico, sans-serif' },
    ]

    return (
      <>
        <Select
          css={tw`w-full`}
          onChange={onChange}
          options={options}
          value={font}
        />
        <InputNumberWithUnits
          currentUnit={extractCssUnit(guiCssObj['fontSize'] ?? '') ?? 'auto'}
          currentValue={extractCssNumber(guiCssObj['fontSize'] ?? '') ?? 0}
          name="fontSize"
          onChange={(value, unit) =>
            updateGuiCssProperty(
              element,
              'fontSize',
            )(unit === 'auto' ? unit : `${value}${unit}`)
          }
          units={['auto', 'px', '%', 'em', 'rem', 'ch', 'vh', 'vw']}
        />
      </>
    )
  },
)
