import type {
  IBuilderService,
  IElementService,
} from '@codelab/frontend/abstract/core'
import {
  elementRef,
  isElementPageNodeRef,
} from '@codelab/frontend/abstract/core'
import { useHotkeys } from 'react-hotkeys-hook'

type UseBuilderHotkeysProps = Pick<
  IBuilderService,
  'selectedNode' | 'setSelectedNode'
> &
  Pick<IElementService, 'deleteModal'>

/**
 * Registers keyboard shortcuts for the Builder
 * - Del,backspace -> opens delete selected element modal
 * - Esc -> de-selects element
 */
export const useBuilderHotkeys = ({
  selectedNode,
  setSelectedNode,
  deleteModal,
}: UseBuilderHotkeysProps) => {
  useHotkeys(
    'del,backspace',
    () => {
      if (selectedNode) {
        const isRootElement =
          isElementPageNodeRef(selectedNode) && selectedNode.current.isRoot

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
        setSelectedNode(null)
      }
    },
    { enabled: Boolean(selectedNode) },
    [],
  )
}
