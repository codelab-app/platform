'use client'

import type { EditorState, LexicalEditor } from 'lexical'

import { type IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import { usePropService } from '@codelab/frontend-application-prop/services'
import { useLoading } from '@codelab/frontend-application-shared-store/loading'
import { useDomainStore } from '@codelab/frontend-infra-mobx/context'
import { CodeMirrorEditor } from '@codelab/frontend-presentation-components-codemirror'
import { TextEditor } from '@codelab/frontend-presentation-components-lexical'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { $generateHtmlFromNodes } from '@lexical/html'
import { observer } from 'mobx-react-lite'
import { useCallback, useMemo } from 'react'
import { debounce } from 'remeda'

export const RichTextEditorWrapper = observer<{
  runtimeElement: IRuntimeElementModel
}>(({ runtimeElement }) => {
  const { setLoading } = useLoading()
  const { typeDomainService } = useDomainStore()
  const propService = usePropService()
  const element = runtimeElement.element.current
  const editable = element.isTextContentEditable

  const richTextType = typeDomainService.typesList.find(
    (type) => type.kind === ITypeKind.RichTextType,
  )

  const onChange = useCallback(
    (state: EditorState, lexicalEditor: LexicalEditor) => {
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

          setLoading(true)

          void propService
            .updateWithDefaultValuesApplied(props, {
              data: {
                ...props.data.data,
                children: {
                  kind: richTextType.kind,
                  type: richTextType.id,
                  value: htmlString,
                },
              },
              defaultValues: renderType.api.current.defaultValues,
              id: props.id,
            })
            .finally(() => setLoading(false))
        })
      }
    },
    [],
  )

  const value = useMemo(
    () =>
      editable
        ? element.props.values['children']?.value
        : runtimeElement.runtimeProps.evaluatedProps['children'],
    [element, runtimeElement, editable],
  )

  return (
    <TextEditor
      config={{ editable, namespace: `${element.id}-editor` }}
      onChange={debounce(onChange, { waitMs: 500 }).call}
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

    void propService.updateWithDefaultValuesApplied(props, {
      data: {
        ...props.data.data,
        children: {
          kind: codeMirrorType?.kind,
          type: codeMirrorType?.id,
          value,
        },
      },
      defaultValues: renderType.api.current.defaultValues,
      id: props.id,
    })
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
    value
  )
})
