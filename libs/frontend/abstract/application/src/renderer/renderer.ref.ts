import type { IRef } from '@codelab/shared/abstract/core'

import { detach, rootRef } from 'mobx-keystone'

import type { IRendererModel } from './renderer.model.interface'

export const rendererRef = rootRef<IRendererModel>('@codelab/RendererRef', {
  onResolvedValueChange: (ref, newRenderer, oldRenderer) => {
    if (oldRenderer && !newRenderer) {
      detach(ref)
    }
  },
})
