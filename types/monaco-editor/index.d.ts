/**
 * Since importing 'monaco-editor/esm` causes CSS issue, we import the minified version which has styling stripped out. But it lacks types so issue with compiling.
 */
declare module 'monaco-editor/min/vs/editor/editor.main' {
  module editor {
    interface IStandaloneEditorConstructionOptions {}
    interface IStandaloneCodeEditor {
      setValue
      updateOptions
      onDidChangeModelContent
      getValue
      dispose
      getModel
      layout
    }
  }
  const editor
  const languages
  const Range
  const Emitter
  const MarkerSeverity
  const Uri
  interface IDisposable {
    dispose: any
  }
}
