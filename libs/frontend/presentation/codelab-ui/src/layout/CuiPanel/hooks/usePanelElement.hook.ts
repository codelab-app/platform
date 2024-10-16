import { useEffect, useRef } from 'react'
import {
  getPanelElement,
  getPanelGroupElement,
  getResizeHandleElement,
} from 'react-resizable-panels'

export const usePanelElement = () => {
  const refs = useRef<{
    groupElement: HTMLElement | null
    leftPanelElement: HTMLElement | null
    rightPanelElement: HTMLElement | null
    resizeHandleElement: HTMLElement | null
  }>({
    groupElement: null,
    leftPanelElement: null,
    resizeHandleElement: null,
    rightPanelElement: null,
  })

  useEffect(() => {
    const groupElement = getPanelGroupElement('group')
    const leftPanelElement = getPanelElement('left-panel')
    const rightPanelElement = getPanelElement('right-panel')
    const resizeHandleElement = getResizeHandleElement('resize-handle')

    refs.current = {
      groupElement,
      leftPanelElement,
      resizeHandleElement,
      rightPanelElement,
    }
  }, [])

  return refs.current
}
