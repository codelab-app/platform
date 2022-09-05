import { insertBracket, startCompletion } from '@codemirror/autocomplete'
import { EditorView } from '@codemirror/view'

const getTextBeforeCursor = (view: EditorView): string => {
  const selectionFrom = view.state.selection.ranges[0].from

  return view.state.doc.sliceString(selectionFrom - 1, selectionFrom)
}

const startCompletionOnDoubleBracket = (view: EditorView) => {
  const textBeforeCursor = getTextBeforeCursor(view)
  // insert the bracket
  const toInsert = insertBracket(view.state, '{')

  if (toInsert) {
    view.dispatch(toInsert)
  }

  // if we already have one bracket, start completion
  if (textBeforeCursor === '{') {
    startCompletion(view)
  }

  return true
}

export const completionCustomKeymap = [
  { key: '{', run: startCompletionOnDoubleBracket },
]
