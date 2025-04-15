import type { Notification } from '@codelab/shared-abstract-types'
import type { NotificationInstance } from 'antd/es/notification/interface'

import { isFunction } from 'remeda'

export interface NotifyOptions<TEvent>
  extends Omit<Notification<TEvent>, 'description'> {
  // make description optional, so that we do not need to explicitly
  // pass { description: '' } if we do not need it
  description?: ((event: TEvent) => string) | string
}

export const notify = <TEvent>(
  api: NotificationInstance,
  options: NotifyOptions<TEvent>,
  event?: TEvent,
) => {
  const { description = '', title, type = 'info' } = options

  const resolveValue = <T>(
    valueOrFunction: ((event: TEvent) => T) | T,
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

  api[type]({
    description: resolvedDescription,
    message: resolvedTitle,
    placement: 'topRight',
    // do not close error notification automatically.
    // let users more time to read and analize error decription.
    ...(type === 'error' ? { duration: null } : null),
  })

  /**
   * Log to console
   */
  // if (type === 'warning') {
  //   console.warn(resolvedTitle, resolvedDescription)
  // } else if (type === 'error') {
  //   console.error(resolvedTitle, resolvedDescription)
  // } else if (type === 'info') {
  //   console.info(resolvedTitle, resolvedDescription)
  // } else {
  //   console.log(resolvedTitle, resolvedDescription)
  // }
}
