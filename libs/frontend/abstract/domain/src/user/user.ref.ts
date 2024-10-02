import { detach, rootRef } from 'mobx-keystone'

import type { IUserModel } from './user.model.interface'

export const userRef = rootRef<IUserModel>('@codelab/UserRef', {
  onResolvedValueChange: (ref, newUser, oldUser) => {
    if (oldUser && !newUser) {
      detach(ref)
    }
  },
})
