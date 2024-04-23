/* eslint-disable tailwindcss/no-custom-classname */
import './styles.css'
import { mergeProps } from '@codelab/frontend/domain/prop'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import type { EditorState, LexicalEditor } from 'lexical'
import React, { useRef } from 'react'
import { OnInitPlugin, ToolbarPlugin } from './plugins'
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
  value?: string
  onChange?(state: EditorState, editor: LexicalEditor, tags: Set<string>): void
}

export const TextEditor = ({
  config = {},
  onChange = () => null,
  value,
}: TextEditorProps) => {
  const editorRef = useRef<LexicalEditor>(null)
  const editorConfig = mergeProps<InitialConfigType>(defaultConfig, config)

  return (
    <LexicalComposer initialConfig={editorConfig}>
      {editorConfig.editable && <ToolbarPlugin />}
      <EditorRefPlugin editorRef={editorRef} />
      <OnInitPlugin config={editorConfig} onChange={onChange} value={value} />
      <div
        className={`editor-container ${
          editorConfig.editable ? 'editable' : ''
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
    </LexicalComposer>
  )
}

TextEditor.displayName = 'TextEditor'
