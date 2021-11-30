import { useElementDispatch } from '@codelab/frontend/modules/element'
import { useHotkeys } from 'react-hotkeys-hook'
import { useDispatch } from 'react-redux'
import { builderActions } from '../store/builderState'
import { useBuilderSelectedElement } from './useBuilderSelectedElement'

/**
 * Registers keyboard shortcuts for the Builder
 * - Del,backspace -> opens delete selected element modal
 * - Esc -> de-selects element
 */
export const useBuilderHotkeys = () => {
  const { openDeleteModal } = useElementDispatch()
  const { selectedElement, selectedElementId } = useBuilderSelectedElement()
  const dispatch = useDispatch()

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
        dispatch(builderActions.selectElement({ elementId: undefined }))
      }
    },
    { enabled: !!selectedElementId },
    [selectedElementId],
  )
}
