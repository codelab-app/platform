import {
  BUILDER_CONTAINER_ID,
  DATASET_COMPONENT_ID,
  DATASET_ELEMENT_ID,
} from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/modules/element'
import { IBuilderService } from '@codelab/shared/abstract/core'
import { MouseEventHandler } from 'react'

type UseBuilderRootClickHandlerProps = Pick<
  IBuilderService,
  'set_selectedElement'
>

export const useBuilderRootClickHandler = ({
  set_selectedElement,
}: UseBuilderRootClickHandlerProps) => {
  const handleContainerClick: MouseEventHandler<HTMLDivElement> = (e) => {
    // Handle the click-to-select element here, because if we handled it at the react element props level, we won't
    // be able to capture clicks on elements like disabled antd buttons and other ones that are designed not to emit clicks

    // Go up the dom tree to find a element with a node id
    const visit = (element: HTMLElement) => {
      const elementId = element.dataset?.[DATASET_ELEMENT_ID]
      // Don't allow selection of elements withing a componentId
      const componentId = element.dataset?.[DATASET_COMPONENT_ID]

      if (elementId && !componentId) {
        set_selectedElement(elementRef(elementId))
        e.stopPropagation()
      } else if (element.parentElement && element.id !== BUILDER_CONTAINER_ID) {
        // Unless we've reached the top element, or if the next parent is the Builder container, visit the parent
        visit(element.parentElement)
      } else {
        set_selectedElement(null)
      }
    }

    visit(e.target as HTMLElement)
  }

  return handleContainerClick
}
