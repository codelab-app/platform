import { CodeMirrorEditor } from '@codelab/frontend/view/components'
import { CodeMirrorLanguage } from '@codelab/shared/abstract/codegen'
import {
  IElement,
  IElementService,
  IRenderer,
} from '@codelab/shared/abstract/core'
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
        <CodeMirrorEditor
          height="150px"
          language={CodeMirrorLanguage.Json}
          onChange={() => undefined}
          readOnly
          title="Current props"
          value={lastRenderedPropsString}
        />

        <h3 css={tw`text-gray-700`}>Element props</h3>
        <CodeMirrorEditor
          height="150px"
          language={CodeMirrorLanguage.Json}
          // persistedProps is state variable which means
          // it takes time to be updated by onChange
          onChange={(v: string) => onChange(v)}
          onSave={(v: string) => save(v)}
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
