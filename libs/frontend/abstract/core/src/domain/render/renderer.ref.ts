import { detach, rootRef } from 'mobx-keystone'
import type { IRenderer } from './renderer.model.interface'

export const rendererRef = rootRef<IRenderer>('@codelab/RendererRef', {
  onResolvedValueChange: (ref, newRenderer, oldRenderer) => {
    if (oldRenderer && !newRenderer) {
      detach(ref)
    }
  },
})
