import { type IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import { usePropService } from '@codelab/frontend-application-prop/services'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { TextEditor } from '@codelab/frontend-presentation-components-lexical'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { $generateHtmlFromNodes } from '@lexical/html'
import type { EditorState, LexicalEditor } from 'lexical'
import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'

export const RichTextEditorWrapper = observer<{
  runtimeElement: IRuntimeElementModel
}>(({ runtimeElement }) => {
  const { typeDomainService } = useDomainStore()
  const propService = usePropService()
  const element = runtimeElement.element.current
  const editable = element.isTextContentEditable

  const richTextType = typeDomainService.typesList.find(
    (type) => type.kind === ITypeKind.RichTextType,
  )

  const onChange = useCallback(
    (state: EditorState, lexicalEditor: LexicalEditor, tags: Set<string>) => {
      // consider changes only in edit mode
      // because props evaluation triggers change too
      if (lexicalEditor.isEditable()) {
        state.read(() => {
          if (!richTextType) {
            throw new Error('Unable to find rich text type')
          }

          const htmlString = $generateHtmlFromNodes(lexicalEditor)
          const props = element.props
          const renderType = element.renderType.current

          // void propService.updateWithDefaultValuesApplied(props, {
          //   data: {
          //     ...props.data.data,
          //     children: {
          //       kind: richTextType.kind,
          //       type: richTextType.id,
          //       value: htmlString,
          //     },
          //   },
          //   defaultValues: renderType.api.current.defaultValues,
          //   id: props.id,
          // })
        })
      }
    },
    [],
  )

  const value = editable
    ? element.props.values['children']?.value
    : runtimeElement.runtimeProps.evaluatedProps['children']

  return (
    <TextEditor
      config={{ editable, namespace: `${element.id}-editor` }}
      onChange={onChange}
      onResize={({ height }) => {
        if (height) {
          runtimeElement.style.setBuilderStyle(
            editable ? `minHeight: ${height + 10}px;` : '',
          )
        }
      }}
      value={value}
    />
  )
})

export const CodeMirrorEditorWrapper = observer<{
  runtimeElement: IRuntimeElementModel
}>(({ runtimeElement }) => {
  const { typeDomainService } = useDomainStore()
  const propService = usePropService()
  const element = runtimeElement.element.current
  const editable = element.isTextContentEditable

  const codeMirrorType = typeDomainService.typesList.find(
    (type) => type.kind === ITypeKind.CodeMirrorType,
  )

  const onChange = useCallback((value: string) => {
    const props = element.props
    const renderType = element.renderType.current

    // void propService.updateWithDefaultValuesApplied(props, {
    //   data: {
    //     ...props.data.data,
    //     children: {
    //       kind: codeMirrorType?.kind,
    //       type: codeMirrorType?.id,
    //       value,
    //     },
    //   },
    //   defaultValues: renderType.api.current.defaultValues,
    //   id: props.id,
    // })
  }, [])

  const value = editable
    ? element.props.values['children']?.value
    : runtimeElement.runtimeProps.evaluatedProps['children']

  return editable ? (
    <CodeMirrorEditor
      expandable={false}
      minWidth="100px"
      onChange={onChange}
      value={value}
    />
  ) : (
    <>{value}</>
  )
})
