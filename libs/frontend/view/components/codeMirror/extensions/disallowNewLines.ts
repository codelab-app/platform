import { EditorState } from '@codemirror/state'

// Forbids from entering new lines in the field
export const disallowNewLines = (singleLineInput?: boolean) =>
  EditorState.transactionFilter.of((tr) =>
    tr.newDoc.lines > 1 && singleLineInput ? [] : tr,
  )
