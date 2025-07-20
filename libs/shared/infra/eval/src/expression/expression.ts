import type { IPropData } from '@codelab/shared-abstract-core'
import type { ObjectLike } from '@codelab/shared-abstract-types'

import { mapDeep } from '@codelab/shared-utils'
import { isString, keys } from 'remeda'

import {
  EXP_PATH_TEMPLATE_END,
  EXP_PATH_TEMPLATE_END_REGEX,
  EXP_PATH_TEMPLATE_REGEX,
  EXP_PATH_TEMPLATE_START,
  EXP_PATH_TEMPLATE_START_REGEX,
} from './constants'

export const hasExpression = (str: unknown): boolean =>
  isString(str) &&
  str.includes(EXP_PATH_TEMPLATE_START) &&
  str.includes(EXP_PATH_TEMPLATE_END)

export const evaluateObject = <IContext extends ObjectLike>(
  props: IPropData,
  context: IContext,
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
  str.startsWith(EXP_PATH_TEMPLATE_START) &&
  str.endsWith(EXP_PATH_TEMPLATE_END) &&
  str.match(EXP_PATH_TEMPLATE_START_REGEX)?.length === 1 &&
  str.match(EXP_PATH_TEMPLATE_END_REGEX)?.length === 1

export const stripExpression = (expression: string) => {
  return isSingleExpression(expression)
    ? expression.substring(2, expression.length - 2).trim()
    : expression.replace(EXP_PATH_TEMPLATE_REGEX, (subExpression) =>
        subExpression.substring(2, subExpression.length - 2).trim(),
      )
}

const getByExpression = <IContext extends ObjectLike>(
  expressionValue: string,
  context: IContext,
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

  const data = expressionValue.replace(EXP_PATH_TEMPLATE_REGEX, (value) =>
    evaluateExpression(value, context),
  )

  return data
}

export const evaluateExpression = <IContext extends ObjectLike>(
  expression: string,
  context: IContext,
) => {
  try {
    const code = `return ${stripExpression(expression)}`
    const contextKeys = (keys(context) as Array<string>).sort()

    return new Function(...contextKeys, code)(
      ...contextKeys.map((key) => context[key as keyof IContext]),
    )
  } catch (error) {
    console.log(error)

    return expression
  }
}
