import type { BabelFileResult, TransformOptions } from '@babel/core'
import {
  IPropData,
  STATE_PATH_TEMPLATE_END,
  STATE_PATH_TEMPLATE_START,
} from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
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

interface BabelTransformer {
  initialized: boolean
  transform: Nullable<
    (code: string, options: TransformOptions) => BabelFileResult
  >
  init: () => Promise<void>
  transpileAndEvaluateExpression: (
    expression: string,
    evaluationContext: IPropData,
  ) => unknown
}

export const babelTransformer: BabelTransformer = {
  transform: null,
  initialized: false,
  init: async function () {
    if (this.initialized) {
      return
    }

    const [jsxPlugin, { registerPlugin, transform }] = await Promise.all([
      import('@babel/plugin-transform-react-jsx'),
      import('@babel/standalone'),
    ])

    registerPlugin('@babel/plugin-transform-react-jsx', jsxPlugin)

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

      const { code } = this.transform(wrappedExpression, {
        plugins: ['@babel/plugin-transform-react-jsx'],
      })

      // eslint-disable-next-line no-new-func
      return new Function('return ' + (code ?? '')).call(evaluationContext)
    } catch (error) {
      console.log(error)

      return expression
    }
  },
}
