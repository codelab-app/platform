import {
  STATE_PATH_TEMPLATE_START,
  STATE_PATH_TEMPLATE_START_OPEN_REGEX,
  STATE_PATH_TEMPLATE_START_REGEX,
} from '@codelab/frontend/abstract/core'
import {
  closeBrackets,
  closeBracketsKeymap,
  Completion,
  CompletionContext,
  completionKeymap,
  CompletionSource,
  insertBracket,
  startCompletion,
} from '@codemirror/autocomplete'
import { defaultKeymap, history, historyKeymap } from '@codemirror/commands'
import {
  bracketMatching,
  defaultHighlightStyle,
  foldGutter,
  foldKeymap,
  indentOnInput,
  syntaxHighlighting,
} from '@codemirror/language'
import { lintKeymap } from '@codemirror/lint'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { EditorState, Extension } from '@codemirror/state'
import {
  crosshairCursor,
  drawSelection,
  dropCursor,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightSpecialChars,
  keymap,
  rectangularSelection,
} from '@codemirror/view'
import { Command, EditorView } from '@uiw/react-codemirror'

// Forbids from entering new lines in the field
export const disallowNewLines = EditorState.transactionFilter.of((tr) =>
  tr.newDoc.lines > 1 ? [] : tr,
)

// returns true if STATE_PATH_TEMPLATE_START_OPEN_REGEX finds something in the text on the left of the cursor
const checkForOpenLeftSideBracket = (context: CompletionContext): boolean => {
  // code adapted from context.matchBefore fn
  const line = context.state.doc.lineAt(context.pos)
  const start = Math.max(line.from, context.pos - 250)
  const str = line.text.slice(start - line.from, context.pos - line.from)
  const found = str.search(STATE_PATH_TEMPLATE_START_OPEN_REGEX)

  return found >= 0
}

export const makeCompletionOptionsFromObjectKeys = (
  autocompleteContext: any,
): Array<Completion> => {
  return Object.entries(autocompleteContext || {}).map(([key, value]) => ({
    label: key,
    type: typeof value == 'function' ? 'function' : 'variable',
  }))
}

export const completionsFactory = (
  defaultCompletionOptions?: Array<Completion>,
  templateCompletionOptions?: Array<Completion>,
): CompletionSource => {
  // get all keys from autocompleteContext and add them as options
  // TODO allow nested object completion using . notation

  return (context) => {
    const word = context.matchBefore(/\w*/)
    const hasOpenLeftSideBracket = checkForOpenLeftSideBracket(context)
    const from = word?.from ?? context.pos

    if (!hasOpenLeftSideBracket) {
      return defaultCompletionOptions
        ? { from, options: defaultCompletionOptions }
        : null
    }

    return {
      from,
      options: [
        ...(defaultCompletionOptions ?? []),
        ...(templateCompletionOptions ?? []),
      ],
      validFor: new RegExp(
        `^([\\w$]*)|(${STATE_PATH_TEMPLATE_START_REGEX.toString()})$`,
      ),
    }
  }
}

const getTextBeforeCursor = (view: EditorView): string => {
  const currentSelectionFrom = view.state.selection.ranges[0].from

  return view.state.doc.sliceString(
    currentSelectionFrom - 1,
    currentSelectionFrom,
  )
}

if (STATE_PATH_TEMPLATE_START !== '{{') {
  // The insertBracketAndStartCompletion and the '{' key in the keymap bellow is configured to use double brackets
  // if we change the template notify the developer to change them too
  throw new Error(
    "STATE_PATH_TEMPLATE_START is changed, update 'codemirror-extensions.insertBracketAndStartCompletion' too",
  )
}

const insertBracketAndStartCompletion: Command = (view) => {
  const textBeforeCursor = getTextBeforeCursor(view)
  // insert the bracket
  const toInsert = insertBracket(view.state, '{')

  if (toInsert) {
    view.dispatch(toInsert)
  }

  // if we already have one bracket, start completion
  console.log('starting manually')

  if (textBeforeCursor === '{') {
    startCompletion(view)
  }

  return true
}

// customized version of the original default extension https://github.com/codemirror/basic-setup/blob/main/src/basic-setup.ts
export const basicSetup: Extension = [
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  rectangularSelection(),
  crosshairCursor(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...completionKeymap,
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...lintKeymap,
    { key: '{', run: insertBracketAndStartCompletion },
  ]),
  disallowNewLines,
]
