import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { ColorPicker } from '../components/ColorPicker'
import { updateGuiCssProperty } from '../utils'

interface BackgroundEditorProps {
  element: IElement
  guiCssObj: cssMap
}

export const BackgroundEditor = observer(
  ({ element, guiCssObj }: BackgroundEditorProps) => {
    const [color, setColor] = React.useState(
      guiCssObj['background'] ?? 'transparent',
    )

    const [checked, setChecked] = React.useState(
      guiCssObj['background'] !== undefined,
    )

    useEffect(() => {
      if (!checked) {
        updateGuiCssProperty(element, 'background')(null)

        return
      }

      updateGuiCssProperty(element, 'background')(color)
    }, [color, checked, element])

    return (
      <ColorPicker
        checked={checked}
        currentValue={guiCssObj['background']}
        disabled={!checked}
        enableCheckbox={true}
        name="background"
        onChange={(val) => setColor(val)}
        onCheck={(val) => setChecked(val)}
      />
    )
  },
)
