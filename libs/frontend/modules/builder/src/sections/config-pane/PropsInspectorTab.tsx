import { MonacoEditor } from '@codelab/frontend/view/components'
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
      lastRenderedPropsString,
      persistedProps,
      setPersistedProps,
      isLoading,
      setExtraPropsForElement,
    } = usePropsInspector(element, renderer, elementService)

    return (
      <div css={tw`grid grid-cols-2 gap-x-8 h-full`}>
        <div>
          <h3 css={tw`text-gray-700`}>Current props</h3>
          <MonacoEditor
            // containerProps={{ style: { height: '100%' } }}
            // editorOptions={{ language: 'json', readOnly: true }}
            value={lastRenderedPropsString}
          />
        </div>

        <div>
          <div css={tw`flex flex-row justify-between items-center px-8`}>
            <h3 css={tw`text-gray-700`}>Element props</h3>
            <Button loading={isLoading} onClick={() => save()}>
              Save
            </Button>
          </div>
          <MonacoEditor
            // containerProps={{ style: { height: '100%' } }}
            // editorOptions={{ language: 'json' }}
            onChange={(v) => {
              setPersistedProps(v.target.value)

              try {
                setExtraPropsForElement(JSON.parse(v.target.value))
              } catch (e) {
                //
              }
            }}
            value={persistedProps}
          />
        </div>
      </div>
    )
  },
)

export { PropsInspectorTab }
