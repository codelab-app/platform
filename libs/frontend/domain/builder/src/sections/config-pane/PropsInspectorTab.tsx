import type {
  IComponent,
  IElement,
  IElementService,
  IPropData,
  IRenderer,
} from '@codelab/frontend/abstract/core'
import { isElement } from '@codelab/frontend/abstract/core'
import { CodeMirrorEditor } from '@codelab/frontend/view/components'
import { ICodeMirrorLanguage } from '@codelab/shared/abstract/core'
import { propSafeStringify } from '@codelab/shared/utils'
import Button from 'antd/lib/button'
import { observer } from 'mobx-react-lite'
import React from 'react'
import tw from 'twin.macro'
import { usePropsInspector } from '../../hooks'

export interface ElementPropsSectionProps {
  node: IElement | IComponent
  renderer: IRenderer
  elementService: IElementService
}

const PropsInspectorTab = observer(
  ({ node, renderer, elementService }: ElementPropsSectionProps) => {
    const initialProps = node.props?.values ?? {}

    const [editorValue, setEditorValue] = React.useState(
      propSafeStringify(initialProps),
    )

    const [updatedProps, setUpdatedProps] = React.useState(initialProps)
    const [isValidProps, setIsValidProps] = React.useState(true)

    const { save, lastRenderedPropsString, isLoading } = usePropsInspector(
      node,
      renderer,
      elementService,
      updatedProps,
    )

    const onChange = (value: string) => {
      setEditorValue(value)

      try {
        const newValue = JSON.parse(value) as IPropData
        // only a valid IPropData will be saved
        setUpdatedProps(newValue)
        setIsValidProps(true)
      } catch (error) {
        console.error(error)
        setIsValidProps(false)
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
          {isElement(node) ? 'Element' : 'Component'} props
        </h3>
        <CodeMirrorEditor
          height="150px"
          language={ICodeMirrorLanguage.Json}
          // persistedProps is state variable which means
          // it takes time to be updated by onChange
          onChange={(v: string) => onChange(v)}
          onSave={(v: string) => save(v)}
          title={`${isElement(node) ? 'Element' : 'Component'} props`}
          value={editorValue}
        />
        <Button
          disabled={!isValidProps}
          loading={isLoading}
          onClick={() => save(propSafeStringify(updatedProps))}
        >
          Save
        </Button>
      </div>
    )
  },
)

export { PropsInspectorTab }
