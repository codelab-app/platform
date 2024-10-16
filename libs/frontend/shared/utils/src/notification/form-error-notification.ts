import type { Maybe, Notification } from '@codelab/shared/abstract/types'

import { notify } from './notify'

type FromErrorNotification<TEvent> = Partial<
  Pick<Notification<TEvent>, 'description'>
> &
  Pick<Notification<TEvent>, 'title'>

/**
 * Returns a function that can be used as standalone notification function:
 * const notify = getNotificationHandler({...options})
 * notify({...someEvent})
 *
 * Or as an error handler directly
 * e.g.:
 *  .catch(getNotificationHandler({...options}))
 */
export const createFormErrorNotificationHandler =
  <TEvent>(options: FromErrorNotification<TEvent>) =>
  (event: Maybe<TEvent> = undefined) => {
    // TODO: Need to extract description from submit error object
    const { description = '', title } = options

    notify({ ...options, description, type: 'error' })
  }
