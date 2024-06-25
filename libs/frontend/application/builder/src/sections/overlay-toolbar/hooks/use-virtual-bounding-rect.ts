import {
  type IRuntimeModelRef,
  isRuntimeElementRef,
} from '@codelab/frontend/abstract/application'
import {
  type IPageNodeRef,
  isElementRef,
} from '@codelab/frontend/abstract/domain'
import type { Rectangle } from '@codelab/frontend/abstract/types'
import { useStore } from '@codelab/frontend/application/shared/store'
import { calculateEncapsulatingRect } from '@codelab/frontend/shared/utils'
import type { Nullable } from '@codelab/shared/abstract/types'
import { useEffect, useState } from 'react'
import useResizeObserver from 'use-resize-observer/polyfilled'
import { queryRenderedElementById } from '../../../utils'

interface useVirtualBoundingRectProps {
  activeNode: Nullable<IPageNodeRef>
  activeRuntimeNode: Nullable<IRuntimeModelRef>
  renderContainer: Nullable<HTMLElement>
}

/**
 * Finds the bounding rect of any element regardless of it being a
 * concrete element (possessing html counterpart) or not.
 * @param param0
 * @returns
 */
export const useVirtualBoundingRect = ({
  activeNode,
  activeRuntimeNode,
  renderContainer,
}: useVirtualBoundingRectProps) => {
  const [boundingRect, setBoundingRect] = useState<DOMRect | null>(null)
  const { runtimeElementService } = useStore()

  const { height, width } = useResizeObserver({
    ref: renderContainer,
  })

  const activeRuntimeElement =
    activeRuntimeNode && isRuntimeElementRef(activeRuntimeNode)
      ? activeRuntimeNode.current
      : null

  const dependencies =
    activeNode && isElementRef(activeNode)
      ? [
          activeRuntimeElement?.style.guiCss(
            runtimeElementService.currentStylePseudoClass,
          ),
          activeRuntimeElement?.style.customCss,
          activeNode.current.tailwindClassNames,
          activeNode.current.props.values,
          activeNode.current.nextSibling?.id,
          activeNode.current.parentElement?.id,
        ]
      : []

  useEffect(() => {
    if (!activeNode || !isElementRef(activeNode)) {
      return
    }

    const representativeElementSubset =
      activeNode.current.smallestConcreteRepresentativeSubtree.map((el) => {
        return queryRenderedElementById(el.id)
      })

    const encapsulatingRect: Rectangle = calculateEncapsulatingRect(
      representativeElementSubset.filter((el) =>
        Boolean(el),
      ) as Array<HTMLElement>,
    )

    setBoundingRect(
      new DOMRect(
        encapsulatingRect.left,
        encapsulatingRect.top,
        encapsulatingRect.right - encapsulatingRect.left,
        encapsulatingRect.bottom - encapsulatingRect.top,
      ),
    )
  }, [height, width, activeNode, ...dependencies])

  return boundingRect
}
