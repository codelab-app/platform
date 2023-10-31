<<<<<<<< HEAD:libs/frontend/application/shared/core/src/state-expression.ts
import type { IEvaluationContext } from '@codelab/frontend/abstract/application'
========
>>>>>>>> cc511e831 (wip: add auth guard schema):libs/frontend/shared/utils/src/expressions.ts
import {
  IEvaluationContext,
  isTypedProp,
  STATE_PATH_TEMPLATE_END_REGEX,
  STATE_PATH_TEMPLATE_REGEX,
  STATE_PATH_TEMPLATE_START_REGEX,
} from '@codelab/frontend/abstract/domain'
import type { IPropData } from '@codelab/shared/abstract/core'
import { ITypeKind } from '@codelab/shared/abstract/core'
import { mapDeep } from '@codelab/shared/utils'
import get from 'lodash/get'
import isString from 'lodash/isString'
<<<<<<<< HEAD:libs/frontend/application/shared/core/src/state-expression.ts
import {
  STATE_PATH_TEMPLATE_END,
  STATE_PATH_TEMPLATE_START,
} from './state-expression.constants'
========
import keys from 'lodash/keys'
>>>>>>>> cc511e831 (wip: add auth guard schema):libs/frontend/shared/utils/src/expressions.ts

export const hasExpression = (str: unknown): boolean =>
  isString(str) &&
  str.includes(STATE_PATH_TEMPLATE_START) &&
  str.includes(STATE_PATH_TEMPLATE_END)

<<<<<<<< HEAD:libs/frontend/application/shared/core/src/state-expression.ts
export const evaluateObject = (
  props: IPropData,
  context: IEvaluationContext,
) => {
  return mapDeep(
    props,
    // value mapper
    (value) => {
      if (isString(value)) {
        return getByExpression(value, context)
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
    (_, key) => (isString(key) ? getByExpression(key, context) : key) as string,
  )
}

export const isSingleStateExpression = (str: string) =>
========
export const isSingleExpression = (str: string) =>
>>>>>>>> cc511e831 (wip: add auth guard schema):libs/frontend/shared/utils/src/expressions.ts
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

<<<<<<<< HEAD:libs/frontend/application/shared/core/src/state-expression.ts
const getByExpression = (
  expressionValue: string,
  context: IEvaluationContext,
) => {
  if (!hasStateExpression(expressionValue)) {
    return expressionValue
  }

  /**
   * return typed value for : {{expression}}
   */
  if (isSingleStateExpression(expressionValue)) {
    return evaluateExpression(expressionValue, context)
  }

  const data = expressionValue.replace(STATE_PATH_TEMPLATE_REGEX, (value) =>
    evaluateExpression(value, context),
  )

  console.log('expressionResults', data)

  return data
}

export const evaluateExpression = (
========
export const evaluateExpression = <IContext>(
>>>>>>>> cc511e831 (wip: add auth guard schema):libs/frontend/shared/utils/src/expressions.ts
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
<<<<<<<< HEAD:libs/frontend/application/shared/core/src/state-expression.ts
========

export const evaluateObject = <IContext>(
  props: IPropData,
  context: IContext,
) => {
  console.log('evaluateObject', props, context)

  return mapDeep(
    props,
    // value mapper
    (value) => {
      if (isString(value)) {
        return getByExpression<IContext>(value, context)
      }

      // ReactNodeType can accept a string and will be rendered as a normal html node
      // FIXME: this validation should be in transformer
      if (
        isTypedProp(value) &&
        value.kind === ITypeKind.ReactNodeType &&
        isString(value.value) &&
        hasExpression(value.value)
      ) {
        return value.value
      }

      return value
    },
    // key mapper
    (_, key) =>
      (isString(key) ? getByExpression<IContext>(key, context) : key) as string,
  )
}

const getByExpression = <IContext>(
  expressionValue: string,
  context: IContext,
) => {
  console.log('getByExpression', expressionValue)

  if (!hasExpression(expressionValue)) {
    return expressionValue
  }

  /**
   * return typed value for : {{expression}}
   */
  if (isSingleExpression(expressionValue)) {
    return evaluateExpression<IContext>(expressionValue, context)
  }

  const data = expressionValue.replace(STATE_PATH_TEMPLATE_REGEX, (value) =>
    evaluateExpression<IContext>(value, context),
  )

  console.log('expressionResults', data)

  return data
}
>>>>>>>> cc511e831 (wip: add auth guard schema):libs/frontend/shared/utils/src/expressions.ts
