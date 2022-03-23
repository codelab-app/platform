import { useStore } from '@codelab/frontend/model/infra/mobx'
import { Renderer, useTypesByIdQuery } from '@codelab/frontend/modules/builder'
import { ElementTree } from '@codelab/shared/core'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { mapperPageElements } from './Mapper.data'

export const DemoRenderer = observer(() => {
  const tree = new ElementTree(mapperPageElements)
  const store = useStore()
  const { typesById } = useTypesByIdQuery(store.typeService)

  return <Renderer tree={tree} typesById={typesById} />
})
