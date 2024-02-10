import {
  type IPageNodeRef,
  isElementRef,
} from '@codelab/frontend/abstract/domain'
import type { Rectangle } from '@codelab/frontend/abstract/types'
import { calculateEncapsulatingRect } from '@codelab/frontend/shared/utils'
import type { Nullable } from '@codelab/shared/abstract/types'
import { useEffect, useState } from 'react'
import useResizeObserver from 'use-resize-observer/polyfilled'
import { queryRenderedElementById } from '../../../utils'

interface useVirtualBoundingRectProps {
  activeNode: Nullable<IPageNodeRef>
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
  renderContainer,
}: useVirtualBoundingRectProps) => {
  const [boundingRect, setBoundingRect] = useState<DOMRect | null>(null)

  const { height, width } = useResizeObserver({
    ref: renderContainer,
  })

  const dependencies =
    activeNode && isElementRef(activeNode)
      ? [
          activeNode.current.style.guiCss,
          activeNode.current.style.customCss,
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
