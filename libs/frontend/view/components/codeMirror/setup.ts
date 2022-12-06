import type { Completion, CompletionSource } from '@codemirror/autocomplete'
import {
  autocompletion,
  closeBrackets,
  closeBracketsKeymap,
  completionKeymap,
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
import type { Extension } from '@codemirror/state'
import { EditorState } from '@codemirror/state'
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
import { completionSource, disallowNewLines } from './extensions'

const keymaps = keymap.of([
  ...completionKeymap,
  ...closeBracketsKeymap,
  ...defaultKeymap,
  ...searchKeymap,
  ...historyKeymap,
  ...foldKeymap,
  ...lintKeymap,
])

// customized version of the original default extension https://github.com/codemirror/basic-setup/blob/main/src/basic-setup.ts
export const basicSetup = (singleLine?: boolean): Extension => [
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
  disallowNewLines(singleLine),
  keymaps,
]

interface Options {
  singleLine?: boolean
  languageSource?: CompletionSource
  languageOptions?: Array<Completion>
  customOptions?: Array<Completion>
}

export const defaultExtensions = ({
  singleLine,
  languageSource,
  languageOptions,
  customOptions,
}: Options) => [
  basicSetup(singleLine),
  autocompletion({
    defaultKeymap: false,
    activateOnTyping: true,
    override: [
      completionSource({ languageSource, languageOptions, customOptions }),
    ],
  }),
]
