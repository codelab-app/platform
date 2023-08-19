export type Side = 'after' | 'before'

enum PointerEventType {
  PointerUp = 'pointerup',
  PointerDown = 'pointerdown',
  PointerMove = 'pointermove',
}

export interface ResizeControllerOptions {
  getDefaultValue(): number

  getMaxValue(): number

  getMinValue(): number

  // Which side of the element to resize
  getSide(): Side

  onValueChanged?(value: number): void
}

// We don't add pointermove because it's added dynamically
// once the pointerdown event is fired
const pointerEventTypes = [
  PointerEventType.PointerDown,
  PointerEventType.PointerUp,
]

export const builderResizeController = (
  targetElement: HTMLElement,
  options: ResizeControllerOptions,
) => {
  const { getDefaultValue, getMaxValue, getMinValue, getSide, onValueChanged } =
    options

  let value = 0

  const handlePointerEvent = (event: Event) => {
    if (!(event instanceof PointerEvent)) {
      return
    }

    const { movementX, pointerId, type: eventType } = event

    switch (eventType) {
      case PointerEventType.PointerDown: {
        value = getDefaultValue()

        // listen to pointer move event
        targetElement.setPointerCapture(pointerId)
        targetElement.addEventListener(
          PointerEventType.PointerMove,
          handlePointerEvent,
        )
        break
      }

      case PointerEventType.PointerMove: {
        // The builder is centered, so we have to move twice as fast
        // because the width changes from both sides
        const newValue =
          getSide() === 'after' ? value + movementX * 2 : value - movementX * 2

        if (newValue > getMinValue()) {
          value = Math.min(newValue, getMaxValue())
        } else {
          value = getMinValue()
        }

        onValueChanged?.(value)

        break
      }

      case PointerEventType.PointerUp: {
        targetElement.removeEventListener(
          PointerEventType.PointerMove,
          handlePointerEvent,
        )
        targetElement.releasePointerCapture(event.pointerId)
        onValueChanged?.(value)
        break
      }
    }
  }

  pointerEventTypes.forEach((eventName) =>
    targetElement.addEventListener(eventName, handlePointerEvent),
  )

  return () => disposeResizeController(targetElement, handlePointerEvent)
}

const disposeResizeController = (
  targetElement: HTMLElement,
  eventHandler: (event: Event) => void,
) => {
  pointerEventTypes.forEach((eventName) =>
    targetElement.removeEventListener(eventName, eventHandler),
  )
}
