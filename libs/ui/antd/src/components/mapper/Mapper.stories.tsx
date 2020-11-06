import React from 'react'
import { mapperData } from './Mapper.data'
import { Renderer } from '@codelab/core/renderer'

export default {
  title: 'Mapper',
  parameters: {
    data: {
      Default: mapperData,
    },
  },
}

export const Default = () => {
  const Mapper = Renderer.components(mapperData)

  return <Mapper />
}
