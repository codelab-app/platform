import { useHotkeys } from 'react-hotkeys-hook'
import { BuilderService } from '../store/BuilderService'

/**
 * Registers keyboard shortcuts for the Builder
 * - Del,backspace -> opens delete selected element modal
 * - Esc -> de-selects element
 */
export const useBuilderHotkeys = () => {
  // const { openDeleteModal } = useElementDispatch()
  const { selectElement } = useBuilderDispatch()
  const { selectedElement, selectedElementId } = useBuilderSelectedElement()

  useHotkeys(
    'del,backspace',
    () => {
      if (selectedElement) {
        // openDeleteModal({
        //   deleteIds: [selectedElement.id],
        //   entity: selectedElement,
        // })
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
