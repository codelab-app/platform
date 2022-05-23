import { elementRef } from '@codelab/frontend/modules/element'
import { IBuilderService, IElementService } from '@codelab/shared/abstract/core'
import { useHotkeys } from 'react-hotkeys-hook'

type UseBuilderHotkeysProps = Pick<
  IBuilderService,
  'selectedNode' | 'set_selectedNode'
> &
  Pick<IElementService, 'deleteModal'>

/**
 * Registers keyboard shortcuts for the Builder
 * - Del,backspace -> opens delete selected element modal
 * - Esc -> de-selects element
 */
export const useBuilderHotkeys = ({
  selectedNode,
  set_selectedNode,
  deleteModal,
}: UseBuilderHotkeysProps) => {
  useHotkeys(
    'del,backspace',
    () => {
      if (selectedNode) {
        deleteModal.open(elementRef(selectedNode.id))
      }
    },
    { enabled: !!selectedNode },
    [],
  )
  useHotkeys(
    'esc',
    () => {
      if (selectedNode) {
        set_selectedNode(null)
      }
    },
    { enabled: !!selectedNode },
    [],
  )
}
