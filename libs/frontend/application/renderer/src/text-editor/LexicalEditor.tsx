import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin'
import { LexicalComposer } from '@lexical/react/LexicalComposer'
import { ContentEditable } from '@lexical/react/LexicalContentEditable'
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin'
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin'
import { $getRoot, $getSelection } from 'lexical'
import React, { useEffect } from 'react'

const theme = {}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
const onError = (error: Error) => {
  console.error(error)
}

export const LexicalEditor = () => {
  const initialConfig = {
    namespace: 'MyEditor',
    onError,
    theme,
  }

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        ErrorBoundary={LexicalErrorBoundary}
        contentEditable={<ContentEditable />}
        placeholder={<div>Enter some text...</div>}
      />
      <HistoryPlugin />
      <AutoFocusPlugin />
    </LexicalComposer>
  )
}
