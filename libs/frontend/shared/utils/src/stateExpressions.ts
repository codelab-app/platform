import jsxPlugin from '@babel/plugin-transform-react-jsx'
import { registerPlugin, transform } from '@babel/standalone'
import {
  IPropData,
  STATE_PATH_TEMPLATE_END,
  STATE_PATH_TEMPLATE_START,
} from '@codelab/frontend/abstract/core'
import isString from 'lodash/isString'

registerPlugin('@babel/plugin-transform-react-jsx', jsxPlugin)

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

export const transpileAndEvaluateExpression = (
  expression: string,
  evaluationContext: IPropData,
) => {
  try {
    const wrappedExpression = `(function getResult() {
      const { React } = this

      return ${stripStateExpression(expression)}
    }).call(this)`

    const { code } = transform(wrappedExpression, {
      plugins: ['@babel/plugin-transform-react-jsx'],
    })

    // eslint-disable-next-line no-new-func
    return new Function('return ' + (code ?? '')).call(evaluationContext)
  } catch (error) {
    console.log(error)

    return expression
  }
}
