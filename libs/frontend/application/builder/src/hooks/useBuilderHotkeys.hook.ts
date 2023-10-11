import type {
  IBuilderService,
  IElementService,
} from '@codelab/frontend/abstract/domain'
import { elementRef, isElementRef } from '@codelab/frontend/abstract/domain'
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
  deleteModal,
  selectedNode,
  setSelectedNode,
}: UseBuilderHotkeysProps) => {
  useHotkeys(
    'del,backspace',
    () => {
      if (selectedNode) {
        const isRootElement =
          isElementRef(selectedNode) && selectedNode.current.isRoot

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
