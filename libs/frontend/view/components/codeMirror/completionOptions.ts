import {
  IAnyType,
  IPrimitiveTypeKind,
  IPropData,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { Completion } from '@codemirror/autocomplete'
import { capitalize, isArray, isObjectLike } from 'lodash'

export const stateOptions = (
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
        stateOptions(v, `${key}.${index}`),
      )

      return [option, ...children]
    }

    if (isObjectLike(value)) {
      return [option, ...stateOptions(value, key)]
    }

    return [option]
  })
