/* eslint-disable tailwindcss/no-custom-classname */
import './styles.css'
import { mergeProps } from '@codelab/frontend/domain/prop'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { TabIndentationPlugin } from '@lexical/react/LexicalTabIndentationPlugin'
import type { EditorState, LexicalEditor } from 'lexical'
import React from 'react'
import { OnInitPlugin } from './OnInitPlugin'
import { ToolbarPlugin } from './plugins/ToolbarPlugin'
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
  onClose: close = () => null,
}: TextEditorProps) => {
  return (
    <LexicalComposer initialConfig={mergeProps(editorConfig, config)}>
      <div className="editor-container">
        <OnInitPlugin data={data} editable={Boolean(config.editable)} />
        {config.editable && <ToolbarPlugin onClose={close} />}
        <OnChangePlugin onChange={onChange} />
        <div className="editor-inner">
          <RichTextPlugin
            ErrorBoundary={LexicalErrorBoundary}
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={null}
          />
          <HistoryPlugin />
          <AutoFocusPlugin />
          <ClearEditorPlugin />
          <TabIndentationPlugin />
        </div>
      </div>
    </LexicalComposer>
  )
}

TextEditor.displayName = 'TextEditor'
