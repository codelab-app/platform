'use client'
import type { EditorState, LexicalEditor } from 'lexical'
import type { FieldProps } from 'uniforms'

import {
  TextEditor,
  type TextEditorProps,
} from '@codelab/frontend-presentation-components-lexical'
import { $generateHtmlFromNodes } from '@lexical/html'
import { connectField } from 'uniforms'
import { wrapField } from 'uniforms-antd'

type RichTextConnectFieldProps = FieldProps<string, TextEditorProps>

export const RichTextField = connectField<RichTextConnectFieldProps>(
  (props) => {
    const onChange = (state: EditorState, editor: LexicalEditor) => {
      state.read(() => {
        props.onChange($generateHtmlFromNodes(editor))
      })
    }

    const config = {
      editable: true,
      namespace: props.name,
    }

    return wrapField(
      props,
      <TextEditor config={config} onChange={onChange} value={props.value} />,
    )
  },
  { kind: 'leaf' },
)
