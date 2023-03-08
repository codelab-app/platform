import type {
  IPageNodeRef,
  IPropData,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { isElementPageNodeRef } from '@codelab/frontend/abstract/core'
import { CodeMirrorEditor } from '@codelab/frontend/view/components'
import { ICodeMirrorLanguage } from '@codelab/shared/abstract/core'
import { propSafeStringify } from '@codelab/shared/utils'
import Button from 'antd/lib/button'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { usePropsInspector } from '../../hooks'

export interface ElementPropsSectionProps {
  node: IPageNodeRef
  renderer: IRenderer
}

const PropsInspectorTab = observer(
  ({ node, renderer }: ElementPropsSectionProps) => {
    const initialProps = node.current.props?.current.values ?? {}
    const initialEditorValue = propSafeStringify(initialProps)
    const [editedProps, setEditedProps] = React.useState(initialProps)
    const [isValidProps, setIsValidProps] = React.useState(true)

    const { save, lastRenderedPropsString, isLoading } = usePropsInspector(
      node,
      renderer,
      editedProps,
    )

    const onChange = (value: string) => {
      try {
        const newValue = JSON.parse(value) as IPropData
        // only a valid IPropData will be saved
        setEditedProps(newValue)
        setIsValidProps(true)
      } catch (error) {
        console.log(error)
        setIsValidProps(false)
      }
    }

    // string argument is used for when saving in the code mirror modal
    // TODO: Check in the code mirror component why it doesn't
    // trigger `onChange` when editing in the modal
    const onSave = async (data: IPropData | string) => {
      if (typeof data === 'string') {
        try {
          await save(JSON.parse(data))
        } catch (error) {
          console.log(error)
        }
      } else {
        await save(data)
      }
    }

    return (
      <div css={tw`w-full`}>
        <h3 css={tw`text-gray-700`}>Current props</h3>
        <CodeMirrorEditor
          height="150px"
          language={ICodeMirrorLanguage.Json}
          onChange={() => undefined}
          readOnly
          title="Current props"
          value={lastRenderedPropsString}
        />

        <h3 css={tw`text-gray-700`}>
          {isElementPageNodeRef(node) ? 'Element' : 'Component'} props
        </h3>
        <CodeMirrorEditor
          height="150px"
          language={ICodeMirrorLanguage.Json}
          onChange={(value) => onChange(value)}
          onSave={(value) => onSave(value)}
          title={`${
            isElementPageNodeRef(node) ? 'Element' : 'Component'
          } props`}
          value={initialEditorValue}
        />
        <Button
          disabled={!isValidProps}
          loading={isLoading}
          onClick={() => onSave(editedProps)}
        >
          Save
        </Button>
      </div>
    )
  },
)

export { PropsInspectorTab }
