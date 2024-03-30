import type { IRenderPipe } from '@codelab/frontend/abstract/application'
import { detach, rootRef } from 'mobx-keystone'

export const renderPipeRef = rootRef<IRenderPipe>('@codelab/RenderPipeRef', {
  onResolvedValueChange: (ref, newType, oldType) => {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
