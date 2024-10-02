'use client'

import {
  TextEditor,
  type TextEditorProps,
} from '@codelab/frontend-presentation-components-lexical'
import { $generateHtmlFromNodes } from '@lexical/html'
import type { EditorState, LexicalEditor } from 'lexical'
import type { HTMLFieldProps } from 'uniforms'
import { connectField } from 'uniforms'

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
