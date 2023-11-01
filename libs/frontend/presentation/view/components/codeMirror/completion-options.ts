import type { IEvaluationContext } from '@codelab/frontend/abstract/application'
import { propSafeStringify } from '@codelab/frontend/domain/prop'
import type { IPropData } from '@codelab/shared/abstract/core'
import { isCyclic } from '@codelab/shared/utils'
import type { Completion } from '@codemirror/autocomplete'
import capitalize from 'lodash/capitalize'
import isArray from 'lodash/isArray'
import isElement from 'lodash/isElement'
import isObjectLike from 'lodash/isObjectLike'

const getSectionOptions = (
  context: IPropData = {},
  parentKey: string,
  sectionName: string,
): Array<Completion> =>
  Object.entries(context).flatMap(([key, value]) => {
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
        getSectionOptions(_value, `${fullKey}.${index}`, sectionName),
      )

      return [option, ...children]
    }

    if (isObjectLike(value) && !isElement(value)) {
      return [option, ...getSectionOptions(value, fullKey, sectionName)]
    }

    return [option]
  })

// for making autocomplete of code mirror
export const createAutoCompleteOptions = ({
  componentProps,
  props,
  refs,
  rootRefs,
  rootState,
  state,
  url,
}: IEvaluationContext): Array<Completion> => [
  ...getSectionOptions(componentProps, 'componentProps', 'Component Props'),
  ...getSectionOptions(props, 'props', 'Element Props'),
  ...getSectionOptions(state, 'state', 'Store State'),
  ...getSectionOptions(refs, 'refs', 'References'),
  ...getSectionOptions(rootState, 'rootState', 'Root State'),
  ...getSectionOptions(rootRefs, 'rootRefs', 'Root References'),
  ...getSectionOptions(url, 'url', 'Urls'),
]
