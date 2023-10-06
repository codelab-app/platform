import type CodeMirror from 'codemirror'

export interface CodeMirrorHTMLElement extends HTMLElement {
  CodeMirror: CodeMirror.EditorView
}
