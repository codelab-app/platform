import { Completion, CompletionSource } from '@codemirror/autocomplete'
import { Extension, ReactCodeMirrorProps } from '@uiw/react-codemirror'

export interface CodeMirrorInputProps extends ReactCodeMirrorProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  defaultCompletionSource?: CompletionSource
  defaultCompletionOptions?: Array<Completion>
  templateCompletionOptions?: Array<Completion>
  extensions?: Array<Extension>
  shouldDisableNewLines?: boolean
}
