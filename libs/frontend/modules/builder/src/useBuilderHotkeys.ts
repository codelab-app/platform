import { EntityType, useCrudModalForm } from '@codelab/frontend/view/components'
import { useHotkeys } from 'react-hotkeys-hook'
import { useDispatch } from 'react-redux'
import { builderActions } from './store/builderState'
import { useBuilderSelectedElement } from './store/useBuilderSelectedElement'

/**
 * Registers keyboard shortcuts for the Builder
 * - Del,backspace -> opens delete selected element modal
 * - Esc -> de-selects element
 */
export const useBuilderHotkeys = () => {
  const { openDeleteModal } = useCrudModalForm(EntityType.Element)
  const { selectedElement, selectedElementId } = useBuilderSelectedElement()
  const dispatch = useDispatch()

  useHotkeys(
    'del,backspace',
    () => {
      if (selectedElement) {
        openDeleteModal([selectedElement.id], selectedElement)
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
