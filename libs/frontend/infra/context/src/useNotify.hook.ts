import type { NotifyOptions } from '@codelab/frontend-shared-utils'

import { notify } from '@codelab/frontend-shared-utils'
import { NotificationType } from '@codelab/shared-abstract-types'
import { useContext } from 'react'

import { NotificationContext } from './NotificationProvider'

export type UseNotifyWithOptionsReturnType<Event> = (
  options: Omit<NotifyOptions<Event>, 'type'>,
  event?: Event,
) => void

export type UseNotifyReturnType<Event> = (event?: Event) => void

type Options<Event> = Omit<NotifyOptions<Event>, 'type'>

export const useNotify = <Event>(
  type: NotificationType,
): UseNotifyWithOptionsReturnType<Event> => {
  const api = useContext(NotificationContext)

  return (options: Options<Event>, event?: Event) => {
    notify(api, { ...options, type }, event)
  }
}

export const useErrorNotify = <Event>(
  options: Options<Event>,
): UseNotifyReturnType<Event> => {
  const api = useContext(NotificationContext)

  return (event?: Event) => {
    notify(api, { ...options, type: NotificationType.ERROR }, event)
  }
}

export const useSuccessNotify = <Event>(
  options: Options<Event>,
): UseNotifyReturnType<Event> => {
  const api = useContext(NotificationContext)

  return (event?: Event) => {
    notify(api, { ...options, type: NotificationType.SUCCESS }, event)
  }
}

export const useInfoNotify = <Event>(
  options: Options<Event>,
): UseNotifyReturnType<Event> => {
  const api = useContext(NotificationContext)

  return (event?: Event) => {
    notify(api, { ...options, type: NotificationType.INFO }, event)
  }
}

export const useWarningNotify = <Event>(
  options: Options<Event>,
): UseNotifyReturnType<Event> => {
  const api = useContext(NotificationContext)

  return (event?: Event) => {
    notify(api, { ...options, type: NotificationType.WARNING }, event)
  }
}
