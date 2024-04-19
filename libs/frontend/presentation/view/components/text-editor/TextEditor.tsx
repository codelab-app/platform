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
import { OnInitPlugin } from './plugins'
import { TextEditorToolbar } from './TextEditorToolbar'
import { defaultEditorTheme } from './theme'

const defaultConfig: InitialConfigType = {
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
  floatingToolbar?: boolean
  value?: string
  onChange(state: EditorState, editor: LexicalEditor, tags: Set<string>): void
  onExitEditing?(): void
}

export const TextEditor = ({
  config = {},
  floatingToolbar = false,
  onChange,
  onExitEditing,
  value,
}: TextEditorProps) => {
  const editorConfig = mergeProps<InitialConfigType>(defaultConfig, config)

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <TextEditorToolbar
        editable={Boolean(editorConfig.editable)}
        floatingToolbar={Boolean(floatingToolbar)}
        onExitEditing={onExitEditing}
      >
        <OnInitPlugin config={editorConfig} onChange={onChange} value={value} />
        <div
          className={`editor-container${
            editorConfig.editable ? ' editable' : ''
          }`}
        >
          <div className="editor-inner">
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={null}
            />
          </div>
        </div>
      </TextEditorToolbar>
    </LexicalComposer>
  )
}

TextEditor.displayName = 'TextEditor'
