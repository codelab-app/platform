import { detach, rootRef } from 'mobx-keystone'
import type { IUser } from './user.interface'

export const userRef = rootRef<IUser>('@codelab/UserRef', {
  onResolvedValueChange: (ref, newUser, oldUser) => {
    if (oldUser && !newUser) {
      detach(ref)
    }
  },
})
