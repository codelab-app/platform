import {
  type IBuilderService,
  isRuntimeElementRef,
  type IToggleService,
} from '@codelab/frontend/abstract/application'
import { type IElementModel } from '@codelab/frontend/abstract/domain'
import { useHotkeys } from 'react-hotkeys-hook'

type UseBuilderHotkeysProps = Pick<
  IBuilderService,
  'selectedNode' | 'setSelectedNode'
> & {
  deleteModal: IToggleService<IElementModel>
}

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
        const element = isRuntimeElementRef(selectedNode)
          ? selectedNode.current.element.current
          : undefined

        const isRootElement = element?.isRoot

        if (element && !isRootElement) {
          deleteModal.open(element)
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
