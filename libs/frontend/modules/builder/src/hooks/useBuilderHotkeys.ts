import { elementRef } from '@codelab/frontend/modules/element'
import { IBuilderService, IElementService } from '@codelab/shared/abstract/core'
import { useHotkeys } from 'react-hotkeys-hook'

/**
 * Registers keyboard shortcuts for the Builder
 * - Del,backspace -> opens delete selected element modal
 * - Esc -> de-selects element
 */
export const useBuilderHotkeys = (
  builderService: IBuilderService,
  elementService: IElementService,
) => {
  useHotkeys(
    'del,backspace',
    () => {
      if (builderService.selectedElement) {
        elementService.deleteModal.open(
          elementRef(builderService.selectedElement.id),
        )
      }
    },
    { enabled: !!builderService.selectedElement },
    [builderService],
  )
  useHotkeys(
    'esc',
    () => {
      if (builderService.selectedElement) {
        builderService.set_selectedElement(null)
      }
    },
    { enabled: !!builderService.selectedElement },
    [],
  )
}
