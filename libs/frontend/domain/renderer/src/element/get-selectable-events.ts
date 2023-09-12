import type { IBuilderService, IElement } from '@codelab/frontend/abstract/core'
import { DATA_SELECTABLE } from '@codelab/frontend/abstract/core'

export const getSelectablEvents = (
  builderService: IBuilderService,
  element: IElement,
) => {
  let lastElement: HTMLElement | null

  if (element.parentComponent) {
    // element that is part of a component is not selectable
    return {}
  }

  return {
    [DATA_SELECTABLE]: true,
    onClick: (event: MouseEvent) => {
      const selectableElement = findClosestSelectableElement(
        event.target as HTMLElement,
      )

      if (!selectableElement) {
        return
      }

      event.stopPropagation()

      builderService.selectElementNode(element)
    },
    onMouseLeave: (event: MouseEvent) => {
      const selectableElement = findClosestSelectableElement(
        event.target as HTMLElement,
      )

      if (!selectableElement) {
        return
      }

      // remove the last hovered element
      selectableElement.classList.remove('hoverable')
      lastElement = null

      event.stopPropagation()
    },
    onMouseMove: (event: MouseEvent) => {
      const selectableElement = findClosestSelectableElement(
        event.target as HTMLElement,
      )

      if (!selectableElement || selectableElement === lastElement) {
        return
      }

      lastElement = selectableElement

      // remove the last hovered element
      document
        .getElementsByClassName('hoverable')[0]
        ?.classList.remove('hoverable')

      // add hoverable class to current element
      selectableElement.classList.add('hoverable')

      // stop propogation
      event.stopPropagation()
    },
  }
}

const findClosestSelectableElement = (
  targetElement: HTMLElement,
): HTMLElement | null => {
  let selectableElement = targetElement as HTMLElement | null | undefined

  while (
    !selectableElement?.attributes.getNamedItem('data-selectable')?.value
  ) {
    selectableElement = selectableElement?.parentElement
  }

  return selectableElement
}
