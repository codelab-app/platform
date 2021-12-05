import { useElementDispatch } from '@codelab/frontend/modules/element'
import { useHotkeys } from 'react-hotkeys-hook'
import { useBuilderDispatch } from './useBuilderDispatch'
import { useBuilderSelectedElement } from './useBuilderSelectedElement'

/**
 * Registers keyboard shortcuts for the Builder
 * - Del,backspace -> opens delete selected element modal
 * - Esc -> de-selects element
 */
export const useBuilderHotkeys = () => {
  const { openDeleteModal } = useElementDispatch()
  const { selectElement } = useBuilderDispatch()
  const { selectedElement, selectedElementId } = useBuilderSelectedElement()

  useHotkeys(
    'del,backspace',
    () => {
      if (selectedElement) {
        openDeleteModal({
          deleteIds: [selectedElement.id],
          entity: selectedElement,
        })
      }
    },
    { enabled: !!selectedElement },
    [selectedElement],
  )
  useHotkeys(
    'esc',
    () => {
      if (selectedElementId) {
        selectElement({ elementId: undefined })
      }
    },
    { enabled: !!selectedElementId },
    [selectedElementId],
  )
}
