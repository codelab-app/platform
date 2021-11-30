import { MonacoEditor } from '@codelab/frontend/view/components'
import Button from 'antd/lib/button'
import React from 'react'
import tw from 'twin.macro'
import { usePropsInspector } from '../../hooks'

export interface ElementPropsSectionProps {
  elementId: string
}

const PropsInspectorTab = ({ elementId }: ElementPropsSectionProps) => {
  const {
    save,
    lastRenderedPropsString,
    persistedProps,
    setPersistedProps,
    isLoading,
    setExtraPropsForElement,
  } = usePropsInspector(elementId)

  return (
    <div css={tw`grid grid-cols-2 gap-x-8 h-full`}>
      <div>
        <h3 css={tw`text-gray-700`}>Current props</h3>
        <MonacoEditor
          containerProps={{ style: { height: '100%' } }}
          editorOptions={{ language: 'json', readOnly: true }}
          value={lastRenderedPropsString}
        />
      </div>

      <div>
        <div css={tw`flex flex-row justify-between items-center px-8`}>
          <h3 css={tw`text-gray-700`}>Element props</h3>
          <Button onClick={() => save()} loading={isLoading}>
            Save
          </Button>
        </div>
        <MonacoEditor
          containerProps={{ style: { height: '100%' } }}
          editorOptions={{ language: 'json' }}
          value={persistedProps}
          onChange={(v) => {
            setPersistedProps(v)

            try {
              setExtraPropsForElement(JSON.parse(v))
            } catch (e) {
              //
            }
          }}
        />
      </div>
    </div>
  )
}

export { PropsInspectorTab }
