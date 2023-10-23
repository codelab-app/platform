import { detach, rootRef } from 'mobx-keystone'
import type { IRendererModel } from './renderer.model.interface'

export const getRendererId = (id: string) => `${id}.renderer`

export const rendererRef = rootRef<IRendererModel>('@codelab/RendererRef', {
  onResolvedValueChange: (ref, newRenderer, oldRenderer) => {
    if (oldRenderer && !newRenderer) {
      detach(ref)
    }
  },
})
