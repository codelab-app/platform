import React from 'react'
import {
  renderComponentData,
  renderContainerData,
} from './RenderComponent.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'RenderComponent',
  parameters: {
    data: {
      Default: renderComponentData,
    },
  },
}

export const Default = () => {
  const Children = Renderer.components(renderComponentData)
  const ContainerCom = Renderer.components(renderContainerData)

  return <ContainerCom>{Children}</ContainerCom>
}
