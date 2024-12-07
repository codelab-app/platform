import { useLayoutEffect, useState } from 'react'
import { getPanelElement } from 'react-resizable-panels'
import { useWindowSize } from 'react-use'

export enum PaneSection {
  Builder = 'Builder',
  Config = 'Config',
  Explorer = 'Explorer',
}

export const usePanelWidth = (id: PaneSection) => {
  const [width, setWidth] = useState<number>()

  useLayoutEffect(() => {
    const panelElement = getPanelElement(id)

    if (panelElement) {
      // Initial width set
      setWidth(panelElement.offsetWidth)

      const observer = new ResizeObserver((entries) => {
        // Use the entry's contentRect width instead of directly accessing offsetWidth
        const newWidth = entries[0]?.contentRect.width

        if (newWidth && newWidth !== width) {
          setWidth(newWidth)
        }
      })

      observer.observe(panelElement)

      return () => observer.disconnect()
    }
  }, [id])

  return width
}

export const useWidthInPercent = (widthPx?: number) => {
  const { height, width } = useWindowSize()

  if (!widthPx) {
    return 0
  }

  const minSizePercentage = (widthPx / width) * 100

  return minSizePercentage
}
