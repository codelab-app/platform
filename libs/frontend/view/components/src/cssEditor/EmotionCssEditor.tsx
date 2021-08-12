import MonacoEditor, { EditorProps, Monaco } from '@monaco-editor/react'
import {
  CSSInJSWorker,
  IEditorInjection,
  setupCssInJsLang,
  setupValidation,
} from 'monaco-css-in-js'
import React, { useRef } from 'react'

export type EmotionCssEditorProps = Omit<
  EditorProps,
  'language' | 'onMount' | 'beforeMount'
>

const getEditorInjection = (monaco: Monaco) => {
  const editorInjection: IEditorInjection = {
    Uri: monaco.Uri,
    createWebWorker: monaco.editor.createWebWorker,
    getModels: monaco.editor.getModels,
    getModel: monaco.editor.getModel,
    CompletionItemInsertTextRule: monaco.languages.CompletionItemInsertTextRule,
    itemKinds: monaco.languages.CompletionItemKind,
    onDidChangeModelLanguage: monaco.editor.onDidChangeModelLanguage,
    onDidCreateModel: monaco.editor.onDidCreateModel,
    onWillDisposeModel: monaco.editor.onWillDisposeModel,
    setModelMarkers: monaco.editor.setModelMarkers,
    severities: monaco.MarkerSeverity,
    Range: monaco.Range,
    Emitter: monaco.Emitter,
  }

  return editorInjection
}

export const EmotionCssEditor = ({
  theme,
  ...props
}: EmotionCssEditorProps) => {
  const workerRef = useRef<any>()

  return (
    <MonacoEditor
      language={'cssInJs'}
      theme={theme || 'vs-dark'}
      {...props}
      onMount={(editor, monaco) => {
        const editorInjection = getEditorInjection(monaco)
        setupValidation(workerRef.current, editor, editorInjection)
      }}
      beforeMount={(monaco) => {
        // We are injecting the editor instance, because of a css conflict that arises if we import the whole monaco.editor module
        // the monaco-css-in-js is a fork of monaco-css that doesn't import that module and relies on injecting the methods instead
        // it also adds support for css-in-js, because normally the monaco editor interprets it as regular css, but in our case
        // we want to be able to add css key/values in the body directly, without a root selector
        const editorInjection = getEditorInjection(monaco)

        workerRef.current = new CSSInJSWorker()

        setupCssInJsLang(workerRef.current, monaco.languages, editorInjection)
      }}
    />
  )
}

EmotionCssEditor.displayName = 'EmotionCssEditor'
