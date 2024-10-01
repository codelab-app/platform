import { notify, type NotifyOptions } from './notify'

export type UseNotifyReturnType<Event> = (event?: Event) => void

export const useNotify = <Event>(
  options: NotifyOptions<Event>,
): UseNotifyReturnType<Event> => {
  return (event?: Event) => {
    notify(options, event)
  }
}

export const useErrorNotify = <Event>(
  options: Omit<NotifyOptions<Event>, 'type'>,
): UseNotifyReturnType<Event> => {
  return (event?: Event) => {
    notify({ ...options, type: 'error' }, event)
  }
}

export const useSuccessNotify = <Event>(
  options: Omit<NotifyOptions<Event>, 'type'>,
): UseNotifyReturnType<Event> => {
  return (event?: Event) => {
    notify({ ...options, type: 'success' }, event)
  }
}
