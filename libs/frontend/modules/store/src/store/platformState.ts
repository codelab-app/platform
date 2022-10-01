import {
  STATE_PATH_TEMPLATE_END,
  STATE_PATH_TEMPLATE_REGEX,
  STATE_PATH_TEMPLATE_START,
} from '@codelab/frontend/abstract/core'
import get from 'lodash/get'
import isString from 'lodash/isString'

const matchesTemplate = (str: string): boolean =>
  isString(str) &&
  str.includes(STATE_PATH_TEMPLATE_START) &&
  str.includes(STATE_PATH_TEMPLATE_END)

const stripExpression = (expression: string) =>
  expression.substring(2, expression.length - 2)

export const getState = (value: string, state: unknown): any => {
  if (!matchesTemplate(value)) {
    return value
  }

  /**
   * action will have the following format {{actionName}}
   */
  const possibleAction = get(state, stripExpression(value), {})

  if (possibleAction.isAction) {
    return possibleAction.run
  }

  /**
   * state data format "[text1]? {{expression1}} [text2]? {{expression2}}..."
   * therefore we replace all expressions
   */
  return value.replace(STATE_PATH_TEMPLATE_REGEX, (expression) => {
    try {
      // eslint-disable-next-line no-new-func
      return new Function(`return ${stripExpression(expression)}`).call(state)
    } catch (error) {
      console.log(error)

      return expression
    }
  })
}
