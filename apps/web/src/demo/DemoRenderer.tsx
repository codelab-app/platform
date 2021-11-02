import { Renderer } from '@codelab/frontend/modules/builder'
import { TypeKindProvider } from '@codelab/frontend/modules/type'
import { ElementTree } from '@codelab/shared/core'
import React from 'react'
import { mapperPageElements } from './Mapper.data'

export const DemoRenderer = () => {
  const tree = new ElementTree(mapperPageElements)

  return (
    <TypeKindProvider>
      <Renderer tree={tree} />
    </TypeKindProvider>
  )
}
