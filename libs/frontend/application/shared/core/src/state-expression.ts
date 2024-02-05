import type { IEvaluationContext } from '@codelab/frontend/abstract/application'
import {
  STATE_PATH_TEMPLATE_END_REGEX,
  STATE_PATH_TEMPLATE_REGEX,
  STATE_PATH_TEMPLATE_START_REGEX,
} from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import { mapDeep } from '@codelab/shared/utils'
import get from 'lodash/get'
import isString from 'lodash/isString'
import keys from 'lodash/keys'
import {
  STATE_PATH_TEMPLATE_END,
  STATE_PATH_TEMPLATE_START,
} from './state-expression.constants'

export const hasExpression = (str: unknown): boolean =>
  isString(str) &&
  str.includes(STATE_PATH_TEMPLATE_START) &&
  str.includes(STATE_PATH_TEMPLATE_END)

export const evaluateObject = (
  props: IPropData,
  context: IEvaluationContext,
) => {
  return mapDeep(
    props,
    // value mapper
    (value) => (isString(value) ? getByExpression(value, context) : value),
    // key mapper
    (_, key) => (isString(key) ? getByExpression(key, context) : key) as string,
  )
}

export const isSingleExpression = (str: string) =>
  str.startsWith(STATE_PATH_TEMPLATE_START) &&
  str.endsWith(STATE_PATH_TEMPLATE_END) &&
  str.match(STATE_PATH_TEMPLATE_START_REGEX)?.length === 1 &&
  str.match(STATE_PATH_TEMPLATE_END_REGEX)?.length === 1

export const stripExpression = (expression: string) => {
  return isSingleExpression(expression)
    ? expression.substring(2, expression.length - 2).trim()
    : expression.replace(STATE_PATH_TEMPLATE_REGEX, (subExpression) =>
        subExpression.substring(2, subExpression.length - 2).trim(),
      )
}

const getByExpression = (
  expressionValue: string,
  context: IEvaluationContext,
) => {
  if (!hasExpression(expressionValue)) {
    return expressionValue
  }

  /**
   * return typed value for : {{expression}}
   */
  if (isSingleExpression(expressionValue)) {
    return evaluateExpression(expressionValue, context)
  }

  const data = expressionValue.replace(STATE_PATH_TEMPLATE_REGEX, (value) =>
    evaluateExpression(value, context),
  )

  console.log('expressionResults', data)

  return data
}

export const evaluateExpression = <IContext>(
  expression: string,
  context: IContext,
) => {
  try {
    const code = `return ${stripExpression(expression)}`
    const contextKeys = keys(context).sort()

    // eslint-disable-next-line no-new-func
    return new Function(contextKeys.join(','), code)(
      contextKeys.map((key) => get(context, key)),
    )
  } catch (error) {
    console.log(error)

    return expression
  }
}
