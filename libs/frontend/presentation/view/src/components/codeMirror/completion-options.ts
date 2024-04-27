import type { IEvaluationContext } from '@codelab/frontend/abstract/application'
import { propSafeStringify } from '@codelab/frontend/domain/prop'
import type { IPropData } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import { isCyclic } from '@codelab/shared/utils'
import type { Completion } from '@codemirror/autocomplete'
import capitalize from 'lodash/capitalize'
import isArray from 'lodash/isArray'
import isElement from 'lodash/isElement'
import isObjectLike from 'lodash/isObjectLike'

const getOptions = (
  ctx: IPropData = {},
  parentKey: string,
  sectionName: string,
): Array<Completion> =>
  Object.entries(ctx).flatMap(([key, value]) => {
    const fullKey = `${parentKey}.${key}`

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
        getOptions(_value, `${fullKey}.${index}`, sectionName),
      )

      return [option, ...children]
    }

    if (isObjectLike(value) && !isElement(value)) {
      return [option, ...getOptions(value, fullKey, sectionName)]
    }

    return [option]
  })

// for making autocomplete of code mirror
export const createAutoCompleteOptions = (
  ctx: Maybe<IEvaluationContext>,
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
