import { cssMap, IElement } from '@codelab/shared/abstract/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { CssPropValueSelector } from '../components'
import { InputNumberWithUnits } from '../components/InputNumberWithUnits'
import { updateGuiCssProperty } from '../utils'

type DisplayEditorProps = {
  element: IElement
  guiCssObj: cssMap
}

const props = [
  {
    name: 'display',
    options: ['block', 'flex'],
  },
  {
    name: 'flex-direction',
    options: ['row', 'row-reverse', 'column', 'column-reverse'],
  },
  {
    name: 'flex-wrap',
    options: ['nowrap', 'wrap', 'wrap-reverse'],
  },
  {
    name: 'justify-content',
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
    name: 'align-items',
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
          currentValue={parseFloat(guiCssObj['flex-grow'] ?? '0')}
          max={1}
          min={0}
          name="flex-grow"
          onValueChange={(val) =>
            updateGuiCssProperty(element, 'flex-grow')(`${val}`)
          }
          step={0.1}
        />
      </>
    )
  },
)
