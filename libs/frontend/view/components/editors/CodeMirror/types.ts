import { Nullish } from '@codelab/shared/abstract/types'
import { Completion, CompletionSource } from '@codemirror/autocomplete'
import { Extension, ReactCodeMirrorProps } from '@uiw/react-codemirror'

export interface CodeMirrorInputProps
  extends Omit<ReactCodeMirrorProps, 'title'> {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  defaultCompletionSource?: CompletionSource
  defaultCompletionOptions?: Array<Completion>
  templateCompletionOptions?: Array<Completion>
  extensions?: Array<Extension>
  shouldDisableNewLines?: boolean
  expandable?: boolean
  title?: Nullish<string>
}
