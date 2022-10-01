import { IRenderPipe } from '@codelab/frontend/abstract/core'
import { detach, rootRef } from 'mobx-keystone'

export const renderPipeRef = rootRef<IRenderPipe>('@codelab/RenderPipeRef', {
  onResolvedValueChange(ref, newType, oldType) {
    if (oldType && !newType) {
      detach(ref)
    }
  },
})
