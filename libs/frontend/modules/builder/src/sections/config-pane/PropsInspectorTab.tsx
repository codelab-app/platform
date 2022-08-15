import { CodeMirrorInput } from '@codelab/frontend/view/components'
import {
  IElement,
  IElementService,
  IRenderer,
} from '@codelab/shared/abstract/core'
import { json } from '@codemirror/lang-json'
import Button from 'antd/lib/button'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { usePropsInspector } from '../../hooks'

export type ElementPropsSectionProps = {
  element: IElement
  renderer: IRenderer
  elementService: IElementService
}

const PropsInspectorTab = observer(
  ({ element, renderer, elementService }: ElementPropsSectionProps) => {
    const {
      save,
      persistedProps,
      setPersistedProps,
      lastRenderedPropsString,
      isLoading,
      setExtraPropsForElement,
    } = usePropsInspector(element, renderer, elementService)

    const onChange = (value: string) => {
      setPersistedProps(value)

      try {
        setExtraPropsForElement(JSON.parse(value))
      } catch (error) {
        //
        console.log(error)
      }
    }

    return (
      <div>
        <h3 css={tw`text-gray-700`}>Current props</h3>
        <CodeMirrorInput
          extensions={[json()]}
          height="150px"
          onChange={() => undefined}
          readOnly
          shouldDisableNewLines={false}
          title="Current props"
          value={lastRenderedPropsString}
        />

        <h3 css={tw`text-gray-700`}>Element props</h3>
        <CodeMirrorInput
          extensions={[json()]}
          height="150px"
          onChange={(v) => onChange(v)}
          onSave={(v) => save(v)}
          shouldDisableNewLines={false}
          title="Element props"
          value={persistedProps || '{}'}
        />
        <Button loading={isLoading} onClick={() => save(persistedProps)}>
          Save
        </Button>
      </div>
    )
  },
)

export { PropsInspectorTab }
