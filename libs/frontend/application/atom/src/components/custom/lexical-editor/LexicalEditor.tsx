/* eslint-disable tailwindcss/no-custom-classname */
import './styles.css'
import { useStore } from '@codelab/frontend/application/shared/store'
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import {
  LexicalComposerContext,
  useLexicalComposerContext,
} from '@lexical/react/LexicalComposerContext'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import type { EditorState, LexicalEditor } from 'lexical'
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
} from 'lexical'
import React, { useCallback, useEffect, useState } from 'react'
import { exampleTheme } from './example-theme'
import { OnInitPlugin } from './OnInitPlugin'
import { ToolbarPlugin } from './plugins/ToolbarPlugin'
import { TreeViewPlugin } from './plugins/TreeViewPlugin'

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

const Editor = ({ compositeKey, data, readOnly }: TextEditorProps) => {
  console.log(data)

  const { propService, runtimeElementService } = useStore()
  const runtimeElement = runtimeElementService.runtimeElement(compositeKey)
  const element = runtimeElement.element.current

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

        const props = element.props
        const renderType = element.renderType.current

        void propService.updateWithDefaultValuesApplied(props, {
          data: { ...props.data.data, customText: JSON.stringify(textContent) },
          defaultValues: renderType.api.current.defaultValues,
          id: props.id,
        })
      })
    },
    [],
  )

  return (
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        {/* <ToolbarPlugin /> */}
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

export default Editor
