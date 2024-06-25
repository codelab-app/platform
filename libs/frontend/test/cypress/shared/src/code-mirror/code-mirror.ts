import type { EditorView } from '@codemirror/view'

export interface CodeMirrorHTMLElement extends HTMLElement {
  CodeMirror: EditorView
}
