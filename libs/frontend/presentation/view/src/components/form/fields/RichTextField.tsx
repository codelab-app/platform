import { $generateHtmlFromNodes } from '@lexical/html'
import type { EditorState, LexicalEditor } from 'lexical'
import React from 'react'
import type { HTMLFieldProps } from 'uniforms'
import { connectField } from 'uniforms'
import { TextEditor, type TextEditorProps } from '../../text-editor'

type RichTextConnectFieldProps = HTMLFieldProps<string, TextEditorProps>

export const RichTextField = connectField<RichTextConnectFieldProps>(
  (props) => {
    const onChange = (
      state: EditorState,
      editor: LexicalEditor,
      tags: Set<string>,
    ) => {
      state.read(() => {
        props.onChange($generateHtmlFromNodes(editor))
      })
    }

    const config = {
      editable: true,
      namespace: props.name,
    }

    return (
      <TextEditor config={config} onChange={onChange} value={props.value} />
    )
  },
  { kind: 'leaf' },
)
