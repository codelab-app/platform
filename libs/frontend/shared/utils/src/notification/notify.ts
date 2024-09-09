import type { Notification } from '@codelab/shared/abstract/types'
import { notification } from 'antd'
import { isFunction } from 'remeda'

export const notify = <TEvent>(
  options: Notification<TEvent>,
  event?: TEvent,
) => {
  const { description, title, type = 'info' } = options

  const resolveValue = <T>(
    valueOrFunction: T | ((event: TEvent) => T),
    _event: TEvent | undefined,
  ): T => {
    if (isFunction(valueOrFunction)) {
      if (_event === undefined) {
        throw new Error(
          'Event must be provided if description or title is a function',
        )
      }

      return valueOrFunction(_event)
    }

    return valueOrFunction
  }

  const resolvedDescription = resolveValue(description, event)
  const resolvedTitle = resolveValue(title, event)

  notification[type]({
    description: resolvedDescription,
    message: resolvedTitle,
    placement: 'topRight',
  })

  /**
   * Log to console
   */
  if (type === 'warning') {
    console.warn(title, description)
  } else if (type === 'error') {
    console.error(title, description)
  } else {
    console.log(title, description)
  }
}
