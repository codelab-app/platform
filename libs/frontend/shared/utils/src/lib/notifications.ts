import { ApolloError } from '@apollo/client'
import { Maybe } from '@codelab/shared/abstract/types'
import { notification } from 'antd'
import { extractErrorMessage } from './extractErrorMessage'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export interface NotificationOptions<TEvent = any> {
  /** The type of notification. Default is error */
  type?: NotificationType
  /** Enter a custom title of the notification. If you don't, it will be "info" */
  title?: string | ((e: Maybe<TEvent>) => string)
  /** Enter a custom content of the notification. If you don't, it will be inferred from the error message, if found */
  content?: string | ((e: Maybe<TEvent>) => string)
}

const defaultOptions: NotificationOptions<any> = {
  type: 'error',
}

export const notify = <TEvent>(
  options: NotificationOptions<TEvent>,
  e: Maybe<TEvent> = undefined,
) => {
  const { content, type, title } = { ...defaultOptions, ...options }
  let titleString = ''
  let contentString = ''

  if (typeof title === 'string') {
    titleString = title
  } else if (typeof title === 'function') {
    titleString = title(e)
  } else if (options.type === 'error') {
    titleString = 'Error'
  }

  if (typeof content === 'string') {
    contentString = content
  } else if (typeof content === 'function') {
    contentString = content(e)
  } else if (options.type === 'error') {
    contentString = extractErrorMessage(e)
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

type UseNotifyReturnType = {
  onSuccess: () => void
  onError: () => void
}

export const useNotify = (
  success: Omit<NotificationOptions, 'type'>,
  error: Omit<NotificationOptions, 'type'>,
): UseNotifyReturnType => {
  const onSuccess = () => notify({ ...success, type: 'success' })
  const onError = () => notify({ ...error, type: 'error' })

  return { onSuccess, onError }
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
export const createNotificationHandler = <TEvent extends ApolloError>(
  o: NotificationOptions<TEvent> = defaultOptions,
) => {
  return (e: Maybe<TEvent> = undefined) => {
    notify(o, e)
  }
}
