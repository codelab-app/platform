import {
  STATE_PATH_TEMPLATE_START,
  STATE_PATH_TEMPLATE_START_OPEN_REGEX,
  STATE_PATH_TEMPLATE_START_REGEX,
} from '@codelab/frontend/abstract/core'
import {
  IAnyType,
  IPrimitiveTypeKind,
  IPropData,
  ITypeKind,
} from '@codelab/shared/abstract/core'
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
import { capitalize, isArray, isObjectLike } from 'lodash'
import { CodeMirrorInputProps } from './types'

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

export const typeCompletionOptions = (
  type: IAnyType,
  reactNodeOptions: Array<{ label: string; detail: string }> = [],
): Array<Completion> => {
  if (
    type.kind === ITypeKind.PrimitiveType &&
    type.primitiveKind === IPrimitiveTypeKind.Boolean
  ) {
    return [
      {
        label: 'true',
        type: 'primitive',
      },
      {
        label: 'false',
        type: 'primitive',
      },
    ]
  }

  if (type.kind === ITypeKind.ReactNodeType) {
    return reactNodeOptions
  }

  if (type.kind === ITypeKind.EnumType) {
    return type.allowedValues.map((av) => ({
      type: 'variable',
      label: av.value,
      detail: av.name ?? undefined,
    }))
  }

  return []
}

export const contextCompletionOptions = (
  context: IPropData = {},
  parentKey = '',
): Array<Completion> =>
  Object.entries(context).flatMap(([key, value]) => {
    const option = {
      label: parentKey ? `${parentKey}.${key}` : key,
      type: typeof value == 'function' ? 'function' : 'variable',
      detail: capitalize(typeof value),
    }

    if (isArray(value)) {
      const children = value.flatMap((v, index) =>
        contextCompletionOptions(v, `${key}.${index}`),
      )

      return [option, ...children]
    }

    if (isObjectLike(value)) {
      return [option, ...contextCompletionOptions(value, key)]
    }

    return [option]
  })

// get all keys from contextOptions and add them as options

export const completionsFactory = ({
  defaultCompletionOptions = [],
  defaultCompletionSource,
  templateCompletionOptions = [],
}: {
  defaultCompletionSource: CodeMirrorInputProps['defaultCompletionSource']
  defaultCompletionOptions: CodeMirrorInputProps['defaultCompletionOptions']
  templateCompletionOptions?: Array<Completion>
}): CompletionSource => {
  return (context) => {
    const word = context.matchBefore(/\w*(\.)?/)
    const hasOpenLeftSideBracket = checkForOpenLeftSideBracket(context)
    const from = word?.from ?? context.pos

    if (!hasOpenLeftSideBracket) {
      if (defaultCompletionSource) {
        return defaultCompletionSource(context)
      }

      return defaultCompletionOptions
        ? { from, options: defaultCompletionOptions }
        : null
    }

    const currentKey = word?.text.replace(/\.\w+$/, '')
    const options = defaultCompletionOptions.concat(templateCompletionOptions)

    return {
      from,
      options:
        !currentKey || currentKey === word?.text
          ? options
          : options.filter((x) => x.label.includes(currentKey)),
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
  if (textBeforeCursor === '{') {
    startCompletion(view)
  }

  return true
}

// customized version of the original default extension https://github.com/codemirror/basic-setup/blob/main/src/basic-setup.ts
export const basicSetup = (shouldDisableNewLines?: boolean): Extension => {
  const exts = [
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
  ]

  if (shouldDisableNewLines) {
    exts.push(disallowNewLines)
  }

  return exts
}
