/* eslint-disable unicorn/filename-case */

import { fireEvent, render, waitFor } from '@testing-library/react'

import type { Point } from '../geometry'

import { DROP_INDICATOR_ID } from '../components/DropIndicator'
import { DROP_OVERLAY_ID } from '../components/DropOverlay'
import { DRAG_OVERLAY_ID } from '../components/MakeChildrenDraggable'
import { MakeElementTree } from './MakeElementTree'
import {
  horizontalSimpleTree,
  nonDraggableSimpleTree,
  nonDroppableSimpleTree,
  simpleTree,
} from './test-data'
import { COLLISION_ALGORITHM_SPACING, TestDndContext } from './TestDndContext'

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
    /**
     * JsDom doesn't support layout (https://github.com/testing-library/react-testing-library/issues/353#issuecomment-481248489)
     * hence all measurments are always 0. to go around that we're
     * mocking the getBoundingClientRect method for HTMLElement.
     */
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
        container.querySelector<HTMLDivElement>('[id="2-draggable"]')

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
        container.querySelector<HTMLDivElement>('[id="2-draggable"]')

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
        container.querySelector<HTMLDivElement>('[id="2-draggable"]')

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

    it('should be able to make a component droppable', async () => {
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
        container.querySelector<HTMLDivElement>('[id="2-draggable"]')

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
          container.querySelector<HTMLDivElement>('[id="2-draggable"]')

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

      it('should show a custom drag overlay when a custom overlay is provided', async () => {
        const { container } = render(
          <TestDndContext>
            <MakeElementTree
              customDragOverlay={<div id="custom-drag-overlay"></div>}
              hierarchy={simpleTree}
            />
          </TestDndContext>,
        )

        const draggableElement =
          container.querySelector<HTMLDivElement>('[id="2-draggable"]')

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

        const customDragOverlay = document.querySelector<HTMLDivElement>(
          '[id="custom-drag-overlay"]',
        )

        expect(dragOverlay).toBeDefined()
        expect(customDragOverlay).toBeDefined()

        expect(dragOverlay?.contains(customDragOverlay)).toBeTruthy()
      })
    })

    describe('Drop overlay', () => {
      it('should show a drop overlay around the target element when dragging within it', async () => {
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

        // Trigger the drag operation.
        await dragElementOver(draggableElement, {
          x: 100,
          y: COLLISION_ALGORITHM_SPACING + 1,
        })

        const targetElement =
          container.querySelector<HTMLDivElement>('[id="1-parent"]')

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
          container.querySelector<HTMLDivElement>('[id="2-draggable"]')

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
