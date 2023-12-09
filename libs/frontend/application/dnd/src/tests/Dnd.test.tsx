/* eslint-disable unicorn/filename-case */

import { fireEvent, render, waitFor } from '@testing-library/react'
import type { ComponentType, PropsWithChildren } from 'react'
import React from 'react'
import type { Point } from '../geometry'
import { MakeChildrenDraggable } from '../MakeChildrenDraggable'
import { MakeChildrenDroppable } from '../MakeChildrenDroppable'
import { COLLISION_ALGORITHM_SPACING, TestDndContext } from './TestDndContext'

interface WrapIfProps<T> {
  Wrapper: ComponentType<T>
  condition: boolean
  wrapperProps: T
}

export const WrapIf = <T,>({
  children,
  condition,
  Wrapper,
  wrapperProps,
}: PropsWithChildren<WrapIfProps<T>>) => {
  if (condition) {
    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Wrapper {...wrapperProps}>{children}</Wrapper>
  }

  return children
}

interface Hierarchy {
  [key: number | string]: {
    children?: Hierarchy
    parentId?: number | string
    style?: React.CSSProperties
    tobe: 'both' | 'draggable' | 'droppable'
  }
}

interface MakeElementTreeProps {
  hierarchy: Hierarchy
}

// helper function for debugging (TODO: remove later or move somewhere else)
const formatHTMLElement = (element: Element, indent = 0): string => {
  const { className, id, tagName } = element
  const attributes = []

  if (id) {
    attributes.push(`id='${id}'`)
  }

  if (className) {
    attributes.push(`class='${className}'`)
  }

  const openingTag = `<${tagName.toLowerCase()} ${attributes.join(' ')}>`
  const closingTag = `</${tagName.toLowerCase()}>`
  const indentation = ' '.repeat(indent)

  const children = Array.from(element.children)
    .map((child) => formatHTMLElement(child, indent + 2))
    .join('\n')

  return `${indentation}${openingTag}\n${children}\n${indentation}${closingTag}`
}

const populateParentId = (hierarchy: Hierarchy): Hierarchy => {
  const recursivelyPopulateParentId = (
    subTree: Hierarchy,
    parentId: number | string,
    entireHierarchy: Hierarchy,
  ) => {
    const keys = Object.keys(subTree)

    keys.forEach((key) => {
      const node = subTree[key]

      if (!node) {
        return
      }

      const { children } = node

      if (children) {
        recursivelyPopulateParentId(children, key, entireHierarchy)
      }

      node.parentId = parentId
    })
  }

  recursivelyPopulateParentId(hierarchy, '', hierarchy)

  return hierarchy
}

const MakeElementTree = ({ hierarchy }: MakeElementTreeProps) => {
  const keys = Object.keys(hierarchy)

  return keys.map((key) => {
    const node = hierarchy[key]

    if (!node) {
      return null
    }

    const { children, parentId, style, tobe } = node

    return (
      <WrapIf
        Wrapper={MakeChildrenDroppable}
        condition={tobe === 'droppable' || tobe === 'both'}
        wrapperProps={{
          data: {},
          id: key,
          parentDroppableContainerId: `${parentId}` || '',
          wrapperStyles: style,
        }}
      >
        <WrapIf
          Wrapper={MakeChildrenDraggable}
          condition={tobe === 'draggable' || tobe === 'both'}
          wrapperProps={{
            data: {},
            id: key,
            wrapperStyles: style,
          }}
        >
          <div
            children={
              children && (
                <MakeElementTree hierarchy={children} key={`subtree-${key}`} />
              )
            }
            id={key}
            key={key}
            style={style}
          />
        </WrapIf>
      </WrapIf>
    )
  })
}

const dragElementOver = async (
  element: HTMLElement,
  dragPosition: Point,
  dropPosiotion: Point,
) => {
  // Simulate mouse events for dragging and dropping
  const mouseDownEvent = new MouseEvent('pointerdown', {
    bubbles: true,
    clientX: dragPosition.x,
    clientY: dragPosition.y,
  })

  /**
   * Have to set it to primary because dndKit ignores non-primary input devices.
   * On the other hand, using a MouseEvent and patching it instead of using
   * PointerEvent is because Jest doesn't implement PointerEvent.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(mouseDownEvent as any).isPrimary = true

  const mouseMoveEvent = new MouseEvent('pointermove', {
    bubbles: true,
    clientX: dropPosiotion.x,
    clientY: dropPosiotion.y,
  })

  await waitFor(() => {
    fireEvent(element, mouseDownEvent)
    fireEvent(element, mouseMoveEvent)
  })
}

const dragDropElement = async (
  element: HTMLElement,
  dragPosition: Point,
  dropPosiotion: Point,
) => {
  await dragElementOver(element, dragPosition, dropPosiotion)

  const mouseUpEvent = new MouseEvent('pointerup', {
    bubbles: true,
    clientX: dropPosiotion.x,
    clientY: dropPosiotion.y,
  })

  await waitFor(() => {
    fireEvent(element, mouseUpEvent)
  })
}

describe('Dnd', () => {
  beforeAll(() => {
    // Mocking the getBoundingClientRect method for HTMLElement
    HTMLElement.prototype.getBoundingClientRect = jest.fn(function () {
      const style = window.getComputedStyle(this)
      const width = parseFloat(style.width)
      const height = parseFloat(style.height)
      const left = parseFloat(style.left)
      const right = parseFloat(style.right)
      const top = parseFloat(style.top)

      return {
        bottom: height,
        height,
        left,
        right,
        toJSON: () => '',
        top,
        width,
        x: left,
        y: top,
      }
    })
  })

  describe('simple functionality', () => {
    it('should be able to drop a draggable element into a droppable one', async () => {
      const dragTarget = jest.fn()

      const hierarchy: Hierarchy = {
        1: {
          children: {
            2: {
              style: {
                bottom: 250,
                height: 250,
                left: 0,
                right: 200,
                top: 0,
                width: 200,
              },
              tobe: 'droppable',
            },
            3: {
              style: {
                bottom: 500,
                height: 250,
                left: 0,
                right: 200,
                top: 250,
                width: 200,
              },
              tobe: 'draggable',
            },
          },
          style: {
            bottom: 500,
            height: 500,
            left: 0,
            right: 200,
            top: 0,
            width: 200,
          },
          tobe: 'droppable',
        },
      }

      const { container } = render(
        <TestDndContext
          onDragEnd={(dragEndEvent) => dragTarget(dragEndEvent.over?.id)}
        >
          <MakeElementTree hierarchy={populateParentId(hierarchy)} />
        </TestDndContext>,
      )

      const draggableElement =
        container.querySelector<HTMLDivElement>('[id="3"]')

      if (!draggableElement) {
        throw new Error('draggable element not found')
      }

      await dragDropElement(
        draggableElement,
        { x: 100, y: 250 },
        { x: 100, y: COLLISION_ALGORITHM_SPACING - 1 },
      )

      expect(dragTarget).toHaveBeenCalledWith('1')
    })
  })

  describe('drag and drop hints', () => {
    describe('Drag overlay', () => {
      it('should show the draggable element as a drag overlay when the element is dragged', () => {})

      it('should show a custom drag overlay when the draggable element is dragged and a custom overlay is provided', () => {})
    })

    describe('Drop overlay', () => {
      it('show show a drop overlay around the target element when dragging within it', () => {})
    })

    describe('Drop indicator', () => {
      describe('With Vertical Layout', () => {
        it('should show a drop overlay around the parent and a drop indicator at the top of the target element when dragging before it', () => {})

        it('should show a drop overlay around the parent and a drop indicator at the bottom of the target element when dragging after it', () => {})
      })

      describe('With Horizontal Layout', () => {
        it('should show a drop overlay around the parent and a drop indicator to the left of the target element when dragging before it', () => {})

        it('should show a drop overlay around the parent and a drop indicator to the right of the target element when dragging after it', () => {})
      })
    })
  })

  describe('complex dnd', () => {
    it('should be able to drop into the farthest child from the root element', () => {})

    it('should drop into the parent element when attempting to drop into the element itself', () => {})

    it("should drop into the parent element when attempting to drop into the element's children", () => {})
  })
})

// TODO: add these tests too
// non draggable item should not be dragged
// non droppable item should not be dropped onto

// should be able to both make a droppable "component" or droppable "children"
