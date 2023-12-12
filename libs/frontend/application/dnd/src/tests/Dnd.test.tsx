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
import { MakeComponentDroppable } from '../MakeComponentDroppable'
import type { Hierarchy } from './test-data'
import {
  horizontalSimpleTree,
  nonDraggableSimpleTree,
  nonDroppableSimpleTree,
  simpleTree,
} from './test-data'
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

interface MakeElementTreeProps {
  hierarchy: Hierarchy
  makeComponentDroppable?: boolean
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

const MakeElementTree = ({
  hierarchy,
  makeComponentDroppable,
}: MakeElementTreeProps) => {
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
        condition={
          !makeComponentDroppable && (tobe === 'droppable' || tobe === 'both')
        }
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
          {makeComponentDroppable &&
          (tobe === 'droppable' || tobe === 'both') ? (
            <MakeComponentDroppable
              ReactComponent={(props: PropsWithChildren) => (
                // eslint-disable-next-line react/jsx-props-no-spreading
                <div {...props}>{props.children}</div>
              )}
              children={
                children && (
                  <MakeElementTree
                    hierarchy={children}
                    key={`subtree-${key}`}
                    makeComponentDroppable={true}
                  />
                )
              }
              componentProps={{
                id: key,
                key,
                style,
              }}
              data={{}}
              id={key}
              parentDroppableContainerId={`${parentId}` || ''}
            />
          ) : (
            <div
              children={
                children && (
                  <MakeElementTree
                    hierarchy={children}
                    key={`subtree-${key}`}
                  />
                )
              }
              id={key}
              key={key}
              style={style}
            />
          )}
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

const dropElement = async (element: HTMLElement, dropPosiotion: Point) => {
  const mouseUpEvent = new MouseEvent('pointerup', {
    bubbles: true,
    clientX: dropPosiotion.x,
    clientY: dropPosiotion.y,
  })

  await waitFor(() => {
    fireEvent(element, mouseUpEvent)
  })
}

const dragDropElement = async (element: HTMLElement, dropPosiotion: Point) => {
  await dragElementOver(element, dropPosiotion)
  await dropElement(element, dropPosiotion)
}

describe('Dnd', () => {
  beforeAll(() => {
    // Mocking the getBoundingClientRect method for HTMLElement
    HTMLElement.prototype.getBoundingClientRect = jest.fn(function () {
      const style = window.getComputedStyle(this)
      const width = parseFloat(style.width)
      const height = parseFloat(style.height)
      const left = parseFloat(style.left)
      const top = parseFloat(style.top)

      console.log('getting bounding client rect for', this.id, style)

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

  describe('basic functionality', () => {
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

    it('should not drag a non-draggable item', async () => {
      const dragTarget = jest.fn()
      const dragStart = jest.fn()

      const { container } = render(
        <TestDndContext
          onDragEnd={(dragEndEvent) => dragTarget(dragEndEvent.over?.id)}
          onDragStart={dragStart}
        >
          <MakeElementTree hierarchy={nonDraggableSimpleTree} />
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

      expect(dragStart).not.toHaveBeenCalled()
      expect(dragTarget).not.toHaveBeenCalled()
    })

    it('should not drop into a non-droppable item', async () => {
      const dragTarget = jest.fn()
      const dragStart = jest.fn()

      const { container } = render(
        <TestDndContext
          onDragEnd={(dragEndEvent) => dragTarget(dragEndEvent.over?.id)}
          onDragStart={dragStart}
        >
          <MakeElementTree hierarchy={nonDroppableSimpleTree} />
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

      expect(dragStart).toHaveBeenCalledTimes(1)
      expect(dragTarget).toHaveBeenCalledWith(undefined)
    })

    it.skip('should be able to make a component droppable', async () => {
      const dragTarget = jest.fn()

      const { container } = render(
        <TestDndContext
          onDragEnd={(dragEndEvent) => dragTarget(dragEndEvent.over?.id)}
        >
          <MakeElementTree
            hierarchy={simpleTree}
            makeComponentDroppable={true}
          />
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

    describe.each([
      {
        description: 'With Vertical Layout',
        dropPositions: {
          afterFirst: {
            coordinates: { x: 100, y: 250 },
            positionName: 'bellow',
          },
          beforeFirst: {
            coordinates: { x: 100, y: COLLISION_ALGORITHM_SPACING + 1 },
            positionName: 'above',
          },
        },
        tree: simpleTree,
      },
      {
        description: 'With Horizontal Layout',
        dropPositions: {
          afterFirst: {
            coordinates: { x: 100, y: 250 },
            positionName: 'to the right of',
          },
          beforeFirst: {
            coordinates: { x: COLLISION_ALGORITHM_SPACING + 1, y: 250 },
            positionName: 'to the left of',
          },
        },
        tree: horizontalSimpleTree,
      },
    ])('Drop indicator', ({ description, dropPositions, tree }) => {
      describe(description, () => {
        it(`should show a drop indicator before the target element when dragging ${dropPositions.beforeFirst.positionName} it`, async () => {
          const { container } = render(
            <TestDndContext>
              <MakeElementTree hierarchy={tree} />
            </TestDndContext>,
          )

          const draggableElement =
            container.querySelector<HTMLDivElement>('[id="2-draggable"]')

          if (!draggableElement) {
            throw new Error('draggable element not found')
          }

          // drag before the first child
          await dragElementOver(
            draggableElement,
            dropPositions.beforeFirst.coordinates,
          )

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

        it(`should show a drop indicator after the target element when dragging ${dropPositions.afterFirst.positionName} it`, async () => {
          const { container } = render(
            <TestDndContext>
              <MakeElementTree hierarchy={tree} />
            </TestDndContext>,
          )

          const draggableElement =
            container.querySelector<HTMLDivElement>('[id="2-draggable"]')

          if (!draggableElement) {
            throw new Error('draggable element not found')
          }

          // drag into between the first and second child
          await dragElementOver(
            draggableElement,
            dropPositions.afterFirst.coordinates,
          )

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
    })

    describe('cleanup', () => {
      it('should remove all hints when the drag operation is complete', async () => {
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

        expect(
          document.querySelector<HTMLDivElement>(`[id="${DRAG_OVERLAY_ID}"]`),
        ).toBeDefined()
        expect(
          document.querySelector<HTMLDivElement>(`[id="${DROP_INDICATOR_ID}"]`),
        ).toBeDefined()
        expect(
          document.querySelector<HTMLDivElement>(`[id="${DROP_OVERLAY_ID}"]`)
            ?.style.display,
        ).not.toBe('none')

        // Trigger the drop operation.
        await dropElement(draggableElement, {
          x: 100,
          y: COLLISION_ALGORITHM_SPACING + 1,
        })

        expect(
          document.querySelector<HTMLDivElement>(`[id="${DRAG_OVERLAY_ID}"]`),
        ).toBeNull()

        expect(
          document.querySelector<HTMLDivElement>(`[id="${DROP_INDICATOR_ID}"]`),
        ).toBeNull()

        expect(
          document.querySelector<HTMLDivElement>(`[id="${DROP_OVERLAY_ID}"]`)
            ?.style.display,
        ).toBe('none')
      })
    })
  })
})
