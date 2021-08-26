import { ElementGraphTreeAdapter } from '@codelab/frontend/model/domain'
import { RenderProvider } from '@codelab/frontend/presenter/container'
import React from 'react'
import { Renderer } from '../Renderer'
import { renderFactory } from '../renderFactory'
import { mapperPageElements } from './Mapper.data'

export const TestRenderer = () => {
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
