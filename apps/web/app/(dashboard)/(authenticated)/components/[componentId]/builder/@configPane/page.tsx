'use client'

import { isRuntimePage } from '@codelab/frontend/abstract/application'
import { ConfigPaneInspectorTabContainer } from '@codelab/frontend-application-builder/sections'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

const ConfigPane = observer(() => {
  const { builderService, rendererService } = useApplicationStore()
  const selectedNode = builderService.selectedNode?.current
  const activeRenderer = rendererService.activeRenderer?.maybeCurrent
  const elementTree = rendererService.activeElementTree

  if (
    !selectedNode ||
    isRuntimePage(selectedNode) ||
    !activeRenderer ||
    !elementTree
  ) {
    return null
  }

  return (
    <ConfigPaneInspectorTabContainer
      activeRenderer={activeRenderer}
      elementTree={elementTree}
      selectedNode={selectedNode}
    />
  )
})

export default ConfigPane
