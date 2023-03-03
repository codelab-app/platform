import type { IPropData } from '@codelab/frontend/abstract/core'
import type { Completion } from '@codemirror/autocomplete'
import capitalize from 'lodash/capitalize'
import isArray from 'lodash/isArray'
import isElement from 'lodash/isElement'
import isObjectLike from 'lodash/isObjectLike'

// for making autocomplete of code mirror
export const createAutoCompleteOptions = (
  context: IPropData = {},
  parentKey = '',
): Array<Completion> =>
  Object.entries(context).flatMap(([key, value]) => {
    const option = {
      detail: capitalize(typeof value),
      label: parentKey ? `${parentKey}.${key}` : key,
      type: typeof value == 'function' ? 'function' : 'variable',
    }

    if (isArray(value)) {
      // [item1, item2 ...] = value
      const children = value.flatMap((_value, index) =>
        // [...autoComplete of item1 [option1,2...], ...autoComplete of item2, ...]
        createAutoCompleteOptions(_value, `${key}.${index}`),
      )

      return [option, ...children]
    }

    if (isObjectLike(value) && !isElement(value)) {
      return [option, ...createAutoCompleteOptions(value, key)]
    }

    return [option]
  })
