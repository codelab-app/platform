import {
  CSSInJSWorker,
  IEditorInjection,
  setupCssInJsLang,
  setupValidation,
} from 'monaco-css-in-js'
import React, { useEffect, useRef } from 'react'
import { MonacoEditor } from '../monaco'
import { monaco } from '../monaco/setupMonaco'
import { EmotionCssEditorProps } from './EmotionCssEditorProps'

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

const EmotionCssEditor = (props: EmotionCssEditorProps) => {
  const workerRef = useRef()
  useEffect(() => {
    // TODO figure out how to remove the worker from the main thread and rework monaco-css-in-js to not be this hacky
    workerRef.current = new CSSInJSWorker()
    setupCssInJsLang(workerRef.current, monaco.languages, editorInjection)
  }, [])

  return (
    <MonacoEditor
      onMount={(editor) => {
        setupValidation(workerRef.current, editor, editorInjection)
      }}
      {...props}
      editorOptions={{ language: 'cssInJs' }}
    />
  )
}

EmotionCssEditor.displayName = 'EmotionCssEditor'

export { EmotionCssEditor }
export default EmotionCssEditor
