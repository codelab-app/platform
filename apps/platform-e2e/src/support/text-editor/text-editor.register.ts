import type { CypressCommand } from '../types'
import { typeIntoTextEditor } from './text-editor.command'

export interface CypressTextEditorCommands {
  typeIntoTextEditor: typeof typeIntoTextEditor
}

export const textEditorCommands: Array<CypressCommand> = [
  {
    fn: typeIntoTextEditor,
    name: 'typeIntoTextEditor',
  },
]
