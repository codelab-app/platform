import { ElementGraphTreeAdapter } from '@codelab/frontend/model/domain'
import { Renderer, renderFactory } from '@codelab/frontend/modules/builder'
import { RenderProvider } from '@codelab/frontend/presenter/container'
import React from 'react'
import { mapperPageElements } from './Mapper.data'

export const DemoRenderer = () => {
  const tree = new ElementGraphTreeAdapter(mapperPageElements)

  return (
    <RenderProvider
      context={{
        tree,
        renderFactory,
      }}
    >
      <Renderer />
    </RenderProvider>
  )
}
