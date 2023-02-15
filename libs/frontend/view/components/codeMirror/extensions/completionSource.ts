import {
  LAST_WORD_AFTER_DOT_REGEX,
  STATE_PATH_TEMPLATE_START_OPEN_REGEX,
  STATE_PATH_TEMPLATE_START_REGEX,
  WORD_BEFORE_DOT_REGEX,
} from '@codelab/frontend/abstract/core'
import type {
  Completion,
  CompletionContext,
  CompletionSource,
} from '@codemirror/autocomplete'

type CompletionExtension = (input: {
  languageSource?: CompletionSource
  languageOptions?: Array<Completion>
  customOptions?: Array<Completion>
}) => CompletionSource

// returns true if STATE_PATH_TEMPLATE_START_OPEN_REGEX finds something in the text on the left of the cursor
const checkLeftBracket = (context: CompletionContext): boolean => {
  // code adapted from context.matchBefore fn
  const line = context.state.doc.lineAt(context.pos)
  const start = Math.max(line.from, context.pos - 250)
  const str = line.text.slice(start - line.from, context.pos - line.from)
  const found = str.search(STATE_PATH_TEMPLATE_START_OPEN_REGEX)

  return found >= 0
}

export const completionSource: CompletionExtension = (input) => {
  const { languageOptions = [], languageSource, customOptions = [] } = input

  return (context) => {
    const word = context.matchBefore(WORD_BEFORE_DOT_REGEX)
    const isLeftBracketOpen = checkLeftBracket(context)
    const from = word?.from ?? context.pos

    if (!isLeftBracketOpen) {
      return languageSource
        ? languageSource(context)
        : { from, options: languageOptions }
    }

    const currentKey = word?.text.replace(LAST_WORD_AFTER_DOT_REGEX, '')
    const allOptions = languageOptions.concat(customOptions)

    const options =
      !currentKey || currentKey === word?.text
        ? allOptions
        : allOptions.filter(({ label }) => label.includes(currentKey))

    return {
      from,
      options,
      validFor: new RegExp(
        `^([\\w$]*)|(${STATE_PATH_TEMPLATE_START_REGEX.toString()})$`,
      ),
    }
  }
}
