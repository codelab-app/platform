import { detach, rootRef } from 'mobx-keystone'

import type { IPreferenceModel } from './preference.model.interface'

export const preferenceRef = rootRef<IPreferenceModel>(
  '@codelab/PreferenceRef',
  {
    onResolvedValueChange: (ref, newPreference, oldPreference) => {
      if (oldPreference && !newPreference) {
        detach(ref)
      }
    },
  },
)
