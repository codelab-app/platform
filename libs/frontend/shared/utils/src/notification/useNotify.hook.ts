import type { Notification } from '@codelab/shared/abstract/types'
import { notify } from './notify'

export type UseNotifyReturnType<Event> = (event?: Event) => void

export const useNotify = <Event>(
  options: Notification<Event>,
): UseNotifyReturnType<Event> => {
  return (event?: Event) => notify(options, event)
}

export const useErrorNotify = <Event>(
  options: Omit<Notification<Event>, 'type'>,
): UseNotifyReturnType<Event> => {
  return (event?: Event) => notify({ ...options, type: 'error' }, event)
}

export const useSuccessNotify = <Event>(
  options: Omit<Notification<Event>, 'type'>,
): UseNotifyReturnType<Event> => {
  return (event?: Event) => notify({ ...options, type: 'success' }, event)
}
