import { notification } from 'antd'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export interface NotificationOptions<TEvent> {
  /** The type of notification. Default is error */
  type?: NotificationType
  /** Enter a custom title of the notification. If you don't, it will be "info" */
  title?: string | ((e: TEvent | undefined) => string)
  /** Enter a custom content of the notification. If you don't, it will be inferred from the error message, if found */
  content?: string | ((e: TEvent | undefined) => string)
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
  let titleString: string
  let contentString: string

  if (typeof title === 'string') {
    titleString = title
  } else if (typeof title === 'function') {
    titleString = title(e)
  } else {
    titleString = 'Error'
  }

  if (typeof content === 'string') {
    contentString = content
  } else if (typeof content === 'function') {
    contentString = content(e)
  } else {
    contentString = inferErrorMessage(e)
  }

  notification[type || 'info']({
    message: titleString,
    description: contentString,
    placement: 'bottomRight',
  })

  if (type === 'warning') {
    console.warn(titleString, contentString)
  } else if (type === 'error') {
    console.error(titleString, contentString)
  } else {
    console.log(titleString, contentString)
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
    console.log(e)
    notify(o, e)
  }
}
