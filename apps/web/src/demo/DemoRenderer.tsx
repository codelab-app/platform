import { Renderer } from '@codelab/frontend/modules/builder'
import { ElementTreeGraphql } from '@codelab/frontend/modules/element'
import React from 'react'
import { mapperPageElements } from './Mapper.data'

export const DemoRenderer = () => {
  const tree = new ElementTreeGraphql(mapperPageElements)

  return <Renderer tree={tree} />
}
