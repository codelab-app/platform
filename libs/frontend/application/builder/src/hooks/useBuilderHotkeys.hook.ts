import {
  type IBuilderRouteContext,
  type IBuilderService,
  type IElementService,
  isRuntimeElementRef,
} from '@codelab/frontend/abstract/application'
import { useElementService } from '@codelab/frontend-application-element/services'
import { useValidatedUrlParams } from '@codelab/frontend-application-shared-store/router'
import { useRouter } from 'next/navigation'
import { useHotkeys } from 'react-hotkeys-hook'

type UseBuilderHotkeysProps = Pick<
  IBuilderService,
  'selectedNode' | 'setSelectedNode'
> & {
  context: IBuilderRouteContext<{ elementId: string }>
}

/**
 * Registers keyboard shortcuts for the Builder
 * - Del,backspace -> opens delete selected element modal
 * - Esc -> de-selects element
 */
export const useBuilderHotkeys = ({
  context,
  selectedNode,
  setSelectedNode,
}: UseBuilderHotkeysProps) => {
  const { deletePopover } = useElementService()
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
          deletePopover.open(router, context)
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
