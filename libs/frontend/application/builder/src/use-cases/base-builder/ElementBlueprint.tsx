'use client'

import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import type { CSSProperties } from 'react'

import { isRuntimeElement } from '@codelab/frontend/abstract/application'
import { Rect } from '@codelab/frontend/shared/utils'
import { useTypedDroppable } from '@codelab/frontend-application-dnd/hooks'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useDropIndicator } from '../../hooks/useDropIndicator.hook'
import { getBlueprintId } from '../../utils/get-blueprint-id'
import { queryByElementId } from '../../utils/query-by-element-id'
import { queryByRuntimeElementKey } from '../../utils/query-by-runtime-element-key'
import { ElementOverlay } from './ElementOverlay'
import { BuilderElementToolbar } from './ElementToolbar'

const selectedStyle: CSSProperties = {
  borderRadius: '3px',
  outline: '2px solid #43669A',
  zIndex: 3,
}

const hoveredStyle: CSSProperties = {
  borderRadius: '3px',
  outline: '2px solid #43669A',
  zIndex: 2,
}

export const ElementBlueprint = observer<{
  containerRect: Rect
  container: HTMLElement
  runtimeElement: IRuntimeElementModel
  parentRect: Rect
}>(({ container, containerRect, parentRect, runtimeElement }) => {
  const { builderService } = useApplicationStore()
  const element = runtimeElement.element.current
  const selectedNode = builderService.selectedNode?.current
  const hoveredNode = builderService.hoveredNode?.current

  const selectedElement =
    selectedNode && isRuntimeElement(selectedNode) ? selectedNode : undefined

  const hoveredElement =
    hoveredNode && isRuntimeElement(hoveredNode) ? hoveredNode : undefined

  const getDomElement = useCallback(
    () => queryByElementId(element.id),
    [element.id],
  )

  const getElementRect = useCallback(() => {
    // get rect of the rendered element
    const dom = getDomElement()

    if (dom) {
      return dom.getBoundingClientRect()
    }

    // get rects for all descendants rendered elements
    const descendantRects: Array<Rect> = runtimeElement.descendantElements
      .map(
        (descendant) =>
          queryByRuntimeElementKey(
            descendant.compositeKey,
          )?.getBoundingClientRect() as Rect,
      )
      .filter((value): value is Rect => Boolean(value))

    // in case no descendant has a rect we use parent/sibling rects as a fallback
    if (!descendantRects.length) {
      return parentRect
    }

    // the rect of element will be created based on its rendered children
    const minX = Math.min(
      ...descendantRects.map((descendantRect) => descendantRect.left),
    )

    const maxX = Math.max(
      ...descendantRects.map((descendantRect) => descendantRect.right),
    )

    const minY = Math.min(
      ...descendantRects.map((descendantRect) => descendantRect.top),
    )

    const maxY = Math.max(
      ...descendantRects.map((descendantRect) => descendantRect.bottom),
    )

    return new Rect(minX, minY, maxX - minX, maxY - minY)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runtimeElement.descendantElements, parentRect])

  const isSelected = selectedElement?.element.id === element.id
  const isHovered = hoveredElement?.element.id === element.id
  const [rect, setRect] = useState(() => getElementRect())

  const deps = [
    selectedElement?.style.styleStringWithBreakpoints,
    selectedElement?.element.current.tailwindClassNames,
    // adding or removing any element should trigger a re-render
    element.closestParentElement?.current,
    element.props.values,
    element.nextSibling?.id,
    element.parentElement?.id,
    runtimeElement.isTextContentEditable,
  ]

  const { setNodeRef } = useTypedDroppable({
    data: {
      internalUseOnlyDropData: {
        hierarchy: { parentId: element.closestParentElement?.id },
      },
    },
    id: element.id,
  })

  const dropIndicatorStyle = useDropIndicator(element)

  useEffect(() => {
    setRect(getElementRect())
  }, [
    isSelected,
    isHovered,
    containerRect,
    parentRect,
    getElementRect,
    ...deps,
  ])

  const style: CSSProperties = useMemo(
    () => ({
      bottom: `${rect.bottom}px`,
      height: `${rect.height}px`,
      left: `${rect.left - parentRect.left}px`,
      pointerEvents: 'none',
      position: 'absolute',
      right: `${rect.right}px`,
      top: `${rect.top - parentRect.top}px`,
      width: `${rect.width}px`,
      zIndex: 9999,
      ...(isSelected ? selectedStyle : {}),
      ...(isHovered ? hoveredStyle : {}),
      ...dropIndicatorStyle,
    }),
    [
      dropIndicatorStyle,
      parentRect.left,
      parentRect.top,
      isSelected,
      isHovered,
      rect.bottom,
      rect.height,
      rect.left,
      rect.right,
      rect.top,
      rect.width,
    ],
  )

  const toolbar = useMemo(() => {
    return isSelected ? (
      <BuilderElementToolbar
        container={container}
        containerRect={containerRect}
        domElement={getDomElement()}
        rect={rect}
        runtimeElement={runtimeElement}
      />
    ) : null
  }, [container, containerRect, element, isSelected, rect, getDomElement])

  const overlay = useMemo(() => {
    const domElement = getDomElement()

    return isHovered && domElement ? (
      <ElementOverlay domElement={domElement} rect={rect} />
    ) : null
  }, [isHovered, rect, getDomElement])

  return (
    <div id={getBlueprintId(element.id)} ref={setNodeRef} style={style}>
      {toolbar}
      {overlay}
      {runtimeElement.children
        .map((child) => child.current)
        .filter((child) => isRuntimeElement(child))
        .map((child) => (
          <ElementBlueprint
            container={container}
            containerRect={containerRect}
            key={child.element.id}
            parentRect={rect}
            runtimeElement={child}
          />
        ))}
    </div>
  )
})
