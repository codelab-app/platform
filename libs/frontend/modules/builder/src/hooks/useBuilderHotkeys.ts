import { elementRef } from '@codelab/frontend/modules/element'
import { IBuilderService, IElementService } from '@codelab/shared/abstract/core'
import { useHotkeys } from 'react-hotkeys-hook'

type UseBuilderHotkeysProps = Pick<
  IBuilderService,
  'selectedElement' | 'setSelectedTreeNode'
> &
  Pick<IElementService, 'deleteModal'>

/**
 * Registers keyboard shortcuts for the Builder
 * - Del,backspace -> opens delete selected element modal
 * - Esc -> de-selects element
 */
export const useBuilderHotkeys = ({
  selectedElement,
  setSelectedTreeNode,
  deleteModal,
}: UseBuilderHotkeysProps) => {
  useHotkeys(
    'del,backspace',
    () => {
      if (selectedElement) {
        deleteModal.open(elementRef(selectedElement.id))
      }
    },
    { enabled: !!selectedElement },
    [],
  )
  useHotkeys(
    'esc',
    () => {
      if (selectedElement) {
        setSelectedTreeNode(null)
      }
    },
    { enabled: !!selectedElement },
    [],
  )
}
