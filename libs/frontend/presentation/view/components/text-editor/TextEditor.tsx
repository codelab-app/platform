/* eslint-disable tailwindcss/no-custom-classname */
import './styles.css'
import { mergeProps } from '@codelab/frontend/domain/prop'
import type { InitialConfigType } from '@lexical/react/LexicalComposer'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import { EditorRefPlugin } from '@lexical/react/LexicalEditorRefPlugin'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { Popover } from 'antd'
import type { EditorState, LexicalEditor } from 'lexical'
import React, { useRef } from 'react'
import { OnInitPlugin } from './OnInitPlugin'
import { ToolbarPlugin } from './plugins/ToolbarPlugin'
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
  const editorConfig = mergeProps<InitialConfigType>(defaultConfig, config)
  const editorRef = useRef<LexicalEditor>(null)

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <Popover
        afterOpenChange={() => {
          editorRef.current?.focus()
        }}
        arrow={false}
        content={<ToolbarPlugin onClose={onClose} />}
        open={editorConfig.editable}
      >
        <OnInitPlugin config={editorConfig} data={data} onChange={onChange} />
        <div
          className={`editor-container${
            editorConfig.editable ? ' editable' : ''
          }`}
        >
          <div className="editor-inner">
            <EditorRefPlugin editorRef={editorRef} />
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={null}
            />
          </div>
        </div>
      </Popover>
    </LexicalComposer>
  )
}

TextEditor.displayName = 'TextEditor'
