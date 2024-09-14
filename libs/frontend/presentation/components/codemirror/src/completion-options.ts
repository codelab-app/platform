import type { IRuntimeContext } from '@codelab/frontend/abstract/application'
import { propSafeStringify } from '@codelab/frontend-domain-prop/utils'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { isCyclic, isDomElement } from '@codelab/shared/utils'
import type { Completion } from '@codemirror/autocomplete'
import { capitalize, isArray, isObjectType } from 'remeda'

const getOptions = (
  ctx: IPropData = {},
  parentKey: string,
  sectionName: string,
): Array<Completion> =>
  Object.entries(ctx).flatMap(([key, value]) => {
    const fullKey = key.includes('-')
      ? `${parentKey}['${key}']`
      : `${parentKey}.${key}`

    const option: Completion = {
      detail: capitalize(typeof value),
      info: propSafeStringify({ value }),
      label: fullKey,
      section: { name: sectionName },
      type: typeof value == 'function' ? 'function' : 'variable',
    }

    if (isCyclic(value)) {
      return [option]
    }

    if (isArray(value)) {
      const children = value.flatMap((_value, index) =>
        getOptions(_value as IPropData, `${fullKey}.${index}`, sectionName),
      )

      return [option, ...children]
    }

    if (isObjectType(value) && !isDomElement(value)) {
      return [option, ...getOptions(value, fullKey, sectionName)]
    }

    return [option]
  })

// for making autocomplete of code mirror
export const createAutoCompleteOptions = (
  ctx: Maybe<IRuntimeContext>,
): Array<Completion> => [
  ...getOptions(ctx?.componentProps, 'componentProps', 'Component Props'),
  ...getOptions(ctx?.props, 'props', 'Element Props'),
  ...getOptions(ctx?.state, 'state', 'Store State'),
  ...getOptions(ctx?.refs, 'refs', 'References'),
  ...getOptions(ctx?.rootState, 'rootState', 'Root State'),
  ...getOptions(ctx?.rootRefs, 'rootRefs', 'Root References'),
  ...getOptions(ctx?.urlProps, 'urlProps', 'Url Props'),
  ...getOptions(ctx?.rootActions, 'rootActions', 'Root Actions'),
  ...getOptions(ctx?.actions, 'actions', 'Actions'),
  ...getOptions(ctx?.args, 'args', 'Args'),
]
