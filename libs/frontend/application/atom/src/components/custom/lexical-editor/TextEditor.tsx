/* eslint-disable tailwindcss/no-custom-classname */
import './styles.css'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import type { EditorState, LexicalEditor } from 'lexical'
import React, { useCallback } from 'react'
import { exampleTheme } from './example-theme'
import { OnInitPlugin } from './OnInitPlugin'
import { ToolbarPlugin } from './plugins/ToolbarPlugin'

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
const onError = (error: Error) => {
  console.error(error)
}

const Placeholder = () => {
  return <div className="editor-placeholder">...</div>
}

const editorConfig = {
  namespace: 'React.js Demo',
  nodes: [],
  // Handling of errors during update
  onError: (error: Error) => {
    throw error
  },
  // The editor theme
  theme: exampleTheme,
}

export interface TextEditorProps {
  compositeKey: string
  data?: string
  readOnly?: boolean
}

export const TextEditor = ({ data }: TextEditorProps) => {
  const onChange = useCallback(
    (
      _editorState: EditorState,
      lexicalEditor: LexicalEditor,
      tags: Set<string>,
    ) => {
      const editorData = _editorState.toJSON()

      console.log(editorData)

      _editorState.read(() => {
        // Assuming you have a root node that contains text,
        // and you want to log the entire content of the editor as text.
        const textContent = _editorState._nodeMap.get('root')?.getTextContent()

        console.log(textContent)
      })
    },
    [],
  )

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <OnChangePlugin onChange={onChange} />
        <OnInitPlugin data={data} />
        <div className="editor-inner">
          <RichTextPlugin
            ErrorBoundary={LexicalErrorBoundary}
            contentEditable={<ContentEditable className="editor-input" />}
            // placeholder={<Placeholder />}
            placeholder={null}
          />
          {/* <HistoryPlugin /> */}
          {/* <AutoFocusPlugin /> */}
          {/* <TreeViewPlugin /> */}
        </div>
      </div>
    </LexicalComposer>
  )
}

TextEditor.displayName = 'TextEditor'
