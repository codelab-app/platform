import { CssMap, IElement } from '@codelab/frontend/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CssPropValueSelector } from '../components'
import { InputNumberWithUnits } from '../components/InputNumberWithUnits'
import { updateGuiCssProperty } from '../utils'

interface DisplayEditorProps {
  element: IElement
  guiCssObj: CssMap
}

const props = [
  {
    name: 'display',
    options: ['block', 'flex'],
  },
  {
    name: 'flexDirection',
    options: ['row', 'row-reverse', 'column', 'column-reverse'],
  },
  {
    name: 'flexWrap',
    options: ['nowrap', 'wrap', 'wrap-reverse'],
  },
  {
    name: 'justifyContent',
    options: [
      'flex-start',
      'flex-end',
      'center',
      'space-between',
      'space-around',
      'space-evenly',
    ],
  },
  {
    name: 'alignItems',
    options: ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
  },
]

export const DisplayEditor = observer(
  ({ element, guiCssObj }: DisplayEditorProps) => {
    return (
      <>
        <CssPropValueSelector
          currentValue={guiCssObj['display'] ?? 'block'}
          name="display"
          onClick={updateGuiCssProperty(element, 'display')}
          options={['block', 'flex']}
        />
        {guiCssObj['display'] !== 'flex' ? null : (
          <>
            {props
              .filter((prop) => prop.name !== 'display')
              .map(({ name }) => (
                <CssPropValueSelector
                  currentValue={guiCssObj[name] ?? 'none'}
                  name={name}
                  onClick={updateGuiCssProperty(element, name)}
                  options={
                    props.find((prop) => prop.name === name)?.options ?? []
                  }
                />
              ))}
          </>
        )}
        <InputNumberWithUnits
          currentValue={parseFloat(guiCssObj['flexGrow'] ?? '0')}
          max={1}
          min={0}
          name="flexGrow"
          onValueChange={(val) =>
            updateGuiCssProperty(element, 'flexGrow')(`${val}`)
          }
          step={0.1}
        />
      </>
    )
  },
)
