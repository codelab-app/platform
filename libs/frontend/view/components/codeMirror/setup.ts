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
import type { Extension } from '@codemirror/state'
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
import { completionSource } from './extensions'

// customized version of the original default extension https://github.com/codemirror/basic-setup/blob/main/src/basic-setup.ts
export const basicSetup = async (singleLine?: boolean): Promise<Extension> => {
  const [
    { highlightSelectionMatches, searchKeymap },
    { lintKeymap },
    { EditorState },
  ] = await Promise.all([
    import('@codemirror/search'),
    import('@codemirror/lint'),
    import('@codemirror/state'),
  ])

  // Forbids from entering new lines in the field
  const disallowNewLines = (singleLineInput?: boolean) =>
    EditorState.transactionFilter.of((tr) =>
      tr.newDoc.lines > 1 && singleLineInput ? [] : tr,
    )

  const keymaps = keymap.of([
    ...completionKeymap,
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...lintKeymap,
  ])

  return [
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
}

interface Options {
  singleLine?: boolean
  languageSource?: CompletionSource
  languageOptions?: Array<Completion>
  customOptions?: Array<Completion>
}

export const getDefaultExtensions = async ({
  customOptions,
  languageOptions,
  languageSource,
  singleLine,
}: Options) => [
  await basicSetup(singleLine),
  autocompletion({
    activateOnTyping: true,
    defaultKeymap: false,
    override: [
      completionSource({ customOptions, languageOptions, languageSource }),
    ],
  }),
]
