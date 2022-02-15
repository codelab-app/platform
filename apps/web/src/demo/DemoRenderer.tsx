import { Renderer, useTypesByIdQuery } from '@codelab/frontend/modules/builder'
import { ElementTree } from '@codelab/shared/core'
import React from 'react'
import { mapperPageElements } from './Mapper.data'

export const DemoRenderer = () => {
  const tree = new ElementTree(mapperPageElements)
  const { typesById } = useTypesByIdQuery()

  return <Renderer tree={tree} typesById={typesById} />
}
