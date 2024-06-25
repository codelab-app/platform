import { useEffect, useState } from 'react'
import useResizeObserver from 'use-resize-observer/polyfilled'

/**
 * Calculates the bounding rect of the container element
 * and updates it when the container is resized.
 * @param container
 * @returns
 */
export const useResizeAwareRect = (container: HTMLElement) => {
  const { height, width } = useResizeObserver({ ref: container })

  const [containerRect, setContainerRect] = useState(() =>
    container.getBoundingClientRect(),
  )

  useEffect(() => {
    setContainerRect(container.getBoundingClientRect())
  }, [container, width, height])

  return containerRect
}
