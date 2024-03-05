import type { CypressCommand } from '@codelab/frontend/test/cypress/shared'
import { typeIntoTextEditor } from './text-editor.command'

export interface TextEditorCommands {
  typeIntoTextEditor: typeof typeIntoTextEditor
}

export const textEditorCommands: Array<CypressCommand> = [
  {
    fn: typeIntoTextEditor,
    name: 'typeIntoTextEditor',
  },
]
