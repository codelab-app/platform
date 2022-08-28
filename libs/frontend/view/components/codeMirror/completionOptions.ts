import {
  IAnyType,
  IPrimitiveTypeKind,
  IPropData,
  ITypeKind,
} from '@codelab/shared/abstract/core'
import { Completion } from '@codemirror/autocomplete'
import { capitalize, isArray, isObjectLike } from 'lodash'

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

export const stateCompletionOptions = (
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
        stateCompletionOptions(v, `${key}.${index}`),
      )

      return [option, ...children]
    }

    if (isObjectLike(value)) {
      return [option, ...stateCompletionOptions(value, key)]
    }

    return [option]
  })
