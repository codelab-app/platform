import { IPropData } from '@codelab/shared/abstract/core'
import { Completion } from '@codemirror/autocomplete'
import { capitalize, isArray, isObjectLike } from 'lodash'

// for making autocomplete of code mirror
export const createAutoCompleteOptions = (
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
      // [item1, item2 ...] = value
      const children = value.flatMap((v, index) =>
        // [...autoComplete of item1 [option1,2...], ...autoComplete of item2, ...]
        createAutoCompleteOptions(v, `${key}.${index}`),
      )

      return [option, ...children]
    }

    if (isObjectLike(value)) {
      return [option, ...createAutoCompleteOptions(value, key)]
    }

    return [option]
  })
