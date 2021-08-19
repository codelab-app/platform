import { notification } from 'antd'
import { ReactNode } from 'react'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export interface NotificationOptions<TEvent> {
  /** The type of notification. Default is error */
  type?: NotificationType
  /** Enter a custom title of the notification. If you don't, it will be "info" */
  title?: string | ((e: TEvent | undefined) => string)
  /** Enter a custom content of the notification. If you don't, it will be inferred from the error message, if found */
  content?: string | ((e: TEvent | undefined) => string) | ReactNode
}

const defaultOptions: NotificationOptions<any> = {
  type: 'error',
}

const inferErrorMessage = (e: any) => {
  return e?.data?.message || e?.message
}

export const notify = <TEvent extends any>(
  options: NotificationOptions<TEvent>,
  e: TEvent | undefined = undefined,
) => {
  const { content, type, title } = { ...defaultOptions, ...options }
  let message
  let description

  if (typeof title === 'string') {
    message = title
  } else if (typeof title === 'function') {
    message = title(e)
  } else {
    message = 'Error'
  }

  if (typeof content === 'string') {
    description = content
  } else if (typeof content === 'function') {
    description = content(e)
    // React object
  } else if (typeof content === 'object') {
    description = content
  } else {
    description = inferErrorMessage(e)
  }

  notification[type || 'info']({
    message: message,
    description: 'hello',
    placement: 'bottomRight',
  })

  if (type === 'warning') {
    console.warn(message, description)
  } else if (type === 'error') {
    console.error(message, description)
  } else {
    console.log(message, description)
  }
}

/**
 * Returns a function that can be used as standalone notification function:
 * const notify = getNotificationHandler({...options})
 * notify({...someEvent})
 *
 * Or as an error handler directly
 * e.g.:
 *  .catch(getNotificationHandler({...options}))
 */
export const createNotificationHandler = <TEvent extends any>(
  o: NotificationOptions<TEvent> = defaultOptions,
) => {
  return (e: TEvent | undefined = undefined) => {
    notify(o, e)
  }
}
