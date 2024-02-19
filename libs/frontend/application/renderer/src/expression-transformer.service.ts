import type { IExpressionTransformer } from '@codelab/frontend/abstract/domain'
import type { Nullable } from '@codelab/shared/abstract/types'
import { stripExpression } from '@codelab/shared/utils'
import get from 'lodash/get'
import {
  _async,
  _await,
  Model,
  model,
  modelAction,
  modelFlow,
  prop,
} from 'mobx-keystone'
import React from 'react'

@model('@codelab/ExpressionTransformer')
export class ExpressionTransformer
  extends Model({
    initialized: prop<boolean>(false),
  })
  implements IExpressionTransformer
{
  context: Nullable<object> = null

  transform: Nullable<IExpressionTransformer['transform']> = null

  @modelFlow
  init = _async(function* (this: ExpressionTransformer) {
    console.debug('ExpressionTransform.init()')

    const { transform } = yield* _await(import('sucrase'))

    this.context = { React }
    this.transform = transform
    this.initialized = true
  })

  @modelAction
  transpileAndEvaluateExpression(expression: string) {
    if (!this.transform) {
      throw new Error(
        'ExpressionTransformer needs to be initialized first. Make sure to call "init" first.',
      )
    }

    try {
      const wrappedExpression = `(function getResult() {
        const { React } = this

        return ${stripExpression(expression)}
      }).call(this)`

      const { code } = this.transform(wrappedExpression, {
        production: true,
        transforms: ['jsx'],
      })

      // eslint-disable-next-line no-new-func
      return new Function('return ' + (code ?? '')).call(this.context)
    } catch (error) {
      // Do not log expected error when an expression with props or state
      // is used in a ReactNodeType value e.g. {{props.name}}
      if (
        !get(error, 'message', '').match(
          /(\bprops|componentProps|state)\s+is\s+not\s+defined\b/,
        )
      ) {
        console.log('expression', expression)
        console.log(get(error, 'message', ''))
      }

      return expression
    }
  }
}
