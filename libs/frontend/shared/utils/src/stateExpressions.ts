import type { IPropData } from '@codelab/frontend/abstract/core'
import {
  STATE_PATH_TEMPLATE_END,
  STATE_PATH_TEMPLATE_REGEX,
  STATE_PATH_TEMPLATE_START,
} from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { mapDeep } from '@codelab/shared/utils'
import isString from 'lodash/isString'

export const hasStateExpression = (str: string): boolean =>
  isString(str) &&
  str.includes(STATE_PATH_TEMPLATE_START) &&
  str.includes(STATE_PATH_TEMPLATE_END)

export const isSingleStateExpression = (str: string) =>
  str.startsWith(STATE_PATH_TEMPLATE_START) &&
  str.endsWith(STATE_PATH_TEMPLATE_END)

export const stripStateExpression = (expression: string) =>
  expression.substring(2, expression.length - 2).trim()

export const evaluateExpression = (
  expression: string,
  evaluationContext: IPropData,
) => {
  try {
    const code = `return ${stripStateExpression(expression)}`

    // eslint-disable-next-line no-new-func
    return new Function(code).call(evaluationContext)
  } catch (error) {
    console.log(error)

    return expression
  }
}

export const replaceStateInProps = (
  props: IPropData,
  context: IPropData = {},
) => {
  props = mapDeep(
    props,
    // value mapper
    (value, key) => (isString(value) ? getByExpression(value, context) : value),
    // key mapper
    (value, key) =>
      (isString(key) ? getByExpression(key, context) : key) as string,
  )

  return props
}

export const getByExpression = (key: string, context: IPropData) => {
  if (!hasStateExpression(key)) {
    return key
  }

  /**
   * return typed value for : {{expression}}
   */
  if (isSingleStateExpression(key)) {
    return evaluateExpression(key, context)
  }

  /**
   * return string value for : [text1]? {{expression1}} [text2]? {{expression2}}...
   */
  return key.replace(STATE_PATH_TEMPLATE_REGEX, (value) =>
    evaluateExpression(value, context),
  )
}

interface ExpressionTransformer {
  initialized: boolean
  transform: Nullable<(code: string) => { code: string | null }>
  init: () => Promise<void>
  transpileAndEvaluateExpression: (
    expression: string,
    evaluationContext: IPropData,
  ) => unknown
}

export const expressionTransformer: ExpressionTransformer = {
  transform: null,
  initialized: false,
  init: async function () {
    if (this.initialized) {
      return
    }

    const { transform } = await import('buble')

    this.transform = transform
    this.initialized = true
  },
  transpileAndEvaluateExpression: function (
    expression: string,
    evaluationContext: IPropData,
  ) {
    if (!this.transform) {
      throw new Error(
        'BabelExpressionsTranspiler needs to be initialized first. Make sure to call "init" first.',
      )
    }

    try {
      const wrappedExpression = `(function getResult() {
            const { React } = this
      
            return ${stripStateExpression(expression)}
          }).call(this)`

      const { code } = this.transform(wrappedExpression)

      // eslint-disable-next-line no-new-func
      return new Function('return ' + (code ?? '')).call(evaluationContext)
    } catch (error) {
      console.log(error)

      return expression
    }
  },
}
