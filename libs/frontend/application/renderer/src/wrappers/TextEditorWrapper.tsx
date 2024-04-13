import {
  type IRuntimeElementModel,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { useStore } from '@codelab/frontend/application/shared/store'
import type { EditorState, LexicalEditor } from 'lexical'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import React, { useCallback } from 'react'

const LexicalTextEditor = dynamic(
  () =>
    import('@codelab/frontend/application/atom').then((mod) => mod.TextEditor),
  {
    ssr: false,
  },
)

export const TextEditorWrapper = observer<{
  runtimeElement: IRuntimeElementModel
}>(({ runtimeElement }) => {
  const { propService, rendererService } = useStore()
  const element = runtimeElement.element.current
  const data = runtimeElement.runtimeProps.evaluatedProps['children']
  const renderer = rendererService.activeRenderer?.current

  const isBuilderRenderer =
    renderer?.rendererType === RendererType.ComponentBuilder ||
    renderer?.rendererType === RendererType.PageBuilder

  const editable = element.isTextContentEditable && isBuilderRenderer

  const onChange = useCallback(
    (state: EditorState, lexicalEditor: LexicalEditor, tags: Set<string>) => {
      // consider changes only in edit mode
      // because props evaluation triggers change too
      if (lexicalEditor.isEditable()) {
        const textContent = state.toJSON()
        const props = element.props
        const renderType = element.renderType.current

        void propService.updateWithDefaultValuesApplied(props, {
          data: { ...props.data.data, children: JSON.stringify(textContent) },
          defaultValues: renderType.api.current.defaultValues,
          id: props.id,
        })
      }
    },
    [],
  )

  const onClose = useCallback(() => {
    element.setIsTextContentEditable(false)
  }, [])

  return (
    <LexicalTextEditor
      config={{ editable }}
      data={data}
      onChange={onChange}
      onClose={onClose}
    />
  )
})
