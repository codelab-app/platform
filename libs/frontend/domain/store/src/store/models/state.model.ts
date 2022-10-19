import {
  IPropData,
  IState,
  STATE_PATH_TEMPLATE_REGEX,
} from '@codelab/frontend/abstract/core'
import merge from 'lodash/merge'
import omit from 'lodash/omit'
import { Model, model, modelAction, prop } from 'mobx-keystone'
import {
  hasStateExpression,
  isSingleStateExpression,
  stripStateExpression,
} from './state.utils'

@model('@codelab/State')
export class State
  extends Model(() => ({
    data: prop<IPropData>(() => ({})),
  }))
  implements IState
{
  @modelAction
  set(key: string, value: object) {
    this.data = merge(this.data, { [key]: value })
  }

  @modelAction
  setMany(data: IPropData) {
    this.data = merge(this.data, data)
  }

  @modelAction
  delete(key: string) {
    this.data = omit(this.data, key)
  }

  @modelAction
  get(key: string) {
    return this.data[key]
  }

  @modelAction
  evaluateExpression(expression: string) {
    try {
      const code = `return ${stripStateExpression(expression)}`

      // eslint-disable-next-line no-new-func
      return new Function(code).call(this.data)
    } catch (error) {
      console.log(error)

      return expression
    }
  }

  @modelAction
  getByExpression(key: string) {
    if (!hasStateExpression(key)) {
      return key
    }

    /**
     * return typed value for : {{expression}}
     */
    if (isSingleStateExpression(key)) {
      return this.evaluateExpression(key)
    }

    /**
     * return string value for : [text1]? {{expression1}} [text2]? {{expression2}}...
     */
    return key.replace(STATE_PATH_TEMPLATE_REGEX, (v) =>
      this.evaluateExpression(v),
    )
  }
}
