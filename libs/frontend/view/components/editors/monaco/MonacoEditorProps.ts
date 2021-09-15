import { DetailedHTMLProps, HTMLAttributes } from 'react'
import type { monaco } from './setupMonaco'

export type MonacoEditorProps = {
  initialValue?: string
  value?: string
  onChange?: (value: string) => any
  containerProps?: DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  editorOptions?: monaco.editor.IStandaloneEditorConstructionOptions
  onMount?: (
    editor: monaco.editor.IStandaloneCodeEditor,
    monacoInstance: typeof monaco,
  ) => void
  onBeforeMount?: (monacoInstance: typeof monaco) => void
}
