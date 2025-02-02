/* eslint-disable unicorn/filename-case */

import type { IRendererModel } from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import type { Point } from '@codelab/frontend/shared/utils'

import { runtimeElementRef } from '@codelab/frontend/abstract/application'
import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/domain'
import { DROP_INDICATOR_STYLE } from '@codelab/frontend-application-builder/hooks'
import { RenderBlueprint } from '@codelab/frontend-application-builder/use-cases/base-builder'
import { queryByBlueprintId } from '@codelab/frontend-application-builder/utils'
import {
  DRAG_OVERLAY_ID,
  DROP_OVERLAY_ID,
} from '@codelab/frontend-application-dnd/components'
import {
  createTestStore,
  Layout,
  RootStoreProvider,
} from '@codelab/frontend-infra-mobx/store'
import { fireEvent, render, waitFor } from '@testing-library/react'
import { createRef } from 'react'

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

const renderDragAndDropElements = async (
  storeContext: ReturnType<typeof createTestStore>,
  testStore: ReturnType<typeof createTestStore>['rootStore'],
  renderer: IRendererModel,
  dragTarget: jest.Func,
  dargStart: jest.Func,
  draggableElement: IElementModel,
  droppableElement: IElementModel,
) => {
  const { builderService, runtimeElementService } = testStore.applicationStore
  const renderContainerRef = createRef<HTMLDivElement>()
  const builderContainerRef = createRef<HTMLDivElement>()

  render(
    <RootStoreProvider value={storeContext}>
      <TestDndContext
        onDragEnd={(dragEndEvent) => dragTarget(dragEndEvent.over?.id)}
        onDragStart={(dragStartEvent) => dargStart(dragStartEvent)}
      >
        <div ref={builderContainerRef}>
          <div
            id={ROOT_RENDER_CONTAINER_ID}
            ref={renderContainerRef}
            style={{
              left: '0px',

              // added as a workaround for jsdom not supporting getBoundingClientRect
              top: '0px',
              width: '300px',
            }}
          >
            {renderer.render}
          </div>
          <RenderBlueprint
            builderContainerRef={builderContainerRef}
            renderContainerRef={renderContainerRef}
            renderer={renderer}
          />
        </div>
        ,
      </TestDndContext>
    </RootStoreProvider>,
  )

  const runtimeDraggableElement = runtimeElementService.elementsList.find(
    (runtimeElement) => runtimeElement.element.id === draggableElement.id,
  )

  await waitFor(() => {
    if (!runtimeDraggableElement) {
      return
    }

    builderService.setSelectedNode(runtimeElementRef(runtimeDraggableElement))
  })

  const draggableElementDOM = queryByBlueprintId(draggableElement.id)
  const droppableElementDOM = queryByBlueprintId(droppableElement.id)

  const dragButton = draggableElementDOM?.querySelector<HTMLButtonElement>(
    `#drag-button-${draggableElement.id}`,
  )

  if (!draggableElementDOM || !droppableElementDOM || !dragButton) {
    throw new Error('draggable or droppable element not found')
  }

  return {
    dragButton,
    draggableElementDOM,
    droppableElementDOM,
  }
}

describe('Dnd', () => {
  let storeContext: ReturnType<typeof createTestStore>
  let testStore: ReturnType<typeof createTestStore>['rootStore']

  beforeAll(() => {
    /**
     * JsDom doesn't support layout (https://github.com/testing-library/react-testing-library/issues/353#issuecomment-481248489)
     * hence all measurments are always 0. to go around that we're
     * mocking the getBoundingClientRect method for HTMLElement.
     */
    HTMLElement.prototype.scrollIntoView = jest.fn()
    HTMLElement.prototype.getBoundingClientRect = jest.fn(function (
      name?: string,
    ) {
      const style = window.getComputedStyle(this)
      const width = parseFloat(style.width.replace('px', '')) || 0
      const height = parseFloat(style.height.replace('px', '')) || 0
      const left = parseFloat(style.left.replace('px', '')) || 0
      const top = parseFloat(style.top.replace('px', '')) || 0

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

  beforeEach(() => {
    storeContext = createTestStore()
    testStore = storeContext.rootStore
  })

  afterAll(() => {
    testStore.teardown()
  })

  describe('basic functionality', () => {
    it('should be able to drop a draggable element into a droppable one', async () => {
      const { draggableElement, droppableElement, renderer } =
        testStore.setupDragAndDrop()

      const dragTarget = jest.fn()

      const { dragButton, droppableElementDOM } =
        await renderDragAndDropElements(
          storeContext,
          testStore,
          renderer,
          dragTarget,
          jest.fn(),
          draggableElement,
          droppableElement,
        )

      await dragDropElement(dragButton, {
        x: 150,
        y: COLLISION_ALGORITHM_SPACING + 4,
      })

      expect(dragTarget).toHaveBeenCalledWith(droppableElement.id)
    })

    it('should not drag a non-draggable item', async () => {
      const { draggableElement, droppableElement, renderer } =
        testStore.setupDragAndDrop()

      const dragStart = jest.fn()
      const dragTarget = jest.fn()

      const { draggableElementDOM, droppableElementDOM } =
        await renderDragAndDropElements(
          storeContext,
          testStore,
          renderer,
          dragTarget,
          dragStart,
          draggableElement,
          droppableElement,
        )

      await dragDropElement(draggableElementDOM, {
        x: 150,
        y: COLLISION_ALGORITHM_SPACING + 4,
      })

      expect(dragStart).not.toHaveBeenCalled()
      expect(dragTarget).not.toHaveBeenCalled()
    })

    it('should not drop into a non-droppable item', async () => {
      const { draggableElement, droppableElement, renderer } =
        testStore.setupDragAndDrop()

      const dragStart = jest.fn()
      const dragTarget = jest.fn()

      const { dragButton, droppableElementDOM } =
        await renderDragAndDropElements(
          storeContext,
          testStore,
          renderer,
          dragTarget,
          dragStart,
          draggableElement,
          droppableElement,
        )

      await dragDropElement(dragButton, {
        x: -150,
        y: COLLISION_ALGORITHM_SPACING + 4,
      })

      expect(dragStart).toHaveBeenCalledTimes(1)
      expect(dragTarget).toHaveBeenCalledWith(undefined)
    })

    // it('should be able to make a component droppable', async () => {
    //   const dragTarget = jest.fn()

    //   const { container } = render(
    //     <TestDndContext
    //       onDragEnd={(dragEndEvent) => dragTarget(dragEndEvent.over?.id)}
    //     >
    //       <MakeElementTree
    //         hierarchy={simpleTree}
    //         makeComponentDroppable={true}
    //       />
    //     </TestDndContext>,
    //   )

    //   const draggableElement =
    //     container.querySelector<HTMLDivElement>('[id="2-draggable"]')

    //   if (!draggableElement) {
    //     throw new Error('draggable element not found')
    //   }

    //   await dragDropElement(draggableElement, {
    //     x: 100,
    //     y: COLLISION_ALGORITHM_SPACING + 1,
    //   })

    //   expect(dragTarget).toHaveBeenCalledWith('1-parent')
    // })
  })

  describe('drag and drop hints', () => {
    describe('Drag overlay', () => {
      it('should show the draggable element as a drag overlay when the element is dragged', async () => {
        const { draggableElement, droppableElement, renderer } =
          testStore.setupDragAndDrop()

        const dragTarget = jest.fn()

        const { dragButton } = await renderDragAndDropElements(
          storeContext,
          testStore,
          renderer,
          dragTarget,
          jest.fn(),
          draggableElement,
          droppableElement,
        )

        await dragElementOver(dragButton, {
          x: 150,
          y: COLLISION_ALGORITHM_SPACING + 4,
        })

        const dragOverlay = document.querySelector<HTMLDivElement>(
          `[id="${DRAG_OVERLAY_ID}"]`,
        )

        expect(dragOverlay).toBeDefined()

        // Check that the children of the drag overlay are the draggable element itself.
        expect(dragOverlay?.innerHTML).toContain(dragButton.innerHTML)
      })
      //     it('should show a custom drag overlay when a custom overlay is provided', async () => {
      //       const { container } = render(
      //         <TestDndContext>
      //           <MakeElementTree
      //             customDragOverlay={<div id="custom-drag-overlay"></div>}
      //             hierarchy={simpleTree}
      //           />
      //         </TestDndContext>,
      //       )
      //       const draggableElement =
      //         container.querySelector<HTMLDivElement>('[id="2-draggable"]')
      //       if (!draggableElement) {
      //         throw new Error('draggable element not found')
      //       }
      //       // Trigger the drag operation.
      //       await dragElementOver(draggableElement, {
      //         x: 100,
      //         y: COLLISION_ALGORITHM_SPACING + 1,
      //       })
      //       const dragOverlay = document.querySelector<HTMLDivElement>(
      //         `[id="${DRAG_OVERLAY_ID}"]`,
      //       )
      //       const customDragOverlay = document.querySelector<HTMLDivElement>(
      //         '[id="custom-drag-overlay"]',
      //       )
      //       expect(dragOverlay).toBeDefined()
      //       expect(customDragOverlay).toBeDefined()
      //       expect(dragOverlay?.contains(customDragOverlay)).toBeTruthy()
      //     })
      //   })
      describe('Drop overlay', () => {
        it('should show a drop overlay around the target element when dragging within it', async () => {
          const { draggableElement, droppableElement, renderer } =
            testStore.setupDragAndDrop()

          const dragTarget = jest.fn()

          const { dragButton, droppableElementDOM } =
            await renderDragAndDropElements(
              storeContext,
              testStore,
              renderer,
              dragTarget,
              jest.fn(),
              draggableElement,
              droppableElement,
            )

          // Trigger the drag operation.
          await dragElementOver(dragButton, {
            x: 150,
            y: COLLISION_ALGORITHM_SPACING + 4,
          })

          const dropOverlay = document.querySelector<HTMLDivElement>(
            `[id="${DROP_OVERLAY_ID}"]`,
          )

          if (!dropOverlay) {
            throw new Error('drop overlay not found')
          }

          const targetRect = droppableElementDOM.getBoundingClientRect()
          const dropOverlayRect = dropOverlay.getBoundingClientRect()

          expect(dropOverlayRect.width).toBe(targetRect.width)
          expect(dropOverlayRect.height).toBe(targetRect.height)
        })
      })
      describe.each([
        {
          description: 'With Vertical Layout',
          dropPositions: {
            afterFirst: {
              dragCoordinate: {
                x: 0,
                y: 202,
              },
              positionName: 'bellow',
            },
            beforeFirst: {
              dragCoordinate: {
                x: 0,
                y: 0,
              },
              positionName: 'above',
            },
          },
          layout: Layout.Vertical,
        },
        {
          description: 'With Horizontal Layout',
          dropPositions: {
            afterFirst: {
              dragCoordinate: {
                x: 200,
                y: 101,
              },
              positionName: 'to the right of',
            },
            beforeFirst: {
              dragCoordinate: {
                x: 0,
                y: 0,
              },
              positionName: 'to the left of',
            },
          },
          layout: Layout.Horizontal,
        },
      ])('Drop indicator', ({ description, dropPositions, layout }) => {
        describe(description, () => {
          it(`should show a drop indicator before the target element when dragging ${dropPositions.beforeFirst.positionName} it`, async () => {
            const { draggableElement, droppableElement, renderer } =
              testStore.setupDragAndDrop(layout, false)

            const dragTarget = jest.fn()

            const { dragButton, draggableElementDOM, droppableElementDOM } =
              await renderDragAndDropElements(
                storeContext,
                testStore,
                renderer,
                dragTarget,
                jest.fn(),
                draggableElement,
                droppableElement,
              )

            // Trigger the drag operation.
            await dragElementOver(
              dragButton,
              dropPositions.beforeFirst.dragCoordinate,
            )

            const droppableElementComputedStyle =
              window.getComputedStyle(droppableElementDOM)

            expect(droppableElementComputedStyle.borderTop).toBe(
              DROP_INDICATOR_STYLE,
            )

            expect(droppableElementComputedStyle.borderLeft).toBe(
              DROP_INDICATOR_STYLE,
            )
          })
          it(`should show a drop indicator after the target element when dragging ${dropPositions.afterFirst.positionName} it`, async () => {
            const { draggableElement, droppableElement, renderer } =
              testStore.setupDragAndDrop(layout)

            const dragTarget = jest.fn()

            const { dragButton, droppableElementDOM } =
              await renderDragAndDropElements(
                storeContext,
                testStore,
                renderer,
                dragTarget,
                jest.fn(),
                draggableElement,
                droppableElement,
              )

            // Trigger the drag operation.
            await dragElementOver(
              dragButton,
              dropPositions.afterFirst.dragCoordinate,
            )

            const droppableElementComputedStyle =
              window.getComputedStyle(droppableElementDOM)

            expect(droppableElementComputedStyle.borderBottom).toBe(
              DROP_INDICATOR_STYLE,
            )

            expect(droppableElementComputedStyle.borderRight).toBe(
              DROP_INDICATOR_STYLE,
            )
          })
        })
      })
      describe('cleanup', () => {
        it('should remove all hints when the drag operation is complete', async () => {
          const { draggableElement, droppableElement, renderer } =
            testStore.setupDragAndDrop()

          const dragTarget = jest.fn()

          const { dragButton, draggableElementDOM } =
            await renderDragAndDropElements(
              storeContext,
              testStore,
              renderer,
              dragTarget,
              jest.fn(),
              draggableElement,
              droppableElement,
            )

          // Trigger the drag operation.
          await dragElementOver(dragButton, {
            x: 90,
            y: COLLISION_ALGORITHM_SPACING + 1,
          })

          expect(
            document.querySelector<HTMLDivElement>(`[id="${DRAG_OVERLAY_ID}"]`),
          ).toBeDefined()

          expect(
            document.querySelector<HTMLDivElement>(`[id="${DROP_OVERLAY_ID}"]`)
              ?.style.display,
          ).not.toBe('none')

          // Trigger the drop operation.
          await dropElement(dragButton, {
            x: 100,
            y: COLLISION_ALGORITHM_SPACING + 1,
          })

          expect(
            document.querySelector<HTMLDivElement>(`[id="${DRAG_OVERLAY_ID}"]`),
          ).toBeNull()
          expect(
            document.querySelector<HTMLDivElement>(`[id="${DROP_OVERLAY_ID}"]`)
              ?.style.display,
          ).toBe('none')
        })
      })
    })
  })
})
