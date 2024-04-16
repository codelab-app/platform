import {
  type IRuntimeElementModel,
  RendererType,
} from '@codelab/frontend/abstract/application'
import { useStore } from '@codelab/frontend/application/shared/store'
import { $generateHtmlFromNodes } from '@lexical/html'
import type { EditorState, LexicalEditor } from 'lexical'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'
import React, { useCallback } from 'react'

const TextEditor = dynamic(
  () =>
    import('@codelab/frontend/presentation/view').then((mod) => mod.TextEditor),
  {
    ssr: false,
  },
)

export const TextEditorWrapper = observer<{
  runtimeElement: IRuntimeElementModel
}>(({ runtimeElement }) => {
  const { propService, rendererService } = useStore()
  const element = runtimeElement.element.current
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
        state.read(() => {
          const htmlString = $generateHtmlFromNodes(lexicalEditor)
          const props = element.props
          const renderType = element.renderType.current

          void propService.updateWithDefaultValuesApplied(props, {
            data: { ...props.data.data, children: htmlString },
            defaultValues: renderType.api.current.defaultValues,
            id: props.id,
          })
        })
      }
    },
    [],
  )

  const onClose = useCallback(() => {
    element.setIsTextContentEditable(false)
  }, [])

  const data = editable
    ? element.props.values['children']
    : runtimeElement.runtimeProps.evaluatedProps['children']

  return (
    <TextEditor
      config={{ editable, namespace: `${element.id}-editor` }}
      data={data}
      onChange={onChange}
      onClose={onClose}
    />
  )
})
