import {
  type IBuilderService,
  type IElementService,
  isRuntimeElementRef,
} from '@codelab/frontend/abstract/application'
import { useUrlPathParams } from '@codelab/frontend-application-shared-store/router'
import { useRouter } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'

type UseBuilderHotkeysProps = Pick<
  IBuilderService,
  'selectedNode' | 'setSelectedNode'
> & {
  deleteModal: IElementService['deletePopover']
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
  const { appId, componentId, pageId } = useUrlPathParams()
  const router = useRouter()

  useHotkeys(
    'del,backspace',
    () => {
      if (selectedNode) {
        const element = isRuntimeElementRef(selectedNode)
          ? selectedNode.current.element.current
          : undefined

        const isRootElement = element?.isRoot

        if (element && !isRootElement) {
          deleteModal.open(router, {
            appId,
            componentId,
            elementId: element.id,
            pageId,
          })
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
