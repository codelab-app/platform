import type { IPropData } from '@codelab/frontend/abstract/core'
import type { Completion } from '@codemirror/autocomplete'
import capitalize from 'lodash/capitalize'
import isArray from 'lodash/isArray'
import isElement from 'lodash/isElement'
import isObjectLike from 'lodash/isObjectLike'
import { modelTypeKey } from 'mobx-keystone'

const isReactNode = (obj?: IPropData) => Boolean(obj?.['$$typeof'])
const isMobxModel = (obj?: IPropData) => Boolean(obj?.[modelTypeKey])
const isHtmlNode = (obj: unknown) => obj instanceof HTMLElement

const isCyclic = (obj?: IPropData) =>
  (isObjectLike(obj) && isReactNode(obj)) || isMobxModel(obj) || isHtmlNode(obj)

// for making autocomplete of code mirror
export const createAutoCompleteOptions = (
  context: IPropData = {},
  parentKey = '',
): Array<Completion> => {
  return Object.entries(context).flatMap(([key, value]) => {
    const option = {
      detail: capitalize(typeof value),
      label: parentKey ? `${parentKey}.${key}` : key,
      type: typeof value == 'function' ? 'function' : 'variable',
    }

    if (isCyclic(value)) {
      return [option]
    }

    if (isArray(value)) {
      const children = value.flatMap((_value, index) =>
        createAutoCompleteOptions(_value, `${key}.${index}`),
      )

      return [option, ...children]
    }

    if (isObjectLike(value) && !isElement(value)) {
      return [option, ...createAutoCompleteOptions(value, key)]
    }

    return [option]
  })
}
