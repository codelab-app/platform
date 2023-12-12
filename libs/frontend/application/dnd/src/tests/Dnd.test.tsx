/* eslint-disable unicorn/filename-case */

import { fireEvent, render, waitFor } from '@testing-library/react'
import type { ComponentType, PropsWithChildren } from 'react'
import React from 'react'
import { DROP_INDICATOR_ID } from '../DropIndicator'
import { DROP_OVERLAY_ID } from '../DropOverlay'
import type { Point } from '../geometry'
import {
  DRAG_OVERLAY_ID,
  MakeChildrenDraggable,
} from '../MakeChildrenDraggable'
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
    descriptor?: string
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

const dragElementOver = async (element: HTMLElement, dropPosiotion: Point) => {
  // Simulate mouse events for dragging and dropping
  const mouseDownEvent = new MouseEvent('pointerdown', { bubbles: true })

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

const dragDropElement = async (element: HTMLElement, dropPosiotion: Point) => {
  await dragElementOver(element, dropPosiotion)

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
  const simpleTree: Hierarchy = populateParentId({
    root: {
      children: {
        '1-parent': {
          children: {
            'first-child': {
              style: {
                height: 250,
                left: 0,
                top: 0,
                width: 200,
              },
              tobe: 'droppable',
            },
            'second-child': {
              style: {
                height: 250,
                left: 0,
                top: 250,
                width: 200,
              },
              tobe: 'droppable',
            },
          },
          style: {
            height: 500,
            left: 0,
            top: 0,
            width: 200,
          },
          tobe: 'droppable',
        },
        '2-draggable': {
          style: {
            height: 500,
            left: 200,
            top: 0,
            width: 200,
          },
          tobe: 'draggable',
        },
      },
      style: {
        height: 500,
        left: 0,
        top: 0,
        width: 400,
      },
      tobe: 'droppable',
    },
  })

  beforeAll(() => {
    // Mocking the getBoundingClientRect method for HTMLElement
    HTMLElement.prototype.getBoundingClientRect = jest.fn(function () {
      const style = window.getComputedStyle(this)
      const width = parseFloat(style.width)
      const height = parseFloat(style.height)
      const left = parseFloat(style.left)
      const top = parseFloat(style.top)

      return {
        bottom: top + height,
        height,
        left,
        right: left + width,
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

      const { container } = render(
        <TestDndContext
          onDragEnd={(dragEndEvent) => dragTarget(dragEndEvent.over?.id)}
        >
          <MakeElementTree hierarchy={simpleTree} />
        </TestDndContext>,
      )

      const draggableElement =
        container.querySelector<HTMLDivElement>(`[id="2-draggable"]`)

      if (!draggableElement) {
        throw new Error('draggable element not found')
      }

      await dragDropElement(draggableElement, {
        x: 100,
        y: COLLISION_ALGORITHM_SPACING + 1,
      })

      expect(dragTarget).toHaveBeenCalledWith('1-parent')
    })
  })

  describe('drag and drop hints', () => {
    describe('Drag overlay', () => {
      it('should show the draggable element as a drag overlay when the element is dragged', async () => {
        const { container } = render(
          <TestDndContext>
            <MakeElementTree hierarchy={simpleTree} />
          </TestDndContext>,
        )

        const draggableElement =
          container.querySelector<HTMLDivElement>(`[id="2-draggable"]`)

        if (!draggableElement) {
          throw new Error('draggable element not found')
        }

        // Trigger the drag operation.
        await dragElementOver(draggableElement, {
          x: 100,
          y: COLLISION_ALGORITHM_SPACING + 1,
        })

        const dragOverlay = document.querySelector<HTMLDivElement>(
          `[id="${DRAG_OVERLAY_ID}"]`,
        )

        expect(dragOverlay).toBeDefined()

        // Check that the children of the drag overlay are the draggable element itself.
        expect(dragOverlay?.innerHTML).toContain(draggableElement.innerHTML)
      })

      it.skip('should show a custom drag overlay when the draggable element is dragged and a custom overlay is provided', () => {})
    })

    describe('Drop overlay', () => {
      it('should show a drop overlay around the target element when dragging within it', async () => {
        const { container } = render(
          <TestDndContext>
            <MakeElementTree hierarchy={simpleTree} />
          </TestDndContext>,
        )

        const draggableElement =
          container.querySelector<HTMLDivElement>(`[id="2-draggable"]`)

        if (!draggableElement) {
          throw new Error('draggable element not found')
        }

        // Trigger the drag operation.
        await dragElementOver(draggableElement, {
          x: 100,
          y: COLLISION_ALGORITHM_SPACING + 1,
        })

        const targetElement =
          container.querySelector<HTMLDivElement>(`[id="1-parent"]`)

        const dropOverlay = document.querySelector<HTMLDivElement>(
          `[id="${DROP_OVERLAY_ID}"]`,
        )

        if (!targetElement || !dropOverlay) {
          throw new Error('target element or drop overlay not found')
        }

        const targetRect = targetElement.getBoundingClientRect()
        const dropOverlayRect = dropOverlay.getBoundingClientRect()

        expect(dropOverlayRect.width).toBeCloseTo(targetRect.width || 0, 0)
        expect(dropOverlayRect.height).toBeCloseTo(targetRect.height || 0, 0)
      })
    })

    describe('Drop indicator', () => {
      describe('With Vertical Layout', () => {
        it('should show a drop overlay around the parent and a drop indicator at the top of the target element when dragging before it', async () => {
          const { container } = render(
            <TestDndContext>
              <MakeElementTree hierarchy={simpleTree} />
            </TestDndContext>,
          )

          const draggableElement =
            container.querySelector<HTMLDivElement>('[id="2-draggable"]')

          if (!draggableElement) {
            throw new Error('draggable element not found')
          }

          // drag before the first child
          await dragElementOver(draggableElement, {
            x: 100,
            y: COLLISION_ALGORITHM_SPACING + 1,
          })

          const dropIndicator = document.querySelector<HTMLDivElement>(
            `[id="${DROP_INDICATOR_ID}"]`,
          )

          const dropOverlay = document.querySelector<HTMLDivElement>(
            `[id="${DROP_OVERLAY_ID}"]`,
          )

          const targetElement =
            container.querySelector<HTMLDivElement>('[id="1-parent"]')

          if (!targetElement || !dropIndicator || !dropOverlay) {
            throw new Error(
              'target element, drop indicator, or drop overlay not found',
            )
          }

          const targetRect = targetElement.getBoundingClientRect()
          const dropOverlayRect = dropOverlay.getBoundingClientRect()

          // drop overlay should be around parent
          expect(dropOverlayRect.width).toBeCloseTo(targetRect.width || 0, 0)
          expect(dropOverlayRect.height).toBeCloseTo(targetRect.height || 0, 0)

          // drop indicator should be first child
          expect(targetElement.children[0]?.id).toBe(DROP_INDICATOR_ID)
        })

        it('should show a drop overlay around the parent and a drop indicator at the bottom of the target element when dragging after it', async () => {
          const { container } = render(
            <TestDndContext>
              <MakeElementTree hierarchy={simpleTree} />
            </TestDndContext>,
          )

          const draggableElement =
            container.querySelector<HTMLDivElement>('[id="2-draggable"]')

          if (!draggableElement) {
            throw new Error('draggable element not found')
          }

          // drag into between the first and second child
          await dragElementOver(draggableElement, {
            x: 100,
            y: 250,
          })

          const dropIndicator = document.querySelector<HTMLDivElement>(
            `[id="${DROP_INDICATOR_ID}"]`,
          )

          const dropOverlay = document.querySelector<HTMLDivElement>(
            `[id="${DROP_OVERLAY_ID}"]`,
          )

          const targetElement =
            container.querySelector<HTMLDivElement>('[id="1-parent"]')

          if (!targetElement || !dropIndicator || !dropOverlay) {
            throw new Error(
              'target element, drop indicator, or drop overlay not found',
            )
          }

          const targetRect = targetElement.getBoundingClientRect()
          const dropOverlayRect = dropOverlay.getBoundingClientRect()

          // drop overlay should be around parent
          expect(dropOverlayRect.width).toBeCloseTo(targetRect.width || 0, 0)
          expect(dropOverlayRect.height).toBeCloseTo(targetRect.height || 0, 0)

          // drop indicator should be second element
          expect(targetElement.children[1]?.id).toBe(DROP_INDICATOR_ID)
        })
      })

      describe('With Horizontal Layout', () => {
        it('should show a drop overlay around the parent and a drop indicator to the left of the target element when dragging before it', () => {})

        it('should show a drop overlay around the parent and a drop indicator to the right of the target element when dragging after it', () => {})
      })
    })

    describe('cleanup', () => {
      it('should remove all hints when the drag operation is complete', () => {})
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
