/**
 * useScroll React custom hook
 * Usage:
 *    const { scrollX, scrollY, scrollDirection } = useScroll();
 * Original Source: https://gist.github.com/joshuacerbito/ea318a6a7ca4336e9fadb9ae5bbb87f4
 */
import { isServer } from '@codelab/shared/utils'
import { useEffect, useState } from 'react'

interface SSRRect {
  bottom: number
  height: number
  left: number
  right: number
  top: number
  width: number
  x: number
  y: number
}

const EmptySSRRect: SSRRect = {
  bottom: 0,
  height: 0,
  left: 0,
  right: 0,
  top: 0,
  width: 0,
  x: 0,
  y: 0,
}

const findScrollParent = (element: HTMLElement | null) => {
  while (element && element !== document.body) {
    const style = window.getComputedStyle(element)

    if (style.overflow === 'auto' || style.overflow === 'scroll') {
      return element
    }

    element = element.parentElement
  }

  return element
}

const isElementInScrollParentViewport = (
  element: HTMLElement,
  root: HTMLElement,
) => {
  const scrollParent = findScrollParent(root)
  const rect = element.getBoundingClientRect()
  const parentRect = (scrollParent ?? document.body).getBoundingClientRect()

  return (
    rect.top >= parentRect.top &&
    rect.left >= parentRect.left &&
    rect.bottom <= parentRect.bottom &&
    rect.right <= parentRect.right
  )
}

const useScrollIntoView = (element: HTMLElement, root: HTMLElement) => {
  useEffect(() => {
    if (!isElementInScrollParentViewport(element, root)) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [element, root])
}

const useScroll = () => {
  const [lastScrollTop, setLastScrollTop] = useState<number>(0)

  const [bodyOffset, setBodyOffset] = useState<DOMRect | SSRRect>(
    isServer ? EmptySSRRect : document.body.getBoundingClientRect(),
  )

  const [scrollY, setScrollY] = useState<number>(bodyOffset.top)
  const [scrollX, setScrollX] = useState<number>(bodyOffset.left)

  const [scrollDirection, setScrollDirection] = useState<
    'down' | 'up' | undefined
  >()

  const listener = () => {
    setBodyOffset(
      isServer ? EmptySSRRect : document.body.getBoundingClientRect(),
    )
    setScrollY(-bodyOffset.top)
    setScrollX(bodyOffset.left)
    setScrollDirection(lastScrollTop > -bodyOffset.top ? 'down' : 'up')
    setLastScrollTop(-bodyOffset.top)
  }

  useEffect(() => {
    window.addEventListener('scroll', listener, true)

    return () => {
      window.removeEventListener('scroll', listener, true)
    }
  })

  return {
    scrollDirection,
    scrollX,
    scrollY,
  }
}

export { useScroll, useScrollIntoView }
