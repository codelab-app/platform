import { elementRef } from '@codelab/frontend/modules/element'
import { MouseEventHandler } from 'react'
import { BuilderService } from '../store/BuilderService'

export const useBuilderRootClickHandler = (builderService: BuilderService) => {
  const handleContainerClick: MouseEventHandler<HTMLDivElement> = (e) => {
    // Handle the click-to-select element here, because if we handled it at the react element props level, we won't
    // be able to capture clicks on elements like disabled antd buttons and other ones that are designed not to emit clicks

    // Go up the dom tree to find a element with a node id
    const visit = (element: HTMLElement) => {
      const nodeId = element.dataset?.['id']
      // Don't allow selection of elements withing a componentId
      const componentId = element.dataset?.['componentId']

      if (nodeId && !componentId) {
        builderService.setSelectedElement(elementRef(nodeId))
        e.stopPropagation()
      } else if (element.parentElement && element.id !== 'Builder') {
        // Unless we've reached the top element, or if the next parent is the Builder container, visit the parent
        visit(element.parentElement)
      } else {
        builderService.setSelectedElement(null)
      }
    }

    visit(e.target as HTMLElement)
  }

  return handleContainerClick
}
