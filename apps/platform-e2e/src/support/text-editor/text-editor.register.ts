import type { CypressCommand } from '@codelab/testing/cypress/command'
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
