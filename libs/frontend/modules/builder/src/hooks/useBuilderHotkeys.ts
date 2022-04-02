import { elementRef, ElementService } from '@codelab/frontend/modules/element'
import { useHotkeys } from 'react-hotkeys-hook'
import { BuilderService } from '../store/BuilderService'

/**
 * Registers keyboard shortcuts for the Builder
 * - Del,backspace -> opens delete selected element modal
 * - Esc -> de-selects element
 */
export const useBuilderHotkeys = (
  builderService: BuilderService,
  elementService: ElementService,
) => {
  useHotkeys(
    'del,backspace',
    () => {
      if (builderService.selectedElement?.maybeCurrent) {
        elementService.deleteModal.open(
          elementRef(builderService.selectedElement.current),
        )
      }
    },
    { enabled: !!builderService.selectedElement },
    [builderService],
  )
  useHotkeys(
    'esc',
    () => {
      if (builderService.selectedElement?.maybeCurrent) {
        builderService.setSelectedElement(null)
      }
    },
    { enabled: !!builderService.selectedElement },
    [],
  )
}
