'use client'

import type { IBuilderRoute } from '@codelab/frontend/abstract/application'

import { isRuntimePage } from '@codelab/frontend/abstract/application'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'

import { ConfigPaneInspectorTabGroup } from './ConfigPaneInspectorTabGroup'

export const ConfigPaneInspectorTabGroupContainer = observer<{
  context: IBuilderRoute
}>(({ context }) => {
  const { builderService, rendererService } = useApplicationStore()
  // `selectedNode` may not be hydrated yet
  const selectedNode = builderService.selectedNode?.maybeCurrent
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
    <ConfigPaneInspectorTabGroup
      activeRenderer={activeRenderer}
      context={context}
      elementTree={elementTree}
      selectedNode={selectedNode}
    />
  )
})
