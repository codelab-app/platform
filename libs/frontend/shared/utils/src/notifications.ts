import type { Maybe } from '@codelab/shared/abstract/types'
import { notification } from 'antd'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import { extractErrorMessage } from './extractErrorMessage'

type NotificationType = 'error' | 'info' | 'success' | 'warning'

export interface NotificationOptions<TEvent = unknown> {
  /** Enter a custom content of the notification. If you don't, it will be inferred from the error message, if found */
  content?: string | ((e: Maybe<TEvent>) => string)
  /** Enter a custom title of the notification. If you don't, it will be "info" */
  title?: string | ((e: Maybe<TEvent>) => string)
  /** The type of notification. Default is error */
  type?: NotificationType
}

const defaultOptions: NotificationOptions = {
  type: 'error',
}

export const notify = <TEvent>(
  options: NotificationOptions<TEvent>,
  event: Maybe<TEvent> = undefined,
) => {
  const { content, title, type } = { ...defaultOptions, ...options }
  let titleString = ''
  let contentString = ''

  if (isString(title)) {
    titleString = title
  } else if (isFunction(title)) {
    titleString = title(event)
  } else if (type === 'error') {
    titleString = 'Error'
  }

  if (isString(content)) {
    contentString = content
  } else if (isFunction(content)) {
    contentString = content(event)
  } else if (type === 'error') {
    contentString = extractErrorMessage(event)
  }

  notification[type || 'info']({
    description: contentString,
    message: titleString,
    placement: 'topRight',
  })

  if (type === 'warning') {
    console.warn(titleString, contentString)
  } else if (type === 'error') {
    console.error(titleString, contentString)
  } else {
    console.log(titleString, contentString)
  }
}

export interface UseNotifyReturnType {
  onError(e: unknown): void
  onSuccess(): void
}

export const useNotify = (
  success: Omit<NotificationOptions, 'type'>,
  error: Omit<NotificationOptions, 'type'>,
): UseNotifyReturnType => {
  const onSuccess = () => notify({ ...success, type: 'success' })

  const onError = (_error: unknown) => {
    console.error(_error)
    notify({
      ...error,
      content: error.content || extractErrorMessage(_error),
      type: 'error',
    })
  }

  return { onError, onSuccess }
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
export const createNotificationHandler =
  <TEvent>(options: NotificationOptions<TEvent> = defaultOptions) =>
  (event: Maybe<TEvent> = undefined) => {
    notify(options, event)
  }
