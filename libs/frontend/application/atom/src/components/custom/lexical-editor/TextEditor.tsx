/* eslint-disable tailwindcss/no-custom-classname */
import './styles.css'
import { mergeProps } from '@codelab/frontend/domain/prop'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import type { EditorState, LexicalEditor } from 'lexical'
import React from 'react'
import { OnInitPlugin } from './OnInitPlugin'
import { defaultEditorTheme } from './theme'

const editorConfig: InitialConfigType = {
  editable: true,
  namespace: 'TextEditor',
  // Handling of errors during update
  onError: (error: Error) => {
    console.error(error)
    throw error
  },

  theme: defaultEditorTheme,
}

export interface TextEditorProps {
  config?: Partial<InitialConfigType>
  data?: string
  onChange(state: EditorState, editor: LexicalEditor, tags: Set<string>): void
  onClose?(): void
}

export const TextEditor = ({
  config = {},
  data,
  onChange,
  onClose = () => null,
}: TextEditorProps) => {
  return (
    <LexicalComposer initialConfig={mergeProps(editorConfig, config)}>
      <div className="editor-container">
        <OnInitPlugin
          data={data}
          editable={Boolean(config.editable)}
          onChange={onChange}
          onClose={onClose}
        />
        <div className="editor-inner">
          <RichTextPlugin
            ErrorBoundary={LexicalErrorBoundary}
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={null}
          />
        </div>
      </div>
    </LexicalComposer>
  )
}

TextEditor.displayName = 'TextEditor'
