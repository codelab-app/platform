import React from 'react'
import { renderGraphData } from './RenderGraph.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'RenderGraph',
  parameters: {
    data: {
      Default: renderGraphData,
    },
  },
}

export const Default = () => {
  const RenderGraph = Renderer.componentsGraph(renderGraphData)

  return <RenderGraph />
}
