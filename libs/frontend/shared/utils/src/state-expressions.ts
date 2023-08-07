import type { IPropData } from '@codelab/frontend/abstract/core'
import {
  isTypedProp,
  STATE_PATH_TEMPLATE_END,
  STATE_PATH_TEMPLATE_END_REGEX,
  STATE_PATH_TEMPLATE_REGEX,
  STATE_PATH_TEMPLATE_START,
  STATE_PATH_TEMPLATE_START_REGEX,
} from '@codelab/frontend/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { mapDeep } from '@codelab/shared/utils'
import isString from 'lodash/isString'

export const hasStateExpression = (str: unknown): boolean =>
  isString(str) &&
  str.includes(STATE_PATH_TEMPLATE_START) &&
  str.includes(STATE_PATH_TEMPLATE_END)

export const isSingleStateExpression = (str: string) =>
  str.startsWith(STATE_PATH_TEMPLATE_START) &&
  str.endsWith(STATE_PATH_TEMPLATE_END) &&
  str.match(STATE_PATH_TEMPLATE_START_REGEX)?.length === 1 &&
  str.match(STATE_PATH_TEMPLATE_END_REGEX)?.length === 1

export const stripStateExpression = (expression: string) => {
  return isSingleStateExpression(expression)
    ? expression.substring(2, expression.length - 2).trim()
    : expression.replace(STATE_PATH_TEMPLATE_REGEX, (subExpression) =>
        subExpression.substring(2, subExpression.length - 2).trim(),
      )
}

export const evaluateExpression = (
  expression: string,
  state: IPropData,
  rootState: IPropData = {},
  props: IPropData = {},
  refs: IPropData = {},
  rootRefs: IPropData = {},
  urlProps: IPropData = {},
) => {
  try {
    const code = `return ${stripStateExpression(expression)}`

    // eslint-disable-next-line no-new-func
    return new Function(
      'state',
      'rootState',
      'props',
      'refs',
      'rootRefs',
      'url',
      code,
    )(state, rootState, props, refs, rootRefs, urlProps)
  } catch (error) {
    console.log(error)

    return expression
  }
}

export const replaceStateInProps = (
  props: IPropData,
  state: IPropData = {},
  rootState: IPropData = {},
  injectedProps: IPropData = {},
  refs: IPropData = {},
  rootRefs: IPropData = {},
  urlProps: IPropData = {},
) =>
  mapDeep(
    props,
    // value mapper
    (value) => {
      if (isString(value)) {
        return getByExpression(
          value,
          state,
          rootState,
          injectedProps,
          refs,
          rootRefs,
          urlProps,
        )
      }

      // ReactNodeType can accept a string and will be rendered as a normal html node
      // FIXME: this validation should be in transformer
      if (
        isTypedProp(value) &&
        value.kind === ITypeKind.ReactNodeType &&
        isString(value.value) &&
        hasStateExpression(value.value)
      ) {
        return value.value
      }

      return value
    },
    // key mapper
    (_, key) =>
      (isString(key)
        ? getByExpression(
            key,
            state,
            rootState,
            injectedProps,
            refs,
            rootRefs,
            urlProps,
          )
        : key) as string,
  )

const getByExpression = (
  key: string,
  state: IPropData,
  rootState: IPropData,
  props: IPropData = {},
  refs: IPropData = {},
  rootRefs: IPropData = {},
  urlProps: IPropData = {},
) => {
  if (!hasStateExpression(key)) {
    return key
  }

  /**
   * return typed value for : {{expression}}
   */
  if (isSingleStateExpression(key)) {
    return evaluateExpression(
      key,
      state,
      rootState,
      props,
      refs,
      rootRefs,
      urlProps,
    )
  }

  /**
   * return string value for : [text1]? {{expression1}} [text2]? {{expression2}}...
   */
  return key.replace(STATE_PATH_TEMPLATE_REGEX, (value) =>
    evaluateExpression(
      value,
      state,
      rootState,
      props,
      refs,
      rootRefs,
      urlProps,
    ),
  )
}
