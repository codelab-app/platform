import { elementRef } from '@codelab/frontend/modules/element'
import {
  IBuilderService,
  IElementService,
  isElement,
} from '@codelab/shared/abstract/core'
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
        const isRootElement = isElement(selectedNode) && selectedNode.isRoot

        if (!isRootElement) {
          deleteModal.open(elementRef(selectedNode.id))
        }
      }
    },
    { enabled: Boolean(selectedNode) },
    [selectedNode],
  )
  useHotkeys(
    'esc',
    () => {
      if (selectedNode) {
        set_selectedNode(null)
      }
    },
    { enabled: Boolean(selectedNode) },
    [],
  )
}
