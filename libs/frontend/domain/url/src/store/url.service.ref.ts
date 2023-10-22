import type { IUrlService } from '@codelab/frontend/abstract/domain'
import { detach, rootRef } from 'mobx-keystone'

export const urlServiceRef = rootRef<IUrlService>('@codelab/UrlServiceRef', {
  onResolvedValueChange: (ref, newUrlService, oldUrlService) => {
    if (newUrlService && !oldUrlService) {
      detach(ref)
    }
  },
})
