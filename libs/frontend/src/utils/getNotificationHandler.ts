import { notification } from 'antd'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export interface NotificationOptions {
  /** The type of notification. Default is error */
  type?: NotificationType
  /** Enter a custom title of the notification. If you don't, it will be "Error" */
  title?: string
  /** Enter a custom content of the notification. If you don't, it will be inferred from the error message, if found */
  content?: string
}

const defaultOptions: NotificationOptions = {
  type: 'error',
}

const inferErrorMessage = (e: any) => {
  return e?.data?.message || e?.message
}

/**
 * Returns a function that can be used as standalone notification function:
 * const notify = getNotify({...options})
 * notify()
 *
 * Or as an error handler directly
 * e.g.:
 *  .catch(notifyError({...options}))
 */
export const getNotificationHandler = (
  o: NotificationOptions = defaultOptions,
) => (e: any = undefined) => {
  let { content, title, type } = { ...defaultOptions, ...o }

  if (!content) {
    content = inferErrorMessage(e)
  }

  if (!title) title = 'Error'

  if (!type) type = 'info'

  notification[type]({
    message: title,
    description: content,
    placement: 'bottomRight',
  })
}
